<?php
/**
 * @file
 * Site plugin for the Users subsystem
 */

namespace CL\Users;

use CL\Site\Site;
use CL\Site\System\Server;
use CL\Users\Api\ApiUsers;
use CL\Site\Router;
use CL\Console\ConsoleView;

/**
 * Site plugin for the Users subsystem
 */
class UsersPlugin extends \CL\Site\Plugin  {
	/**
	 * A tag that represents this plugin
	 * @return string A tag like 'course', 'users', etc.
	 */
	public function tag() {return 'users';}

	/**
	 * Return an array of tags indicating what plugins this one is dependent on.
	 * @return array of tags this plugin is dependent on
	 */
	public function depends() {return [];}

	/**
	 * Property get magic method
	 * @param string $property Property name
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
	public function __get($property) {
		switch($property) {
			case 'auth':
				return $this->auth;

			case 'privateKey':
				return self::$privateKey;

			case 'publicKey':
				return self::$publicKey;

			case 'user':
				return $this->user;

			default:
				return parent::__get($property);
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
	 * @param string $property Property name
	 * @param string $value Value to set
	 */
	public function __set($property, $value) {
		switch($property) {
			case 'auth':
				$this->auth = $value;
				break;

			case 'user':
				$this->user = $value;
				break;

			default:
				parent::__set($property, $value);
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

	/**
	 * Install the plugin!
	 * @param Site $site The Site object
	 */
	public function install(Site $site) {
		$this->site = $site;
		$site->install("users", $this);

		$site->addStartup(function(Site $site, Server $server, $time) {
			return $this->startup($site, $server, $time);
		});

		$site->addPostStartup(function(Site $site, Server $server, $time) {
			return $this->postStartup($site, $server, $time);
		});
	}


	/**
	 * Handle startup of the user system
	 * @param Site $site
	 * @param Server $server
	 * @param int $time Current time
	 * @return null|string redirect page.
	 */
	private function startup(Site $site, Server $server, $time) {
		if($site->users->user !== null) {
			// We have a logged-in user already
			return null;
		}

		// Can we authenticate?
		if($site->users->auth !== null) {
			$site->users->user = $site->users->auth->authenticate($site, $server, $time);
		}

		if($site->users->user !== null) {
			// We have a logged-in user already
			return null;
		}

		// If this is an open page, we allow no active user
		if(isset($site->options['open']) && $site->options['open']) {
			return null;
		}

		return $site->root . '/cl/login?u=' . urlencode($server->server['REQUEST_URI']);
	}

	/**
	 * System is started, perform any validation required
	 * @param Site $site
	 * @param Server $server
	 * @param int $time Current time
	 * @return null|string redirect page.
	 */
	private function postStartup(Site $site, Server $server, $time) {
		// Accese UsersConfig
		$users = $site->users;

		//
		// Allow an at-least role to be specified for a page.
		// If user does not meet that requirement, they are
		// redirected to a not authorized page
		//
		// at-least can be:
		//   'at-least' => User::STAFF
		//   'at-least' => ['configurable-permission-tag', default permission]
		//
		if(isset($site->options['at-least'])) {
			$option = $site->options['at-least'];
			if(is_array($option)) {
				$atLeast = $users->atLeast($option[0], $option[1]);
			} else {
				$atLeast = $option;
			}

			if($site->users->user === null || !$site->users->user->atLeast($atLeast)) {
				if(isset($site->options['resource'])) {
					$message = $site->options['resource'];
				} else {
					$message = 'selected page';
				}

				return $site->root . '/cl/notauthorized/' . urlencode($message);
			}
		}

		return null;
	}

	/**
	 * Amend existing object
	 * The Router is amended with routes for the login page
	 * and for the user API.
	 * @param $object Object to amend.
	 */
	public function amend($object) {
		if($object instanceof Router) {
			$router = $object;
			$router->addRoute(['login'], function(Site $site, Server $server, array $params, array $properties, $time) {
				$view = new LoginView($site);
				return $view->vue();
			});

			$router->addRoute(['api', 'users', '*'], function(Site $site, Server $server, array $params, array $properties, $time) {
				$resource = new ApiUsers();
				return $resource->apiDispatch($site, $server, $params, $properties, $time);
			});
		} else if($object instanceof ConsoleView) {
			$object->addJS('usersconsole');
		}
	}

	/**
	 * Ensure tables exist for the Users subsystem.
	 * @param Site $site The site configuration component
	 */
	public function ensureTables(Site $site) {
		$maker = new UserTables($site->db);
		$maker->create(false);
	}

	private $site = null;   ///< The Site object

	/// Users added manually to the system.
	/// Generally only used for initial startup
	private $users = [];

	private $user = null;   ///< Currently signed in user
	private $auth = null;   ///< Authentication component

	private $permissions = [];  ///< Tagged permissions management

	private static $publicKey = null;
	private static $privateKey = null;
}