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
abstract class Resource extends \CL\Site\Api\Resource {
	/**
	 * Resource constructor.
	 */
	public function __construct() {
		parent::__construct();
	}

	/**
	 * Ensure a user is actually logged in.
	 * @param Site $site The Site object containing the user
	 * @param string $atLeast If specified the user must have some minimum role.
	 * @throws APIException If no logged in user
	 * @return User object
	 */
	protected function isUser(Site $site, $atLeast=null) {
		$user = $site->users->user;
		if($user === null) {
			throw new APIException("Not authorized", APIException::NOT_AUTHORIZED);
		}

		if($atLeast !== null) {
			$this->atLeast($user, $atLeast);
		}

		return $user;
	}

	/**
	 * Ensure a user has at least some specified role. If not, an exception is thrown.
	 * @param User $user Use we are testing
	 * @param string $role User role
	 * @throws APIException Throne if the user does not meet the role requirement.
	 */
	protected function atLeast(User $user, $role) {
		if($user === null || !$user->atLeast($role)) {
			throw new APIException("Not authorized", APIException::NOT_AUTHORIZED);
		}
	}

	/**
	 * Convenience function that ensures specified POST or GET keys are included for
	 * an API call.
	 * @param array $keys The provided keys (usually $server->get or $server->post).
	 * @param array $required An array of required key values.
	 * @throws APIException Exception thrown if a key is not provided.
	 */
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

	/**
	 * The target for /tables API calls. Provides for the creation and optional dropping of tables.
	 *
	 * Since most subsystems have some tables, all that is needed is a tablemaker class
	 * with each table specified in it and this dispatching in the API resource:
	 *
	 * \code
	 * 			case 'tables':
	 *              return $this->tables($site, $server, new UserTables($site->db));
	 * \endcode
	 *
	 * @param Site $site The Site object
	 * @param Server $server The Server object
	 * @param TableMaker $maker A table maker object for a subsystem.
	 * @return JsonAPI On success an empty message is returned.
	 * @throws APIException Thrown if not authorized or there is a database error.
	 */
	protected function tables(Site $site, Server $server, TableMaker $maker) {
		$user = $site->users->user;
		if($user === null || !$user->atLeast(User::ADMIN)) {
			throw new APIException("Not authorized", APIException::NOT_AUTHORIZED);
		}

		$post = $server->post;
		if(!empty($post['clean']) && $post['clean'] === 'yes') {
			$json = new JsonAPI();
			$json->addData('table-clean', 0, $maker->clean());
			return $json;
		}

		if(!isset($post['drop'])) {
			throw new APIException("Invalid API Usage", APIException::INVALID_API_USAGE);
		}

		$drop = $post['drop'] === 'yes';

		if(!$maker->create($drop)) {
			throw new APIException("Table creation failed", APIException::UNABLE_TO_WRITE_DATABASE);
		}

		return new JsonAPI();
	}

}