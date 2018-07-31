<?php
/**
 * @file
 * LDAP-based authentication
 */

namespace CL\Users;

use \CL\Site\Site;
use \CL\Site\System\Server;
use \CL\Site\Api\APIException;

/**
 * LDAP-based authentication
 */
class AuthenticateLDAP extends Authenticate {
	/**
	 * Authenticate constructor.
	 *
	 * Example usage:
	 * \code:
	 * $site->users->auth = new \CL\Users\AuthenticateLDAP(['sandbox-bypass'=>true, 'email-strip' => true],
	 *           "ldap://ds.cse.msu.edu:389",
	 *           "ou=People,dc=cse,dc=msu,dc=edu"
	 * );
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
	 * @param string $url URL for the LDAP server
	 * @param string $basedn Base domain name indication.
	 */
	public function __construct($options = [], $url, $basedn) {
		parent::__construct($options);

		$this->url = $url;
		$this->basedn = $basedn;
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
			// Connect to the LDAP server
			$ldap = @\ldap_connect($this->url);
			if(!$ldap) {
				throw new APIException("Invalid authentication server configuration");
			}

			// Security check for null in name or password, which can be
			// a potential security hole.
			if ($username === null or preg_match('/\x00/',$password)) {
				throw new APIException("Unable to login: Invalid authentication credentials");
			}

			$ldaprdn = "uid=$username,$this->basedn";

			\ldap_set_option($ldap, LDAP_OPT_PROTOCOL_VERSION, 3);
			\ldap_set_option($ldap, LDAP_OPT_REFERRALS, 0);

			$bind = @\ldap_bind($ldap, $ldaprdn, $password);
			@\ldap_close($ldap);

			if(!$bind) {
				// If the LDAP method fails, try the build-in
				// password system instead.
				return parent::login($site, $server);
			}
		}

		/*
	 	* User Management, allows guest users
	 	*/
		$users = new Users($site->db);
		$user = $users->getByUser($username);
		if($user === null) {
			$user = $users->createGuestUser($username);
		}

		return $user;
	}

	private $url;
	private $basedn;
}