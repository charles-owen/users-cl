<?php
/**
 * @file
 * API Resource for /api/users
 */

namespace CL\Users\Api;

use CL\Site\Site;
use CL\Site\System\Server;
use CL\Site\Api\JsonAPI;
use CL\Site\Api\APIException;
use CL\Users\Autologin;
use CL\Users\UserTables;
use CL\Users\User;
use CL\Users\Users;

/**
 * API Resource for /api/users
 */
class ApiUsers extends \CL\Users\Api\Resource {
	/// Limit on query requests
	const QUERY_LIMIT = 500;

	//
	// Must match values in Users.js
	/// \cond
	const MUST_PROVIDE_USERID_OR_EMAIL = 101;
	const PASSWORDS_MUST_MATCH = 102;
	const DUPLICATE_USER = 103;
	const DUPLICATE_EMAIL = 104;
	/// \endcond

	/**
	 * ApiUsers constructor.
	 */
	public function __construct() {
		parent::__construct();
	}

	/**
	 * Concrete API resources dispatcher.
	 * @param Site $site The Site object
	 * @param Server $server The Server object
	 * @param array $params The path beyond the page that invoked this call
	 * @param array $properties Properties determined from the page options like :id
	 * @param int $time The current time
	 * @return mixed Result of the API operation.
	 * @throws APIException
	 */
	protected function dispatch(Site $site, Server $server, array $params, array $properties, $time) {
		if(count($params) < 1) {
			return $this->query($site, $server);
		}

		switch($params[0]) {
			case 'new':
				return $this->newOrUpdate($site, $server, false, $params, $time);

			case 'update':
				return $this->newOrUpdate($site, $server, true, $params, $time);

			case 'delete':
				return $this->delete($site, $server);

			case 'login':
				return $this->login($site, $server, $time);

			case 'logout':
				return $this->logout($site, $server, $time);

			case 'preference':
				return $this->preference($site, $server, $params, $time);

			case 'tables':
				return $this->tables($site, $server, new UserTables($site->db));
		}

		throw new APIException("Invalid API Path", APIException::INVALID_API_PATH);
	}

	private function preference(Site $site, Server $server, $params, $time) {
		if(count($params) < 2) {
			throw new APIException("Invalid API Path", APIException::INVALID_API_PATH);
		}

		$key = trim(strip_tags($params[1]));

		$user = $this->isUser($site, User::USER);
		$post = $server->post;
		if(isset($post['value'])) {
			// We are setting the preference
			$user->metaData->set(User::METADATA_PREFERENCES, $key, strip_tags($post['value']));
			$users = new Users($site->db);
			$users->writeMetaData($user);
			return new JsonAPI();
		} else {
			// We are getting the preference
			$json = new JsonAPI();
			$json->addData('preference', $user->id,
				$user->metaData->get(User::METADATA_PREFERENCES, $key));

			return $json;
		}
	}

	private function login(Site $site, Server $server, $time) {
		$auth = $site->users->auth;
		if($auth === null) {
			throw new APIException("Site not configured for login");
		}

		// This will fail with an exception if not able to login
		$user = $auth->login($site, $server);
		$site->users->user = $user;

		//
		// Create the session cookie
		//
		$jwt = $user->createJWT($site, $time);
		$cookiename = $site->cookiePrefix . User::COOKIENAME;
		$server->setcookie($cookiename, $jwt, 0, "/");

		if(isset($server->post['keep']) && $server->post['keep']) {
			// The automatic login cookie system
			$autologin = new Autologin($site->db);
			$cred = $autologin->create($user->id, $time);

			$cookiename = $site->cookiePrefix . Autologin::COOKIENAME;

			$server->setcookie($cookiename,
				$cred['id'] . ':' . $cred['token'],
				time() + 86400 * Autologin::PERIOD, "/");
		}

		$json = new JsonAPI();
		return $json;
	}


	private function logout(Site $site, Server $server, $time) {
		$site->users->user = null;

		$cookiename = $site->cookiePrefix . User::COOKIENAME;
		$server->deleteCookie($cookiename);

		$cookiename = $site->cookiePrefix . Autologin::COOKIENAME;
		$autologin = new Autologin($site->db);
		if(!empty($server->cookie[$cookiename])) {
			// Attempt to validate
			$cred = explode(":", $server->cookie[$cookiename]);
			$autologin->delete($cred[0]);
		}
		$server->deleteCookie($cookiename);

		$json = new JsonAPI();
		return $json;
	}

