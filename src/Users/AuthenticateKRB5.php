<?php
/**
 * @file
 * KRB5-based authentication
 */

namespace CL\Users;

use \CL\Site\Site;
use \CL\Site\System\Server;
use \CL\Site\Api\APIException;

/**
 * KRB5-based authentication
 *
 * Precondition: Server must be configured for KRB5 authentication.
 */
class AuthenticateKRB5 extends Authenticate {
	/**
	 * Authenticate constructor.
	 *
	 * Example usage:
	 * \code:
     * $site->users->auth = new \CL\Users\AuthenticateKRB5(
     * ['sandbox-bypass'=>true, 'email-strip' => true, 'append'=>'@egr.msu.edu']);
     * \endcode
	 *
	 * @param array $options That can contain options we can add.
	 * Possible options:
	 *
	 * 'sandbox-bypass'=>true will bypass passwords if
	 * we are in the sandbox.
	 *
	 * 'email-strip'=>true will strip \@anything from the
	 * entered address, reducing to just the user ID.
     *
     * 'append'=>string to append to the ID when used for lookup
	 */
	public function __construct($options = []) {
		parent::__construct($options);
	}



	/**
	 * Attempt to log a user in.
	 *
	 * This version uses LDAP to attempt to log in.
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
		$password = $post['password'];

		// The bypass feature allows skipping passwords
		// when running in the sandbox only.
		$bypass = $site->sandbox &&
			!empty($this->options['sandbox-bypass']) &&
			$this->options['sandbox-bypass'];

		if(!$bypass) {
			// Security check for null in name or password, which can be
			// a potential security hole.
			if ($username === null or preg_match('/\x00/',$password)) {
				throw new APIException("Unable to login: Invalid authentication credentials");
			}

			// Optional append
            $userLookup = $username;
			if(!empty($this->options['append'])) {
                $userLookup .= $this->options['append'];
            }

            // Create the connection to KRB5
            if(!class_exists('\KRB5CCache')) {
                throw new APIException("Invalid authentication server configuration");
            }

            $krb5 = new \KRB5CCache();

			try {
                $krb5->initPassword($userLookup, $password);
                $entries = $krb5->getEntries();

            } catch(\Exception $ex) {
                // If the KRB5 method fails, try the build-in
                // password system instead.
                return parent::login($site, $server);
            }
		}

		try {
            /*
             * User Management, allows guest users
             */
            $users = new Users($site->db);
            $user = $users->getByUser($username);
            if($user === null) {
                $user = $users->createGuestUser($username);
            }

            return $user;
        } catch(\CL\Tables\TableException $exception) {
            throw new APIException("Site is unable to connect to database.", APIException::UNAVAILABLE);
        }
	}
}