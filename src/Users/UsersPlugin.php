<?php
/**
 * @file
 * Plugin for add the Users subsystem. Add users support to Site.
 */

namespace CL\Users;

use CL\Site\Site;
use CL\Site\System\Server;
use CL\Users\Api\ApiUsers;

/**
 * Plugin for add the Users subsystem. Add users support to Site.
 */
class UsersPlugin extends \CL\Site\Components\Plugin {

	/**
	 * Install the plugin!
	 * @param Site $site The Site object
	 */
	public function install(Site $site) {
		$site->install("users", new UsersConfig());

		$site->addPreStartup(function(Site $site, Server $server, $time) {
			return $this->preStartup($site, $server, $time);
		});

		$site->addStartup(function(Site $site, Server $server, $time) {
			return $this->startup($site, $server, $time);
		}, 100);

		$site->addPostStartup(function(Site $site, Server $server, $time) {
			return $this->postStartup($site, $server, $time);
		});

		$site->addRoute(['login'], function(Site $site, Server $server, array $params, array $properties, $time) {
			$view = new LoginView($site);
			return $view->vue('login');
		});

		$site->addRoute(['api', 'users', '*'], function(Site $site, Server $server, array $params, array $properties, $time) {
			$resource = new ApiUsers();
			return $resource->apiDispatch($site, $server, $params, $properties, $time);
		});
	}

	/**
	 * Handle activities prior to startup of the user system
	 *
	 * Ensure the tables exist
	 *
	 * @param Site $site
	 * @param Server $server
	 * @param int $time Current time
	 * @return null|string redirect page.
	 */
	private function preStartup(Site $site, Server $server, $time) {
		// Ensure tables exist...
		$users = new Users($site->db);
		if(!$users->exists()) {
			$maker = new UserTables($site->db);
			$maker->create(false);
		}

		return null;
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

		//
		// Install in the control panel
		//
		$site->console->addPlugin('usersconsole', []);

		return null;
	}

}