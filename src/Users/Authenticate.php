<?php
/**
 * @file
 * Base class for authentication mechanisms
 */

namespace CL\Users;

use \Firebase\JWT\JWT;

use \CL\Site\Site;
use \CL\Site\System\Server;
use \CL\Site\Api\APIException;


/**
 * Basic user authentication mechanism.
 *
 * Base class version does password authentication.
 * Derive classes for alternative authentication.
 */
class Authenticate {
	/**
	 * Authenticate constructor.
	 * @param array $options That can contain options we can add.
	 * Possible options:
	 *
	 * 'sandbox-bypass'=>true will bypass passwords if
	 * we are in the sandbox.
	 *
	 * 'email-strip'=>true will strip \@anything from the
	 * entered address, reducing to just the user ID.
	 */
	public function __construct($options = []) {
		$this->options = $options;
	}

	/**
	 * Authenticate the user
	 *
	 * This is called for every page to verify that the user
	 * is currently authenticated.
	 *
	 * @param Site $site Site object
	 * @param Server $server Server object
	 * @param int $time Current time
	 * @return User User if valid login, null otherwise.
	 */
	public function authenticate(Site $site, Server $server, $time) {
		// Are we already authenticated
		if($site->users->user !== null) {
			return $site->users->user;
		}

        //
        // Cookie-based session support
        //
        $cookiename = $site->cookiePrefix . User::COOKIENAME;
        if(!empty($server->cookie[$cookiename])) {
            $cookie = $server->cookie[$cookiename];
            try {
                $decoded = JWT::decode($cookie, $site->users->publicKey, ["RS256"]);
            } catch(\Exception $exception) {
                /// JWT was not valid...
                $decoded = null;
            }

            $user = null;
            if($decoded !== null) {
                if($decoded->data->id > 0) {
                    $users = new Users($site->db);
                    $user = $users->get($decoded->data->id);
                    if($user !== null) {
                        $user->setFromJWT($decoded);
                    }
                } else {
                    // A zero ID user is special since it is not
                    // in the database. This is normally only used
                    // during site startup. First, we see if this is
                    // a manually added user. If not we create a user.
                    $u = $site->users->getUser($decoded->data->user);
                    if($u !== null) {
                        if(!empty($u['name'])) {
                            $user = new User(['id'=>0,
                                'user'=>$u['user'],
                                'name'=>$u['name'],
                                'role'=>$u['role']]);
                        } else {
                            $user = new User(['id'=>0,
                                'user'=>$u['user'],
                                'name'=>'Guest',
                                'role'=>User::GUEST]);
                        }
                    } else {
                        $user = new User(['id'=>0,
                            'user'=>$decoded->data->user,
                            'name'=>'Guest',
                            'role'=>User::GUEST]);
                    }

                    $user->setFromJWT($decoded);
                }

                if($user !== null) {
                    // Renew JWT if older than the renewal period.
                    if(($time - $decoded->iat) > User::JWT_RENEWAL) {
                        $jwt = $user->createJWT($site, $time);
                        $server->setcookie($cookiename, $jwt, 0, "/");
                    }

                    return $user;
                }
            }
        }

        //
        // Cookie-based automatic login support
        //
        $cookieALname = $site->cookiePrefix . Autologin::COOKIENAME;
        if(!empty($server->cookie[$cookieALname])) {
            // Attempt to validate
            $cred = explode(":", $server->cookie[$cookieALname]);
            $autologin = new Autologin($site->db);
            $user = $autologin->validate($cred[0], $cred[1], $time);

            // We always delete the credentials
            $autologin->delete($cred[0]);

            if($user === null) {
                // Cookie is invalid, remove it
                $server->deleteCookie($cookieALname);
            } else {
                // Cookie valid, create a new cookie for the next login
                $cred = $autologin->create($user->id, $time, $user->dataJWT);

                $server->setcookie($cookieALname,
                    $cred['id'] . ':' . $cred['token'],
                    $time + 86400 * Autologin::PERIOD, "/");

                // And create a new cookie to represent that we are logged in
                $jwt = $user->createJWT($site, $time);
                $server->setcookie($cookiename, $jwt, 0, "/");

                // Successful cookie-based login
                return $user;
            }

        }

		return null;
	}

	/**
	 * Get a location to redirect to if authentication fails.
	 *
	 * This can be a page on this or any other site.
	 *
	 * @param Site $site
	 * @return string Location to redirect to if authentication fails
	 */
	public function noauth(Site $site) {
		return 'cl/notauthorized';
	}

	/**
	 * Attempt to log a user in.
	 *
	 * This version uses the build-in password system associated with a user account.
	 * Override in derived classes that use alternative login systems.
	 *
	 * @param Site $site
	 * @param Server $server
	 * @return User object if successful or NULL otherwise
	 * @throws APIException
	 * @internal param $post
	 */
	public function login(Site $site, Server $server) {
		$post = $server->post;
		if(!isset($post['id']) || !isset($post['password'])) {
			throw new APIException('Invalid API usage');
		}

		$username = $this->getUserId($post);
		if($username === null) {
			throw new APIException('Unable to login: Invalid authentication credentials');
		}

		$password = $post['password'];
		$users = new Users($site->db);

		// The bypass feature allows skipping passwords
		// when running in the sandbox only.
		$bypass = $site->sandbox &&
			!empty($this->options['sandbox-bypass']) &&
			$this->options['sandbox-bypass'];

		if($bypass) {
			// Just get the user
			$user = $users->getByUserOrEmail($username);
		} else {
			$user = $users->validatePassword($username, $password);
		}

		if($user === null) {
			// Try any manually installed users
			$u = $site->users->getUser($username);
			if($u !== null) {
				// We found a user
				if(!$bypass) {
					// Validate the password
					if($u['password'] === null || !password_verify($password, $u['password'])) {
						throw new APIException('Unable to login: Invalid authentication credentials');
					}
				}

				return new User(['id'=>0,
					'user'=>$u['user'],
					'name'=>$u['name'],
					'role'=>$u['role']]);
			}
		}

		if($user === null) {
			throw new APIException('Unable to login: Invalid authentication credentials');
		}

		return $user;
	}

	/**
	 * Get a user ID from $post['userid']
	 *
	 * This strips any \@domain from the user id and does a basic security test.
	 *
	 * @param array $post $_POST
	 * @return string|null user ID or null if invalid.
	 */
	protected function getUserId($post) {
		$username = trim(strip_tags($post['id']));

		if(!empty($this->config['email-strip']) && $this->config['email-strip']) {
			if(strpos($username, '@') !== false) {
				$username = trim(substr($username, 0, strpos($username, '@')));
			}
		}

		if($username === '') {
			return null;
		}

		// Security check for null in name, which can be
		// a potential security hole.
		if (preg_match('/\x00/',$username)) {
			return null;
		}

		return $username;
	}

	protected $options; ///< Options passed to the constructor.
}