<?php

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
class ApiUsers extends \CL\Users\Api\ApiResource {
	const QUERY_LIMIT = 500;

	// Must match values in Users.js
	const MUST_PROVIDE_USERID_OR_EMAIL = 101;
	const PASSWORDS_MUST_MATCH = 102;
	const DUPLICATE_USER = 103;
	const DUPLICATE_EMAIL = 104;

	public function __construct() {
		parent::__construct();
	}

	public function dispatch(Site $site, Server $server, array $params, $time) {

		if(count($params) === 0) {
			return $this->query($site, $server);
		}

		switch($params[0]) {
			case 'login':
				return $this->login($site, $server, $time);

			case 'logout':
				return $this->logout($site, $server, $time);

			case 'user':
				return $this->user($site, $server, $params);

			case 'new':
				return $this->newOrUpdate($site, $server, false, $params, $time);

			case 'update':
				return $this->newOrUpdate($site, $server, true, $params, $time);

			case 'delete':
				return $this->delete($site, $server);

			case 'tables':
				return $this->tables($site, $server, new UserTables($site->db));
		}

		throw new APIException("Invalid API Path", APIException::INVALID_API_PATH);
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

		if(!empty($get['userId'])) {
			$params['userId'] = $get['userId'];
		}


		if(!empty($get['email'])) {
			$params['email'] = $get['email'];
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

		// Sequence echo option.
		if(!empty($get['seq'])) {
			$json->addData('seq', strip_tags($get['seq']), []);
		}
		return $json;
	}

	/**
	 * Get a single user, either the current user or a selected user
	 * @param Site $site
	 * @param Server $server
	 * @param $params
	 */
	private function user(Site $site, Server $server, $params) {
		$user = $site->users->user;
		if($user === null) {

		}
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
		$json->addData('new-user', $newUser->id, $newUser->data());
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