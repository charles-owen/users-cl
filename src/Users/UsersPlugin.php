<?php
/**
 * @file
 * Site plugin for the Users subsystem
 */

namespace CL\Users;

use CL\Site\Api\APIException;
use CL\Site\Site;
use CL\Site\System\Server;
use CL\Users\Api\ApiUsers;
use CL\Site\Router;
use CL\Console\ConsoleView;

/**
 * Site plugin for the Users subsystem
 *
 * @cond
 * @property User user
 * @property Authenticate auth
 * @property array permissions
 * @property string privateKey
 * @property string publicKey
 * @property array preferences
 * @endcond
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
	 * permission | array | The permissions mapping array
	 *
	 * @return mixed
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

			case 'permissions':
				return $this->permissions;

			case 'preferences':
				return $this->preferences;

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
				$GLOBALS['user'] = $value;
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
	 * @param string $userid The user ID
	 * @param string $name User name
	 * @param string $role User role
	 * @param string $password Hashed password created by password_hash($password, PASSWORD_DEFAULT)
	 */
	public function addUser($userid, $name, $role, $password=null) {
		$this->users[$userid] = ['user'=>$userid, 'name'=>$name, 'role'=>$role, 'password'=>$password];
	}

	/**
	 * Get a manually added user
	 * @param string $userId The user ID
	 * @return array|null Array of user information if user is a manually added user.
	 */
	public function getUser($userId) {
		if(isset($this->users[$userId])) {
			return $this->users[$userId];
		}

		return null;
	}

	/**
	 * For a tagged permission object, set the minimum permission.
	 *
	 * The tagged permission system allows tags to be set
	 * that define the permissions necessary to use parts of the system.
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
		parent::install($site);

		$this->preferenceAdd(new Preferences\PreferenceName());
		$this->preferenceAdd(new Preferences\PreferenceUserId());
		$this->preferenceAdd(new Preferences\PreferenceEmail());

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
        // If this page has no defined user
        if(isset($site->options['nouser']) && $site->options['nouser']) {
            $site->users->user = null;
            return null;
        }

        // This global variable makes page creation easier
        $GLOBALS['user'] = $site->users->user;
        if($site->users->user !== null) {
			// We have a logged-in user already
			return null;
		}

		// Default authentication if none installed
		if($site->users->auth === null) {
			$site ->users->auth = new Authenticate();
		}

		// Can we authenticate?
		if($site->users->auth !== null) {
		    try {
                $site->users->user = $site->users->auth->authenticate($site, $server, $time);
            } catch(\CL\Tables\TableException $exception) {
                $site->unavailable = 'Site is unable to connect to database.';
		        if(!$server->apiURI()) {
                    return $site->root . '/cl/unavailable';
                }
            }
		}

        $GLOBALS['user'] = $site->users->user;
		if($site->users->user !== null) {
			// We have a logged-in user already
			return null;
		}

        $GLOBALS['user'] = null;

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
		//
		// Allow an at-least role to be specified for a page.
		// If user does not meet that requirement, they are
		// redirected to a not authorized page
		//
		// at-least can be:
		//   'at-least' => User::STAFF
		//   'at-least' => ['configurable-permission-tag', default permission]
		//
		// Also accept 'atLeast'
		//
		foreach(['atLeast', 'at-least'] as $tag) {
			if(isset($site->options[$tag])) {
				$option = $site->options[$tag];
				if(is_array($option)) {
					$atLeast = $this->atLeast($option[0], $option[1]);
				} else {
					$atLeast = $option;
				}

				if($this->user === null || !$this->user->atLeast($atLeast)) {
					if(isset($site->options['resource'])) {
						$message = $site->options['resource'];
					} else {
						$message = 'selected page';
					}

					return $site->root . '/cl/notauthorized/' . urlencode($message);
				}
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

			$router->addRoute(['aboutme'], function(Site $site, Server $server, array $params, array $properties, $time) {
				$view = new AboutMeView($site);
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

	/**
	 * Get a preference item by tag
	 * @param string $tag Tag to search for
	 * @return Preference|null The Preference object or null if not installed
	 */
	public function preferenceGet($tag) {
		if(isset($this->preferences[$tag])) {
			return $this->preferences[$tag];
		}

		return null;
	}

	/**
	 * Add a new preference that can be viewed or set on the AboutMe page
	 * @param Preference $preference Preference to add
	 */
	public function preferenceAdd(Preference $preference) {
		// Does it already exist? If so we use the order it had
		// before.
		if(isset($this->preferences[$preference->tag])) {
			$preference->order = $this->preferences[$preference->tag]->order;
		} else {
			// Determine if the order is set
			if($preference->order === null) {
				// If not set, use one more than the highest order item seen so far
				$this->maxPrefOrder++;
				$preference->order = $this->maxPrefOrder;
			} else {
				if($preference->order > $this->maxPrefOrder) {
					$this->maxPrefOrder = $preference->order;
				}
			}
		}

		$this->preferences[$preference->tag] = $preference;
	}

	/**
	 * Create preference data suitable for sending to client systems.
	 * @param Site $site The site object
	 * @param User $user The user we are sending data for
	 * @return array Data
	 */
	public function preferencesData(Site $site, User $user) {
		$preferences = array_values($this->preferences);

		usort($preferences, function($a, $b) {
			return $a->order - $b->order;
		});

		$data = [];
		foreach($preferences as $preference) {
			$data[] = $preference->data($site, $user);
		}
		return $data;
	}

	// Users added manually to the system.
	// Generally only used for initial startup
	private $users = [];

	private $user = null;       // Currently signed in user
	private $auth = null;       // Authentication component

	private $permissions = [];  // Tagged permissions management

	private $preferences = [];  // User preferences by tag
	private $maxPrefOrder = 0;  // Maximum value so far for any preference

	private static $publicKey = null;
	private static $privateKey = null;
}