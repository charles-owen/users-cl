<?php
/**
 * @file
 * Class that models the collection of all users
 *
 * This is the table 'user'
 */

/// Classes in the Users subsystem
namespace CL\Users;

 
use CL\Tables\TableException;

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
  metadata mediumtext, 
  password varchar(255), 
  created  datetime NOT NULL, 
  PRIMARY KEY (id), 
  UNIQUE INDEX (`user`), 
  INDEX (name), 
  INDEX (role));

SQL;

		return $query;
	}
	
	/**
	 * Get all users with options
     * @param array $params Query parameters
     * @return array Query results
	 */
	public function query($params = []) {
		$where = new \CL\Tables\TableWhere($this);

		$order = '`name`, id';

		if(isset($params['id'])) {
			$where->append('id=?', $params['id'], \PDO::PARAM_INT);
		}

		if(isset($params['userId'])) {
			$where->append('user=?', $params['userId']);
		}

		if(isset($params['email'])) {
			$where->append('email=?', $params['email']);
		}

		if(!empty($params['after'])) {
			$where->nest();
			$where->append('name > ?', $params['after']['name'], \PDO::PARAM_STR);
			$where->nest('or');
			$where->append('name = ?', $params['after']['name'], \PDO::PARAM_STR, 'or');
			$where->append('id > ?', $params['after']['id'], \PDO::PARAM_INT, 'and');
			$where->unnest();
			$where->unnest();
		}

		if(!empty($params['before'])) {
			$where->nest();
			$where->append('name < ?', $params['before']['name'], \PDO::PARAM_STR);
			$where->nest('or');
			$where->append('name = ?', $params['before']['name'], \PDO::PARAM_STR, 'or');
			$where->append('id < ?', $params['before']['id'], \PDO::PARAM_INT, 'and');
			$where->unnest();
			$where->unnest();

			$order = '`name` desc, id desc';
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
order by $order
SQL;

		if(isset($params['limit'])) {
			$sql .= "\nlimit ?";
			$where->append(null, intval($params['limit']), \PDO::PARAM_INT);
		}

		if(isset($params['offset'])) {
			$sql .= "\noffset ?";
			$where->append(null, intval($params['offset']), \PDO::PARAM_INT);
		}

		try {
            // echo "\n" . $where->sub_sql($sql);
            $result = $where->execute($sql);
            $users = [];
            foreach($result->fetchAll(\PDO::FETCH_ASSOC) as $row) {
                $users[] = new User($row);
            }

            return $users;
        } catch(TableException $e) {
		    return [];
        }
	}
	
	
	
	/** Get a user
	 * @param int $id The user id (internal table id)
	 * @return User object or null if it does not exist */
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
	 * @return User object or null if it does not exist
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

	/**
	 * Get a user
	 * @param string $user The user id
	 * @return User object or null if it does not exist
	 */
	public function getByUser($user) {
		$sql = <<<SQL
select * from $this->tablename where user=?
SQL;

		$pdo = $this->pdo;
		try {
			$stmt = $pdo->prepare($sql);
			$stmt->execute([$user]);
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
	

    /** Create a guest user
     * @param $userId The User ID to use for this guest user
     * @return User object that is a guest */
    public function createGuestUser($userId) {
    	$row = [
    		'id' => 0,
		    'user'=>$userId,
		    'email'=>null,
		    'name'=>'Guest',
		    'role'=>User::GUEST
	    ];

        return new User($row);
    }


	/**
	 * Add a new user to the database
	 * @param User $user User to add
	 * @param int $time The current time
	 * @return array with keys:
	 *     ok: true if successfully inserted
	 * id: The id if successfully added to database
	 * duplicate: Field that violated unique constraint
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

        $id = +$pdo->lastInsertId();
		$user->id = $id;
		return ['ok'=>true, 'id'=> $id];
	}

	/**
	 * Update a user in the database
	 * @param User $user User to add
	 * @return array with keys:
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


	/**
	 * Delete a user
	 * @param $id User ID
	 * @return bool
	 */
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

		$pdo = $this->pdo;

		$sql = <<<SQL
update $this->tablename SET password=?
where id=?
SQL;

		$stmt = $pdo->prepare($sql);
		$stmt->execute([$hash, $id]);
	}

	/**
	 * Validate a user
	 * @param string $id The user ID or the email address
	 * @param string $password Password to test
	 * @return User object if successful or NULL if not
	 */
	public function validatePassword($id, $password) {

		$sql = <<<SQL
select *
from $this->tablename
where user=? or email=?
SQL;

		try {
            $pdo = $this->pdo();
            $pdo->setAttribute(\PDO::ATTR_ERRMODE, \PDO::ERRMODE_EXCEPTION);

            $stmt = $pdo->prepare($sql);
            $stmt->execute([$id, $id]);

            $result = $stmt->fetch(\PDO::FETCH_ASSOC);
            if($result === false || $result['password'] === null || $result['password'] === '') {
                return null;
            }

            if(password_verify($password, $result['password'])) {
                return new User($result);
            }
        } catch(TableException $e) {
		    return null;
        }

		return null;
	}

	/**
	 * Write the user meta-data to the table.
	 * @param User $user The user to write the metadata for
	 * @return true on success
	 */
	public function writeMetaData(User $user) {
		try {
			$pdo = $this->pdo();

			$sql = <<<SQL
update $this->tablename SET metadata=?
where id=?
SQL;

			$stmt = $pdo->prepare($sql);

			$stmt->execute([$user->metaData->json(), $user->id]);
		} catch(TableException $exception) {
			return false;
		}

		return true;
	}

	/**
	 * Generate a random string of characters to use as salt
	 * @param int $len Length to generate, default is 16
	 * @return string Validator string
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
