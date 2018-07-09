<?php
/**
 * @file Site configuration object for Users
 */

namespace CL\Users;

use CL\Site\Components\InstalledConfig;
use CL\Site\System\Server;

/**
 * Site configuration object for Course
 */
class UsersConfig extends InstalledConfig {
	/**
	 * Property get magic method
	 * @param string $key Property name
	 *
	 * Properties supported:
	 * db Database configuration object
	 *
	 * @return null|string
	 */
	public function __get($key) {
		switch($key) {
			case 'user':
				return $this->user;

			case 'auth':
				return $this->auth;

			case 'private_key':
				return self::$private_key;

			case 'public_key':
				return self::$public_key;

			default:
				return parent::__get($key);
		}
	}

	/**
	 * Property set magic method
	 * @param string $key Property name
	 * @param string $value Value to set
	 */
	public function __set($key, $value) {
		switch($key) {
			case 'user':
				$this->user = $value;
				break;

			case 'auth':
				$this->auth = $value;
				break;

			default:
				parent::__set($key, $value);
				break;
		}
	}

	/**
	 * Manually add a user.
	 *
	 * Generally only used during system startup.
	 * @param $userid The user ID
	 * @param $name User name
	 * @param $role User role
	 * @param $password Hashed password created by password_hash($password, PASSWORD_DEFAULT)
	 */
	public function addUser($userid, $name, $role, $password) {
		$this->users[$userid] = ['user'=>$userid, 'name'=>$name, 'role'=>$role, 'password'=>$password];
	}

	public function getUser($userid) {
		if(isset($this->users[$userid])) {
			return $this->users[$userid];
		}

		return null;
	}

	/**
	 * Set the public and private keys
	 * @param $public
	 * @param $private
	 */
	public function set_keys($public, $private) {
		self::$public_key = $public;
		self::$private_key = $private;
	}

	/// Users added manually to the system.
	/// Generally only used for initial startup
	private $users = [];

	private $user = null;   ///< Currently signed in user
	private $auth = null;   ///< Authentication component

    private static $public_key = null;
	private static $private_key = null;
}