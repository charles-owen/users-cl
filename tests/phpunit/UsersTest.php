<?php
/** @file
 * Unit tests for the class Users
 * @cond 
 */

require_once __DIR__ . '/init.php';
require_once __DIR__ . '/cls/UsersDatabaseTestBase.php';

use CL\Users\User;
use CL\Users\Users;

class UsersTest extends UsersDatabaseTestBase {
	/**
	 * @return PHPUnit_Extensions_Database_DataSet_IDataSet
	 */
	public function getDataSet() {
		return $this->dataSets(['user-many.xml']);
	}

	public function ensureTables() {
		$this->ensureTable(new Users($this->site->db));
	}

	public function test_add_get() {
		$users = new Users($this->site->db);
		$time = time();

		//
		// Empty table before this test
		//
		$sql = <<<SQL
delete from $users->tablename
SQL;

		$users->pdo->query($sql);

		$user = new User();
		$user->name = 'Phibes, Anton';
		$user->userId = 'anton';
		$user->email = 'anton@phibes.us';
		$ret = $users->add($user, $time);
		$id = $ret['id'];

		$user2 = $users->get($id);
		$this->assertNotNull($user2);

		$this->assertEquals('Phibes, Anton', $user->name);

		//
		// It should be possible to create a completely empty user
		//
		$user3 = new User();
		$ret = $users->add($user3, $time);
		$id3  = $ret['id'];

		$user4 = $users->get($id3);
		$this->assertEquals('', $user4->name);

		$results = $users->query();
		$this->assertCount(2, $results);

		$results = $users->query(['userId' => 'anton']);
		$this->assertCount(1, $results);
	}

	public function test_search() {
		$users = new Users($this->site->db);

		$results = $users->query(['search'=>'owen']);
		$this->assertCount(2, $results);

		$results = $users->query(['search'=>'charles owen']);
		$this->assertCount(1, $results);

		$results = $users->query(['search'=>'owen, charles']);
		$this->assertCount(1, $results);
	}

	public function test_delete() {
		$users = new Users($this->site->db);
		$time = time();

		$user = new User();
		$user->name = 'Phibes, Anton';
		$user->userId = 'anton';
		$user->email = 'anton@phibes.us';
		$ret = $users->add($user, $time);
		$id = $ret['id'];

		$user2 = $users->get($id);
		$this->assertNotNull($user2);

		$users->delete($id);

		$user2 = $users->get($id);
		$this->assertNull($user2);
	}


	public function test_validate_password() {
		$users = new Users($this->site->db);
		$time = time();

		$user1 = new User();
		$user1->name = 'Phibes, Anton';
		$user1->userId = 'anton';
		$user1->email = 'anton@phibes.us';
		$ret = $users->add($user1, $time);
		$id1 = $ret['id'];

		$user2 = new User();
		$user2->email = 'person@whereever.us';
		$ret = $users->add($user2, $time);
		$id2 = $ret['id'];

		// Both do not have a password set, so they
		// should both fail validation.
		$this->assertNull($users->validatePassword($id1, ''));
		$this->assertNull($users->validatePassword($id2, ''));

		// Write some passwords
		$pw1 = 'E5h00lMO';
		$users->setPassword($id1, $pw1);

		$pw2 = 'evxH6RtUk3g$#*HZ';
		$users->setPassword($id2, $pw2);

		$this->assertNotNull($users->validatePassword('anton', $pw1));
		$this->assertNotNull($users->validatePassword($user2->email, $pw2));
	}

	public function test_metaData() {
		$users = new Users($this->site->db);
		$user1 = $users->get(5);

		// Initially temp
		$this->assertEquals('[]', $user1->metaData->json());

		$user1->metaData->set('assignments', 'extension', 'value');
		$this->assertEquals('value', $user1->metaData->get('assignments', 'extension'));
		$user1->writeMetaData($this->site);

		$user2 = $users->get(5);
		$this->assertEquals('value', $user2->metaData->get('assignments', 'extension'));
	}

	public function test_query() {
		$users = new Users($this->site->db);
		$user33 = $users->query(['id'=>33])[0];
		$this->assertEquals(33, $user33->id);

		$after = $users->query(['after'=>['name'=>$user33->name, 'id'=>$user33->id], 'limit'=>1]);
		$this->assertCount(1, $after);
		$after1 = $after[0];
		$this->assertEquals(57, $after1->id);

		$after = $users->query(['after'=>['name'=>$after1->name, 'id'=>$after1->id], 'limit'=>1]);
		$this->assertCount(1, $after);
		$after2 = $after[0];
		$this->assertEquals(91, $after2->id);

		$after = $users->query(['after'=>['name'=>$after2->name, 'id'=>$after2->id], 'limit'=>1]);
		$this->assertCount(1, $after);
		$after3 = $after[0];
		$this->assertEquals(24, $after3->id);

		$before = $users->query(['before'=>['name'=>$user33->name, 'id'=>$user33->id], 'limit'=>1]);
		$this->assertCount(1, $before);
		$before1 = $before[0];
		$this->assertEquals(18, $before1->id);

		$before = $users->query(['before'=>['name'=>$before1->name, 'id'=>$before1->id], 'limit'=>1]);
		$this->assertCount(1, $before);
		$before2 = $before[0];
		$this->assertEquals(23, $before2->id);

		$user2 = $users->query(['id'=>2])[0];
		$before = $users->query(['before'=>['name'=>$user2->name, 'id'=>$user2->id], 'limit'=>1]);
		$this->assertCount(0, $before);

		$user25 = $users->query(['id'=>25])[0];
		$after = $users->query(['after'=>['name'=>$user25->name, 'id'=>$user25->id], 'limit'=>1]);
		$this->assertCount(0, $after);
	}
}

/// @endcond
