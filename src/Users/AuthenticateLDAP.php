<?php
/**
 * Created by PhpStorm.
 * User: cbowen
 * Date: 5/3/2016
 * Time: 11:14 PM
 */

namespace Auth;


class AuthenticateLDAP extends Authenticate {

	public function __construct($url, $basedn) {
		$this->url = $url;
		$this->basedn = $basedn;
	}

	/**
	 * Get a location to redirect to if authentication fails.
	 *
	 * This can be a page on this or any other site.
	 *
	 * @param \Course $course Course object
	 * @return string Location to redirect to if authentication fails
	 */
	public function noauth(\Course $course) {
		$libroot = $course->get_libroot();
		return $libroot . '/login.php';
	}

	/**
	 * Attempt to log a user in
	 * @param \Course $course
	 * @param $post
	 * @return \User object if successful or NULL otherwise
	 */
	public function login(\Course $course, $post) {
		if(!isset($post['userid']) || !isset($post['password'])) {
			return $this->fail("Invalid usage");
		}

		$username = $this->getUserId($post);
		$password = $post['password'];

		// If we are in the sandbox, we accept any user without
		// checking the password.
		if(!$course->get_sandbox()) {
			// Connect to the LDAP server
			$ldap = @\ldap_connect($this->url);
			if(!$ldap) {
				return $this->fail("Invalid authentication server configuration");
			}

			// Security check for null in name or password, which can be
			// a potential security hole.
			if ($username === null or preg_match('/\x00/',$password)) {
				return $this->fail("Unable to login: Invalid authentication credentials");
			}

			$ldaprdn = "uid=$username,$this->basedn";

			\ldap_set_option($ldap, LDAP_OPT_PROTOCOL_VERSION, 3);
			\ldap_set_option($ldap, LDAP_OPT_REFERRALS, 0);

			$bind = @\ldap_bind($ldap, $ldaprdn, $password);
			@\ldap_close($ldap);

			if(!$bind) {
				// If the LDAP method fails, try the build-in
				// password system instead.
				return parent::login($course, $post);
			}
		}

		/*
	 	* User Management, allows guest users
	 	*/
		$users = new \Users($course);
		$user = $users->get_user_by_userid($username);
		if($user === null) {
			$user = $users->create_guest_user($username);
		}

		return $user;
	}



	private $url;
	private $basedn;
}