<?php
/** @file
 * Unit tests for the class Users
 * @cond 
 */

require_once __DIR__ . '/init.php';
require_once __DIR__ . '/cls/UsersDatabaseTestBase.php';

use CL\Users\User;
use CL\Users\Users;
use CL\Users\Authenticate;
use CL\Users\Autologin;
use CL\Site\Api\APIException;
use CL\Site\Test\ServerMock;

class AuthenticateTest extends UsersDatabaseTestBase {
	/**
	 * @return PHPUnit_Extensions_Database_DataSet_IDataSet
	 */
	public function getDataSet() {
		return $this->dataSets(['autologin.xml', 'user.xml']);
	}

	public function ensureTables() {
		$this->ensureTable(new Users($this->site->db));
	}

	public function test_authenticate() {
		$users = new Users($this->site->db);
		$time = time() + 9876;

		$user1 = new User();
		$user1->name = 'Phibes, Anton';
		$user1->userId = 'anton';
		$user1->email = 'anton@phibes.us';
		$id1 = $users->add($user1, $time);

		$user2 = new User();
		$user2->email = 'person@whereever.us';
		$id2 = $users->add($user2, $time);

		$server = new ServerMock();

		$auth = new Authenticate();

		// Simple return
		$this->site->users->user = $user1;
		$this->assertEquals($user1, $auth->authenticate($this->site, $server,  $time));

		// Disconnect the users
		$this->site->users->user = null;

		// Create a cookie for $user1
		$autologin = new AutoLogin($this->site->db);
		$cookiename = $this->site->cookiePrefix . Autologin::COOKIENAME;
		$cred = $autologin->create($user1->id, $time);

		$server->setcookie($cookiename,
			$cred['id'] . ':' . $cred['token'],
			time() + 86400 * Autologin::PERIOD, "/");

		// Try to cookie authenticate
		$this->assertEquals($user1, $auth->authenticate($this->site, $server,  $time));

	}


	public function test_login() {
		$time = time() + 1234;

		$users = new Users($this->site->db);

		$user1 = new User();
		$user1->name = 'Phibes, Anton';
		$user1->userId = 'anton';
		$user1->email = 'anton@phibes.us';
		$ret = $users->add($user1, $time);
		$id1 = $ret['id'];

		$server = new ServerMock();

		$auth = new Authenticate();
		try {
			// Should be exception since not configured right
			$auth->login($this->site, $server);
			$this->assertTrue(false);
		} catch(APIException $exception) {
			$this->assertTrue(true);
		}

		$server->setPost('id', 'anton');
		$server->setPost('password', '');
		try {
			// Should be exception since not password set
			$auth->login($this->site, $server);
			$this->assertTrue(false);
		} catch(APIException $exception) {
			$this->assertTrue(true);
		}

		$pw1 = 'crm9q2372g';
		$users->setPassword($id1, $pw1);
		$server->setPost('password', $pw1);
		$user = $auth->login($this->site, $server);
		$this->assertNotNull($user);
		$this->assertEquals($user1->name, $user->name);
	}


}

/// @endcond
