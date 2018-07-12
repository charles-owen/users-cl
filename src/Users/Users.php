<?php
/**
 * @file
 * Class that models the collection of all users
 *
 * This is the table 'user'
 */

namespace CL\Users;

 
/**
 * Model the collection of all users (the users table)
 */
class Users extends \CL\Tables\Table {
	/**
	 * Constructor
	 * @param \CL\Tables\Config $config The Database configuration object
	 */
	public function __construct(\CL\Tables\Config $config) {
		parent::__construct($config, 'user');
	}
	
	/**
	 * Create an SQL create table command for the users table
	 * @return string SQL
	 */
	public function createSQL() {
		
		$query = <<<SQL
CREATE TABLE IF NOT EXISTS `$this->tablename` (
  id       int(11) NOT NULL AUTO_INCREMENT, 
  `user`   varchar(30), 
  email    varchar(254) UNIQUE, 
  name     varchar(150) NOT NULL, 
  role     char(1) NOT NULL, 
  extra    mediumtext, 
  password varchar(255), 
  created  datetime NOT NULL, 
  PRIMARY KEY (id), 
  UNIQUE INDEX (`user`), 
  INDEX (role));
SQL;

		return $query;
	}
	
	/**
	 * Get all users with options
	 */
	public function query($params = []) {
		$where = new \CL\Tables\TableWhere($this);

		if(isset($params['id'])) {
			$where->append('id=?', $params['id'], \PDO::PARAM_INT);
		}

		if(isset($params['userId'])) {
			$where->append('user=?', $params['userId']);
		}

		if(isset($params['email'])) {
			$where->append('email=?', $params['email']);
		}

		if(isset($params['search'])) {
			$any = false;
			$split = preg_split('/[\s,\.]/', $params['search']);

			if(count($split) === 1) {
				$split0 = $split[0];

				$where->nest();
				$where->append('user like ?', "%$split0%", \PDO::PARAM_STR, 'or');
				$where->append('name like ?', "%$split0%", \PDO::PARAM_STR, 'or');
				$where->unnest();

				$any = true;
			} else {
				// Multiple substring can match names only
				foreach($split as $like) {
					if(strlen($like) > 0) {
						$any = true;
						$where->append('name like ?', "%$like%");
					}
				}
			}


			if(!$any) {
				return [];
			}
		}

		$sql = <<<SQL
select * from $this->tablename
$where->where
order by `name`, id
SQL;

		if(isset($params['limit'])) {
			$sql .= "\nlimit ?";
			$where->append(null, intval($params['limit']), \PDO::PARAM_INT);
		}

		if(isset($params['offset'])) {
			$sql .= "\noffset ?";
			$where->append(null, intval($params['offset']), \PDO::PARAM_INT);
		}

		//echo $where->sub_sql($sql);
		$result = $where->execute($sql);
		$users = [];
		foreach($result->fetchAll(\PDO::FETCH_ASSOC) as $row) {
			$users[] = new User($row);
		}

		return $users;
	}
	
	
	
	/** Get a user
	 * @param $id The user id (internal table id)
	 * @returns User object or null if it does not exist */
	public function get($id) {
		$sql = <<<SQL
select * from $this->tablename where id=?
SQL;

		$pdo = $this->pdo;
		try {
			$stmt = $pdo->prepare($sql);
			$stmt->execute([$id]);
			$row = $stmt->fetch(\PDO::FETCH_ASSOC);
			if($row) {
				return new User($row);
			} else {
				return null;
			}
		} catch(\PDOException $e) {
			return null;
		}	
	}

	/**
	 * Get a user
	 * @param string $user The user name or email address
	 * @returns User object or null if it does not exist
	 */
	public function getByUserOrEmail($user) {
		$sql = <<<SQL
select * from $this->tablename where user=? or email=?
SQL;

		$pdo = $this->pdo;
		try {
			$stmt = $pdo->prepare($sql);
			$stmt->execute([$user, $user]);
			$row = $stmt->fetch(\PDO::FETCH_ASSOC);
			if($row) {
				return new User($row);
			} else {
				return null;
			}
		} catch(\PDOException $e) {
			return null;
		}
	}

	
//	/**
//	 * Get a user by the system user id
//	 * @param $userid The user id (system ID)
//	 * @returns User object or null if it does not exist */
//	public function get_user_by_userid($userid) {
//        $pdo = $this->pdo();
//		$qid = $pdo->quote($userid);
//		$sql = "select * from $this->tablename where user=$qid";
//		$rows = $pdo->query($sql);
//
//        // Check if the query was successful at all
//        if(!$rows) {
//            return null;
//        }
//
//        // Now fetch the rows
//		$row = $rows->fetch();
//		if($row) {
//			return new User($this->course, $row);
//		} else {
//			return null;
//		}
//	}
//
//    /** Create a guest user
//     * @param $userId The User ID to use for this guest user
//     * @returns User object that is a guest */
//    public function create_guest_user($userId) {
//        $rows['id'] = 0;
//        $rows['user'] = $userId;
//        $rows['email'] = $userId . '@msu.edu';
//        $rows['name'] = 'Guest';
//        $rows['semester'] = $this->course->get_semester();
//        if($this->course->is_admin($userId)) {
//            $rows['role'] = User::ADMIN;
//        } else {
//            $rows['role'] = User::GUEST;
//        }
//
//        return new User($this->course, $rows);
//    }



