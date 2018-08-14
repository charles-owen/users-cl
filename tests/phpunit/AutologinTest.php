<?php
/** @file
 * @brief Unit tests for the class Autologin
 * @cond 
 */
require_once __DIR__ . '/init.php';
require_once __DIR__ . '/cls/UsersDatabaseTestBase.php';

use CL\Users\User;
use CL\Users\Users;
use CL\Users\Autologin;

class AutologinTest extends UsersDatabaseTestBase
{
	/**
	 * @return PHPUnit_Extensions_Database_DataSet_IDataSet
	 */
	public function getDataSet() {
		return $this->dataSets(['user-many.xml', 'autologin.xml']);
	}


	public function ensureTables() {
		$this->ensureTable(new Users($this->site->db));
		$this->ensureTable(new Autologin($this->site->db));
	}


	public function test_validate() {

		$time = time() + 1234;

		$autologin = new Autologin($this->site->db);
		$cred = $autologin->create(4, $time);

		/* Basic test that it works */
		$user = $autologin->validate($cred['id'], $cred['token'], $time + 1000);
		$this->assertNotNull($user);
		$this->assertEquals(4, $user->id);

		/* Test that we don't validate if too old */
		$user = $autologin->validate($cred['id'], $cred['token'], $time + 86400 * 31, 30);
		$this->assertNull($user);
	}

	public function test_delete() {
		$time = time() + 1234;

		$autologin = new Autologin($this->site->db);
		$cred = $autologin->create(4, $time);

		/* Basic test that it works */
		$user = $autologin->validate($cred['id'], $cred['token'],  $time + 1010);
		$this->assertNotNull($user);
		$this->assertEquals(4, $user->id);

		$this->assertTrue($autologin->delete($cred['id']));
		$user = $autologin->validate($cred['id'], $cred['token'],  $time + 1010);
		$this->assertNull($user);
	}


	public function test_create_sql() {
		$autologin = new Autologin($this->site->db);
		$sql = $autologin->createSQL();
        $this->assertContains('autologin', $sql);
	}

}

/// @endcond
