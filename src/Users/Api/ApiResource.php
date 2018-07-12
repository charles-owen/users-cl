<?php
/**
 * @file
 * Base class for API resources
 */

namespace CL\Users\Api;

use CL\Site\Site;
use CL\Site\System\Server;
use CL\Users\User;
use CL\Tables\TableMaker;
use CL\Site\Api\JsonAPI;
use CL\Site\Api\APIException;

/**
 * Base class for API resources
 *
 * This is a base class for API resources. The reason it is in Users is it
 * is mainly used for tasks that require a valid user or admin.
 */
class ApiResource {

	public function __construct() {
	}

	/**
	 * Ensure a user is actually logged in.
	 * @param Site $site The Site object containing the user
	 * @throws APIException If no logged in user
	 * @return User object
	 */
	protected function isUser(Site $site) {
		$user = $site->users->user;
		if($user === null) {
			throw new APIException("Not authorized", APIException::NOT_AUTHORIZED);
		}

		return $user;
	}

	protected function atLeast(User $user, $role) {
		if($user === null || !$user->atLeast($role)) {
			throw new APIException("Not authorized", APIException::NOT_AUTHORIZED);
		}
	}

	protected function ensure($keys, $required) {
		if(is_array($required)) {
			if(!Server::ensureKeys($keys, $required)) {
				throw new APIException("Invalid API Usage", APIException::INVALID_API_USAGE);
			}
		} else {
			if(!isset($keys[$required])) {
				throw new APIException("Invalid API Usage", APIException::INVALID_API_USAGE);
			}
		}

	}

	protected function tables(Site $site, Server $server, TableMaker $maker) {
		$user = $site->users->user;
		if($user === null || !$user->atLeast(User::ADMIN)) {
			throw new APIException("Not authorized", APIException::NOT_AUTHORIZED);
		}

		$post = $server->post;
		if(!isset($post['drop'])) {
			throw new APIException("Invalid API Usage", APIException::INVALID_API_USAGE);
		}

		$drop = $post['drop'] === 'yes';

		if(!$maker->create($drop)) {
			throw new APIException("Table creation failed", APIException::UNABLE_TO_WRITE_DATABASE);
		}

		return new JsonAPI();
	}

	protected static function sanitize($value) {
		return trim(strip_tags($value));
	}
}