	/**
	 * Add a new user to the database
	 * @param User $user User to add
     * @returns array with keys:
	 *     ok: true if successfully inserted
	 *     id: The id if successfully added to database
	 *     duplicate: Field that violated unique constraint
	 * ID for the new user or null if failed
	 */
	public function add(User $user, $time) {
		$sql = <<<SQL
insert into $this->tablename(role, created, name, user, email)
values(?, ?, ?, ?, ?)
SQL;

		$pdo = $this->pdo;
		$pdo->setAttribute(\PDO::ATTR_ERRMODE, \PDO::ERRMODE_EXCEPTION);
		try {
			$stmt = $pdo->prepare($sql);
			if($stmt->execute([$user->role, $this->timeStr($time), $user->name,
					$user->userId, $user->email]) === false) {
				return ['ok'=>false];
			}
		} catch(\PDOException $e) {
			//Integrity constraint violation: 1062 Duplicate entry 'anton@phibes.us' for key 'email'
			$regex = "/Integrity constraint violation.*Duplicate entry.*key '([a-zA-Z0-9]*)'/";
			$matches = [];
			if(preg_match($regex, $e->getMessage(), $matches) === 1) {
				return ['ok'=>false, 'duplicate'=>$matches[1]];
			}

			return ['ok'=>false];
		}

        $id = $pdo->lastInsertId();
		$user->id = $id;
		return ['ok'=>true, 'id'=> $id];
	}

	/**
	 * Add a new user to the database
	 * @param User $user User to add
	 * @returns array with keys:
	 *     ok: true if successfully inserted
	 *     id: The id if successfully added to database
	 *     duplicate: Field that violated unique constraint
	 * ID for the new user or null if failed
	 */
	public function update(User $user) {
		$sql = <<<SQL
update $this->tablename
set role=?, name=?, user=?, email=?
where id=?
SQL;

		$pdo = $this->pdo;
		$pdo->setAttribute(\PDO::ATTR_ERRMODE, \PDO::ERRMODE_EXCEPTION);
		try {
			$stmt = $pdo->prepare($sql);
			if($stmt->execute([$user->role, $user->name,
					$user->userId, $user->email, $user->id]) === false) {
				return ['ok'=>false];
			}
		} catch(\PDOException $e) {
			//Integrity constraint violation: 1062 Duplicate entry 'anton@phibes.us' for key 'email'
			$regex = "/Integrity constraint violation.*Duplicate entry.*key '([a-zA-Z0-9]*)'/";
			$matches = [];
			if(preg_match($regex, $e->getMessage(), $matches) === 1) {
				return ['ok'=>false, 'duplicate'=>$matches[1]];
			}

			return ['ok'=>false];
		}

		return ['ok'=>true, 'id'=> $user->id];
	}


	
	/** Delete a user 
	 * @param $id User ID */
	public function delete($id) {
		$pdo = $this->pdo;
		$sql = <<<SQL
DELETE FROM $this->tablename WHERE id=?
SQL;
        $stmt = $pdo->prepare($sql);
        return $stmt->execute([$id]);
	}



	


	/**
	 * Set the password for a user.
	 * @param $id ID of the user to set the password for
	 * @param $password Password to set
	 */
	public function setPassword($id, $password) {
		$hash = password_hash($password, PASSWORD_DEFAULT);

		$pdo = $this->pdo();

		$sql = <<<SQL
update $this->tablename SET password=?
where id=?
SQL;

		$stmt = $pdo->prepare($sql);
		$stmt->execute([$hash, $id]);
	}

	/**
	 * Validate a user
	 * @param $id The user ID or the email address
	 * @param $password Password to test
	 * @return \User object if successful or NULL if not
	 */
	public function validatePassword($id, $password) {
		$pdo = $this->pdo();

		$sql = <<<SQL
select *
from $this->tablename
where user=? or email=?
SQL;

		$stmt = $pdo->prepare($sql);
		$stmt->execute([$id, $id]);

		$result = $stmt->fetch(\PDO::FETCH_ASSOC);
		if($result === false || $result['password'] === null || $result['password'] === '') {
			return null;
		}

		if(password_verify($password, $result['password'])) {
			return new User($result);
		}

		return null;
	}

	/**
	 * Generate a random string of characters to use as salt
	 * @param $len Length to generate, default is 16
	 * @returns Validator string
	 */
	public static function createSalt($len = 16) {
		$chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		$l = strlen($chars) - 1;
		$str = '';
		for ($i = 0; $i < $len; ++$i) {
			$str .= $chars[rand(0, $l)];
		}
		return $str;
	}

}