	private function query(Site $site, Server $server) {
		$user = $site->users->user;
		if($user === null || !$user->atLeast(User::STAFF)) {
			throw new APIException("Not authorized", APIException::NOT_AUTHORIZED);
		}

		$params = [];
		$get = $server->get;

		if(!empty($get['id'])) {
			$params['id'] = $get['id'];
		}

		if(!empty($get['limit'])) {
			$limit = $get['limit'];
		} else {
			$limit = ApiUsers::QUERY_LIMIT;
		}

		$params['limit'] = $limit + 1;


		if(!empty($get['offset'])) {
			$params['offset'] = $get['offset'];
		}

		if(!empty($get['userId'])) {
			$params['userId'] = $get['userId'];
		}


		if(!empty($get['email'])) {
			$params['email'] = $get['email'];
		}

		if(!empty($get['search'])) {
			$params['search'] = $get['search'];
		}

		$users = new Users($site->db);
		$result = $users->query($params);
		$reply = [];
		foreach($result as $user) {
			if(count($reply) >= $limit) {
				$reply[] = ['more'=>'yes'];
				break;
			}

			$reply[] = $user->data();
		}

		$json = new JsonAPI();
		$json->addData('users', 0, $reply);

		if(!empty($get['prevnext']) && count($result) === 1) {
			$user = $result[0];
			$prevs = $users->query(['before'=>['name'=>$user->name, 'id'=>$user->id], 'limit'=>1]);
			if(count($prevs) > 0) {
				$json->addData('prev-user', 0, $prevs[0]->data());
			}

			$nexts = $users->query(['after'=>['name'=>$user->name, 'id'=>$user->id], 'limit'=>1]);
			if(count($nexts) > 0) {
				$json->addData('next-user', 0, $nexts[0]->data());
			}
		}

		// Sequence echo option.
		if(!empty($get['seq'])) {
			$json->addData('seq', strip_tags($get['seq']), []);
		}
		
		return $json;
	}


	/**
	 * Add a new user or update an existing user
	 * @param Site $site
	 * @param Server $server
	 * @param $params
	 * @return JsonAPI
	 * @throws APIException
	 */
	private function newOrUpdate(Site $site, Server $server, $update, $params, $time) {
		$user = $site->users->user;
		if($user === null || !$user->atLeast(User::ADMIN)) {
			throw new APIException("Not authorized", APIException::NOT_AUTHORIZED);
		}

		$required = ['userId', 'name', 'email', 'role', 'password1', 'password2'];
		if($update) {
			$required = ['id'];
		}
		$post = $server->post;
		if(!Server::ensureKeys($post, $required)) {
			throw new APIException("Invalid API Usage", APIException::INVALID_API_USAGE);
		}

		$password1 = trim(strip_tags($post['password1']));
		$password2 = trim(strip_tags($post['password2']));
		if(($password1 !== '' || $password2 !== '') && $password1 !== $password2) {
			throw new APIException("Passwords must match", ApiUsers::PASSWORDS_MUST_MATCH);
		}

		$userData = [
			'user'=>trim(strip_tags($post['userId'])),
			'name'=>trim(strip_tags($post['name'])),
			'email'=>trim(strip_tags($post['email'])),
			'role'=>strip_tags($post['role'])
		];
		if($update) {
			$userData['id'] = trim(strip_tags($post['id']));
		}

		$newUser = new User($userData);


		if($newUser->userId === null && $newUser->email === null) {
			throw new APIException("Must provide a user ID or email address", ApiUsers::MUST_PROVIDE_USERID_OR_EMAIL);
		}

		$users = new Users($site->db);
		if($update) {
			$ret = $users->update($newUser);
		} else {
			$ret = $users->add($newUser, $time);
		}

		if(!$ret['ok']) {
			if(isset($ret['duplicate'])) {
				if($ret['duplicate'] === 'email') {
					throw new APIException("Email address already exists", ApiUsers::DUPLICATE_EMAIL);
				}

				if($ret['duplicate'] === 'user') {
					throw new APIException("User ID already exists", ApiUsers::DUPLICATE_USER);
				}
			}
			throw new APIException("Failed to write to database", APIException::UNABLE_TO_WRITE_DATABASE);
		}

		if($password1 !== '') {
			$users->setPassword($newUser->id, $password1);
		}

		$json = new JsonAPI();
		$json->addData($update ? 'updated-user' : 'new-user', $newUser->id, $newUser->data());
		return $json;
	}

	private function delete(Site $site, Server $server) {
		$user = $site->users->user;
		if($user === null || !$user->atLeast(User::ADMIN)) {
			throw new APIException("Not authorized", APIException::NOT_AUTHORIZED);
		}

		$post = $server->post;
		if(!isset($post['id'])) {
			throw new APIException("Invalid API Usage", APIException::INVALID_API_USAGE);
		}

		$id = trim(strip_tags($post['id']));
		$users = new Users($site->db);
		$users->delete($id);

		return new JsonAPI();
	}

}