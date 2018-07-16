<?php
/**
 * @file
 * Site configuration object for the Users subsystem
 */

namespace CL\Users;

use CL\Site\Components\InstalledConfig;
use CL\Site\System\Server;

/**
 * Site configuration object for the Users subsystem
 */
class UsersConfig extends InstalledConfig {
	/**
	 * Property get magic method
	 * @param string $key Property name
	 *
	 * <b>Properties</b>
	 * Property | Type | Description
	 * -------- | ---- | -----------
	 * auth | Authenticate | Installed user authentication component
	 * privateKey | string | Private key to use for JWT
	 * publicKey | string | Public key to use for JWT
	 * user | User | The authenticated user
	 *
	 * @return null|string
	 */
	public function __get($key) {
		switch($key) {
			case 'auth':
				return $this->auth;

			case 'privateKey':
				return self::$privateKey;

			case 'publicKey':
				return self::$publicKey;

			case 'user':
				return $this->user;

			default:
				return parent::__get($key);
		}
	}

	/**
	 * Property set magic method
	 *
	 * <b>Properties</b>
	 * Property | Type | Description
	 * -------- | ---- | -----------
	 * auth | Authenticate | Install user authentication component
	 * user | User | The authenticated user
	 *
	 * @param string $key Property name
	 * @param string $value Value to set
	 */
	public function __set($key, $value) {
		switch($key) {
			case 'auth':
				$this->auth = $value;
				break;

			case 'user':
				$this->user = $value;
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
	public function addUser($userid, $name, $role, $password=null) {
		$this->users[$userid] = ['user'=>$userid, 'name'=>$name, 'role'=>$role, 'password'=>$password];
	}

	/**
	 * Get a manually added user
	 * @param $userid The user ID
	 * @return array|null Array of user information if user is a manually added user.
	 */
	public function getUser($userid) {
		if(isset($this->users[$userid])) {
			return $this->users[$userid];
		}

		return null;
	}

	/**
	 * For a tagged permission object, set the minimum permission.
	 *
	 * The tagged permission system allows tags to be set
	 * the define the permissions necesary to use parts of the system.
	 *
	 * @param string $tag Tag specified for the permission item.
	 * @param string $permission Minimum permission to set.
	 */
	public function setAtLeast($tag, $permission) {
		$this->permissions[$tag] = $permission;
	}

	/**
	 * Get the minimum permission associated with a given tag.
	 * @param string $tag Tag specified for the permission item.
	 * @param string $default Default to use if permission not specified.
	 * @return string
	 */
	public function atLeast($tag, $default) {
		if(isset($this->permissions[$tag])) {
			return $this->permissions[$tag];
		} else {
			return $default;
		}
	}

	/**
	 * Set the public and private keys
	 * @param $public
	 * @param $private
	 */
	public function setKeys($public, $private) {
		self::$publicKey = $public;
		self::$privateKey = $private;
	}

	/// Users added manually to the system.
	/// Generally only used for initial startup
	private $users = [];

	private $user = null;   ///< Currently signed in user
	private $auth = null;   ///< Authentication component

	private $permissions = [];  ///< Tagged permissions management

	private static $publicKey = null;
	private static $privateKey = null;
}