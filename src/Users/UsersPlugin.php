<?php
/**
 * @file
 * Plugin for add users support to Site.
 */

namespace CL\Users;

use CL\Site\Site;
use CL\Site\System\Server;
use CL\Users\Api\ApiUsers;

class UsersPlugin extends \CL\Site\Components\Plugin {
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

		$site->addApi('users', function(Site $site, Server $server, array $params, $time) {
			$resource = new ApiUsers();
			return $resource->dispatch($site, $server, $params, $time);
		});
	}

	/**
	 * Handle activities prior to startup of the user system
	 *
	 * Ensure the tables exist
	 *
	 * @param Site $config
	 * @param Server $server
	 * @param int $time Current time
	 * @return null|string redirect page.
	 */
	private function preStartup(Site $config, Server $server, $time) {
		// Ensure tables exist...
		$users = new Users($config->db);
		if(!$users->exists()) {
			$maker = new UserTables($config->db);
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
		if(in_array('open', $site->options)) {
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
		if(isset($site->options['at-least'])) {
			if($site->users->user === null ||
				!$site->users->user->atLeast($site->options['at-least'])) {
				if(isset($site->options['resource'])) {
					$message = urlencode($site->options['resource']);
				} else {
					$message = 'selected page';
				}

				return $site->root . '/cl/site/notauthorized.php?r=' . $message;
			}
		}

		//
		// Install in the control panel
		//
		$site->console->addPlugin('usersconsole', []);

		return null;
	}

}