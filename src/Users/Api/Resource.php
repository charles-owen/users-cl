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

}