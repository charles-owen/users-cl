<?php
/** @file
 * Unit tests for the class Users
 * @cond 
 */

require_once __DIR__ . '/init.php';
require_once __DIR__ . '/cls/UsersDatabaseTestBase.php';

use CL\Users\User;
use CL\Users\Users;
use CL\Users\Api\ApiUsers;
use CL\Users\Authenticate;
use CL\Site\Test\ServerMock;

class ApiUsersTest extends UsersDatabaseTestBase {
	/**
	 * @return PHPUnit_Extensions_Database_DataSet_IDataSet
	 */
	public function getDataSet() {
		return $this->dataSets(['user-many.xml']);
	}

	public function ensureTables() {
		$this->ensureTable(new Users($this->site->db));
	}

	public function test_api() {
		$server = new ServerMock();
		$api = new ApiUsers();

		$this->site->users->auth = new Authenticate();

		$server->setServer('REQUEST_URI', '/api/users/login');
		$time = time() + 1001;
		$ret = $api->apiDispatch($this->site, $server, ['login'], [], $time);
		$this->assertContains("errors", $ret);

		// Create a user with a password
		$time = time() + 1234;

		$users = new Users($this->site->db);

		$user1 = new User();
		$user1->name = 'Phibes, Anton';
		$user1->userId = 'anton';
		$user1->email = 'anton@phibes.us';
		$id1 = $users->add($user1, $time)['id'];

		$pw1 = 'crm9q2372g';
		$users->setPassword($id1, $pw1);

		$server->setPost("id", 'anton');
		$server->setPost('password', $pw1);
		$server->setPost('keep', 'true');
		$ret = $api->apiDispatch($this->site, $server, ['login'], [], $time);
		$this->assertNotContains("errors", $ret);
	}

	public function test_preference() {
		$server = new ServerMock();
		$api = new ApiUsers();

		$time = time() + 12345;

		$users = new Users($this->site->db);

		$user1 = new User();
		$user1->name = 'Phibes, Anton';
		$user1->userId = 'anton';
		$user1->email = 'anton@phibes.us';
		$user1->role = User::USER;
		$id1 = $users->add($user1, $time)['id'];

		$this->site->users->user = $user1;

		$pref = $user1->metaData->get(User::METADATA_PREFERENCES, 'test-pref', 'none');
		$this->assertEquals('none', $pref);

		$server->setServer('REQUEST_URI', '/api/preference/test-pref');
		$server->setPost("value", 'xxx');
		$ret = $api->apiDispatch($this->site, $server, ['preference', 'test-pref'], [], $time);
		$this->assertNotContains("errors", $ret);

		$server->unsetPost("value");
		$ret = $api->apiDispatch($this->site, $server, ['preference', 'test-pref'], [], $time);
		$this->assertNotContains("errors", $ret);

		$data = json_decode($ret, true);
		$this->assertEquals('xxx', $data['data'][0]['attributes']);
	}

	public function test_newUser() {
		//
		// Not authorized user
		//
		$manager = $this->addUser(User::STAFF);
		$this->site->users->user = $manager;

		$server = new ServerMock();
		$server->setPost('userId', 'newuser');
		$server->setPost('name', 'User, New');
		$server->setPost('email', 'newuser@wherever.com');
		$server->setPost('role', User::USER);
		$server->setPost('password1', '');
		$server->setPost('password2', '');
		$server->setServer('REQUEST_URI', '/api/users/new');

		$api = new ApiUsers();
		$time = time() + 1211;

		$ret = $api->apiDispatch($this->site, $server, ['new'], [], $time);
		$this->assertContains('"errors":', $ret);
		$this->assertContains('Not authorized', $ret);

		//
		// Valid addition
		//
		$admin = $this->addUser(User::ADMIN);
		$this->site->users->user = $admin;

		$server = new ServerMock();
		$server->setPost('userId', 'newuser');
		$server->setPost('name', 'User, New');
		$server->setPost('email', 'newuser@wherever.com');
		$server->setPost('role', User::USER);
		$server->setPost('password1', '');
		$server->setPost('password2', '');
		$server->setServer('REQUEST_URI', '/api/users/new');
		$time = time() + 1211;

		$ret = $api->apiDispatch($this->site, $server, ['new'], [], $time);
		$this->assertNotContains('error', $ret);


		//
		// Duplicate email
		//
		$server->setPost('userId', '');
		$time = time() + 1211;

		$ret = $api->apiDispatch($this->site, $server, ['new'], [], $time);
		$this->assertContains('error', $ret);
		$this->assertContains('Email address already exists', $ret);

		//
		// Duplicate user ID
		//
		$server->setPost('userId', 'newuser');
		$server->setPost('email', '');
		$time = time() + 1211;

		$ret = $api->apiDispatch($this->site, $server, ['new'], [], $time);
		$this->assertContains('error', $ret);
		$this->assertContains('User ID already exists', $ret);

		//
		// Invalid usage, missing keys
		//
		$server->unsetPost('userId');
		$time = time() + 1211;

		$ret = $api->apiDispatch($this->site, $server, ['new'], [], $time);
		$this->assertContains('error', $ret);
		$this->assertContains("Invalid API Usage", $ret);
	}

	public function test_query() {
		$manager = $this->addUser(User::STAFF);
		$this->site->users->user = $manager;

		$server = new ServerMock();
		$server->setServer('REQUEST_URI', '/api/users');
		$api = new ApiUsers();

		$time = time() + 1211;

		$ret = $api->apiDispatch($this->site, $server, [], [], $time);
		$this->assertNotContains('"errors":', $ret);

		$json = json_decode($ret, $ret);
		$this->assertCount(22, $json['data']['0']['attributes']);

		$server->setGet('limit', '3');
		$time = time() + 1211;

		$ret = $api->apiDispatch($this->site, $server, [], [], $time);
		$this->assertNotContains('"errors":', $ret);
		$json = json_decode($ret, $ret);

		$server->unsetGet('limit');
		$server->setGet('id', 14);

		$time = time() + 1211;

		$ret = $api->apiDispatch($this->site, $server, [], [], $time);
		$this->assertNotContains('"errors":', $ret);
		$json = json_decode($ret, $ret);
	}

	private function addUser($role = User::USER) {
		$users = new Users($this->site->db);
		$user = new User();
		$user->name = 'Phibes, Anton';
		$user->userId = 'anton';
		$user->email = 'anton@phibes.us';
		$user->role = $role;
		$id1 = $users->add($user, time());

		return $user;
	}



}

/// @endcond
