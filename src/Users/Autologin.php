<?php
/**
 * @file
 * Table class that manages the automatic login table.
 */

namespace CL\Users;



/**
 * Table class that manages the automatic login table.
 *
 * This table contains information stored in browser cookies that
 * allows a user to automatically log back in.
 */
class Autologin extends \CL\Tables\Table {
	/// The cookie name to use for autologin
	const COOKIENAME = "-o65e64gzy6";

	/// Days we keep logged in
	const PERIOD = 30;
	/**
	 * Constructor
	 * @param \CL\Tables\Config $config The Database configuration object
	 */
	public function __construct(\CL\Tables\Config $config) {
		parent::__construct($config, 'autologin');
	}

	/** Function to create an SQL create table command for the users table */
	public function createSQL() {

		$query = <<<QUERY
CREATE TABLE IF NOT EXISTS $this->tablename (
  id      char(32) NOT NULL,
  hash    varchar(128) NOT NULL,
  salt    varchar(16) NOT NULL,
  userid  int(10) NOT NULL,
  created datetime NOT NULL,
  PRIMARY KEY (id));
QUERY;

		return $query;
	}

	/**
	 * Create a record for automatic login
	 *
	 * Both ID and token are 32 character strings of [a-zA-Z0-9]
	 * @param $userid ID for the user we are creating an autologin record for.
	 * @param int $time Time to set.
	 * @return array with keys 'id' and 'token'
	 */
	public function create($userid, $time) {
		$id = self::createToken(32);
		$token = self::createToken(32);

		$pdo = $this->pdo();
		$sql = <<<SQL
insert into $this->tablename(id, hash, userid, created)
values(?, ?, ?, ?)
SQL;

		$hash = password_hash($token, PASSWORD_DEFAULT );

		$stmt = $pdo->prepare($sql);
		$stmt->execute([$id, $hash, $userid, $this->timeStr($time)]);
		return array("id" => $id, "token" => $token);
	}

	/**
	 * Validate an id/token combination.
	 * @param int $id ID
	 * @param string $token Token
	 * @param int $time Time to set
	 * @param int $days Days old we will accept
	 * @param int $time Current time
	 * @return User object if successful and user exists or null.
	 */
	public function validate($id, $token, $time, $days=self::PERIOD) {
		// Make the time the oldest time we will accept
		$time -= $days * 86400;

		$pdo = $this->pdo();
		$sql = <<<SQL
select hash, userid
from $this->tablename
where id=? and created>?
SQL;

		$stmt = $pdo->prepare($sql);
		$stmt->execute([$id, date("Y-m-d H:i:s", $time)]);
		if($stmt->rowCount() < 1) {
			return null;
		}

		$row = $stmt->fetch(\PDO::FETCH_ASSOC);
		if(password_verify($token, $row['hash'])) {
			$users = new Users($this->config);
			return $users->get($row['userid']);
		}

		return null;
	}

	/**
	 * Delete an autologin record by id
	 * @param $id ID to delete
	 * @return bool true if successful
	 */
	public function delete($id) {
		$pdo = $this->pdo();
		$sql = <<<SQL
delete from $this->tablename
where id=?
SQL;

		$stmt = $pdo->prepare($sql);
		return($stmt->execute([$id]) !== false && $stmt->rowCount() > 0);
	}

	/**
	 * Generate a random string of characters to use as an ID or token or salt
	 * @param int $len Length to generate, default is 32
	 * @returns string Validator
	 */
	public static function createToken($len = 32) {
		$chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		$l = strlen($chars) - 1;
		$str = '';
		for ($i = 0; $i < $len; ++$i) {
			$str .= $chars[rand(0, $l)];
		}
		return $str;
	}
}