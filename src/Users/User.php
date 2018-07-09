<?php
/** @file User.php
 * Class that defines a user
 */

namespace CL\Users;

use \Firebase\JWT\JWT;
use \CL\Site\Site;

/**
 * Class that defines a site user
 */
class User {
	const COOKIENAME = "-fg3bsck8m9";

	/// Duration after which JWT token expires
	const JWT_EXPIRATION = 60 * 60 * 24;     // 24 hours

	// User role codes in order of access permissions
    const GUEST = "G";		///< Guest user visiting the site
	const USER = 'U';       ///< Standard user
	const STAFF = 'S';      ///< Staff user
    const ADMIN = 'A';      ///< Admin

	/** Constructor
     * @param array $row Array of contents of the row in the table for this user
	 */
	public function __construct($row = null) {
		if($row !== null) {
			if(isset($row['user_id'])) {
				// Required values
				$this->id = +$row['user_id'];

				// Optional values
				$this->userId = $this->notEmptyOrNull($row, 'user_user');
				$this->email = $this->notEmptyOrNull($row, 'user_email');
				$this->name = $this->getOrDefault($row, 'user_name', '');
				$this->role = $this->getOrDefault($row, 'user_role', User::GUEST);

				$this->hasPassword = isset($row['user_password']) &&
					$row['user_password'] !== null &&
					strlen($row['user_password']) >= 16;
			} else {
				// Required values
				$this->id = $this->getOrDefault($row, 'id', 0);

				// Optional values
				$this->userId = $this->notEmptyOrNull($row, 'user');
				$this->email = $this->notEmptyOrNull($row, 'email');
				$this->name = $this->getOrDefault($row, 'name', '');
				$this->role = $this->getOrDefault($row, 'role', User::GUEST);

				$this->hasPassword = isset($row['password']) &&
					$row['password'] !== null &&
					strlen($row['password']) >= 16;
			}

		}
	}

	private function getOrDefault($row, $key, $default=null) {
		if(isset($row[$key])) {
			return $row[$key];
		}

		return $default;
	}

	private function notEmptyOrNull($row, $key) {
		if(!empty($row[$key])) {
			return $row[$key];
		}

		return null;
	}

	/**
	 * Get standard properties for a user.
	 *
	 * @param string $name Options are:
	 * @return Course|mixed|null|string Property value
	 */
	public function __get($key) {
		switch($key) {
			case 'id':
				return $this->id;

			case 'userId':
				return $this->userId;

			case 'email':
				return $this->email;

			case 'name':
				return $this->name;

			case 'role':
				if($this->member !== null) {
					return $this->member->role;
				}

				return $this->role;

            case 'displayName':
                return $this->getDisplayName();

			case 'hasPassword':
				return $this->hasPassword;

			case 'member':
				return $this->member;

			case 'dataJWT':
				return $this->dataJWT;

            default:
                $trace = debug_backtrace();
                trigger_error(
                    'Undefined property ' . $key .
                    ' in ' . $trace[0]['file'] .
                    ' on line ' . $trace[0]['line'],
                    E_USER_NOTICE);
                return null;
        }
    }

    public function role() {
	    if($this->member !== null) {
		    return $this->member->role;
	    }

	    return $this->role;
    }

    /**
     * Property set magic method
     * @param $key Property name
     * @param $value Value to set
     */
    public function __set($key, $value) {
        switch($key) {
	        case 'id':
	        	$this->id = $value;
	        	break;

	        case 'userId':
	        	$this->userId = $value;
	        	break;

	        case 'email':
	        	$this->email = $value;
	        	break;

	        case 'name':
	        	$this->name = $value;
	        	break;

	        case 'role':
	        	$this->role = $value;
	        	break;

	        case 'member':
	        	$this->member = $value;
	        	$this->member->user = $this;
	        	break;

            default:
                $trace = debug_backtrace();
                trigger_error(
                    'Undefined property ' . $key .
                    ' in ' . $trace[0]['file'] .
                    ' on line ' . $trace[0]['line'],
                    E_USER_NOTICE);
                break;
        }

    }

	/**
	 * Export a user into an array that can then be reloaded in the User constructor
	 *
	 * This is mainly used to transfer user information to remote systems, so not
	 * all fields are provided.
	 *
	 * @return array Array that represents a table row
	 */
	public function export() {
		$row = array();
		$row['id'] = $this->id;
		$row['user'] = $this->userId;
		$row['email'] = $this->email;
		$row['name'] = $this->name;
		$row['role'] = $this->role;
		return $row;
	}

	/** Is $id the user ID for this user?
	 * @param $id User ID to check
	 * @returns TRUE if $id is the ID of this user */
	public function isUser($id) {return $this->userId === $id;}
	

	
	/** A name in a more reasonable display format.
	 * 
	 * This reverses the lastname, firstname to firstname lastname
	 */
	public function getDisplayName() {
		if($this->get_role() != User::GUEST) {
			return self::toDisplayName($this->get_name());
		} else {
			return "Guest";
		}
	}

	/** Convert a name to a more reasonable display format.
	 *
	 * This reverses the lastname, firstname to firstname lastname
	 */
	public static function toDisplayName($name) {
		$names = explode(',', $name);
		$names = array_reverse($names);
		$ret = '';
		foreach($names as $name) {
			if($ret !== '') {
				$ret .= ' ';
			}

			$ret .= trim($name);
		}

		return $ret;
	}

	/**
	 * Create a JSON Web Token for this user
	 * @param null $time Time to create or null for current time
	 * @return string JWT
	 */
	public function createJWT(Site $site, $time = null) {
		if($time === null) {
			$time = time();
		}

		$this->dataJWT['id'] = $this->id;
		if($this->id === 0) {
			$this->dataJWT['user'] = $this->userId;
		}

		$token = [
			"iat" => $time,     // Issued at
			"iss" => "fitbuilder.org",  // Issuer application
			"nbf" => $time,      // Not before
			"exp" => $time + self::JWT_EXPIRATION,
			"data" => $this->dataJWT
		];

		return JWT::encode($token, $site->users->private_key, 'RS256');
	}

	/**
	 * Set the JWT payload data.
	 * @param object $decoded Data from the JWT
	 */
	public function setFromJWT($decoded) {
		$this->dataJWT = (array)($decoded->data);
	}

	public function setJWT($key, $value) {
		$this->dataJWT[$key] = $value;
	}

	/**
	 * Get all of the user roles
	 *
	 * This returns an array with all of the user roles, including a name and priority.
	 * The priority is a ranking in increasing privilege order and determines access privileges.
	 * Do not store this value, it is subject to change if roles are added or changed.
	 *
	 * @return array With keys for the different roles, each with an array value with keys
	 * 'name' and 'priority'
	 */
	public function getRoles() {
		if($this->member !== null) {
			return $this->member->getRoles();
		}

		return array(self::GUEST => array('name' => "Guest", 'priority' => 1),
			self::USER => array('name' => "User", 'priority' => 2),
			self::STAFF => array('name' => "Staff", 'priority' => 3),
			self::ADMIN => array('name' => "Admin", 'priority' => 100)
		);
	}

	/** Test that a user's role has a priority at least at some specified level
	 * @param string $atLeast The role the user must be for this to be true
	 * @return bool True if the role is at least the specified role */
	public function atLeast($atLeast) {
		$roles = $this->getRoles();
		if(!isset($roles[$atLeast])) {
			return false;
		}

		return ($roles[$this->role]['priority'] >= $roles[$atLeast]['priority']);
	}

	public function data($private = false) {
		$data = [
			'id'=>$this->id,
			'role'=>$this->role,
			'name'=>$this->name,
			'email'=>$this->email,
			'user'=>$this->userId
		];

		if($this->member !== null) {
			$data['member'] = $this->member->data();
		}

		return $data;
	}

	private $id = 0;		    // Unique enrollment ID
	private $userId = null;	    // User id (MSU id)
	private $email = null;		// Email address
	private $name = '';		    ///< User name, default is empty
	private $role = User::GUEST;		// Role value, see constants above
	private $hasPassword = false;	///< User has a password set
	private $dataJWT = [];      /// Data included in authenication JWT

	private $member = null;     // Any membership for this user
}
