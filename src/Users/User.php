<?php
/**
 * @file User.php
 * Class that defines a user
 */

namespace CL\Users;

use \CL\Site\MetaData;
use \CL\Site\MetaDataOwner;
use \Firebase\JWT\JWT;
use \CL\Site\Site;

/**
 * Class that defines a site user
 *
 * @cond
 * @property array dataJWT
 * @property string displayName
 * @property string email
 * @property string id
 * @property Membership member
 * @property MetaData meta
 * @property MetaData metaData
 * @property string name
 * @property boolean guest
 * @property boolean hasPassword
 * @property string role
 * @property boolean staff
 * @property string userId
 * @endcond
 */
class User implements MetaDataOwner {
	/// Prefix for the cookie for the current user connection
	const COOKIENAME = "-fg3bsck8m9";

	/// Name for the preferences MetaData category
	const METADATA_PREFERENCES = 'preferences';

	/// Duration after which JWT token expires
	const JWT_EXPIRATION = 60 * 60 * 1;     // 1 hour

	/// When a JWT is this old (seconds) we renew it
	const JWT_RENEWAL = 60;

	// User role codes in order of access permissions
    const GUEST = "G";		///< Guest user visiting the site
	const USER = 'U';       ///< Standard user
	const STAFF = 'S';      ///< Staff user
    const ADMIN = 'A';      ///< Admin

	/** Constructor
     * @param array $row Array of contents of the row in the table for this user
	 * @param string $prefix Optional prefix on column names from the table
	 */
	public function __construct($row = null, $prefix='') {
		if($row !== null) {
			if(isset($row['user_id'])) {
				$prefix = 'user_';
			}

			if(isset($row[$prefix . 'id'])) {
				// Required values
				$this->id = +$row[$prefix . 'id'];

				// Optional values
				$this->userId = $this->notEmptyOrNull($row, $prefix . 'user');
				$this->email = $this->notEmptyOrNull($row, $prefix . 'email');
				$this->name = $this->getOrDefault($row, $prefix . 'name', '');
				$this->role = $this->getOrDefault($row, $prefix . 'role', User::GUEST);

				if(isset($row[$prefix . 'metadata'])) {
					$this->metaData = new MetaData($this, $row[$prefix . 'metadata']);
				}

				$this->hasPassword = isset($row[$prefix . 'password']) &&
					$row[$prefix . 'password'] !== null &&
					strlen($row[$prefix . 'password']) >= 16;
			} else {
				// Required values
				$this->id = $this->getOrDefault($row, 'id', 0);

				// Optional values
				$this->userId = $this->notEmptyOrNull($row, 'user');
				$this->email = $this->notEmptyOrNull($row, 'email');
				$this->name = $this->getOrDefault($row, 'name', '');
				$this->role = $this->getOrDefault($row, 'role', User::GUEST);

				if(isset($row['metadata'])) {
					$this->metaData = new MetaData($this, $row['metadata']);
				}

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
	 * <b>Properties</b>
	 * Property | Type | Description
	 * -------- | ---- | -----------
	 * dataJWT | array | Data from the Json Web Token
	 * displayName | string | Name in the form First Last
	 * email | string | Email address
	 * guest | boolean | True if this user is a guest user
	 * hasPassword | boolean | true if this user has a password set in the database
	 * id | int | Internal user ID
	 * member | Membership | Any active membership for this user
	 * meta | MetaData | Meta-data for this user (short version)
	 * metaData | MetaData | Meta-data for this user
	 * name | string | User name (Last, First)
	 * role | string | User role (see above roles)
	 * staff | boolean | True if user is staff (at least)
	 * userId | string | External (world) user ID
	 *
	 *
	 * @param string $property Property name
	 * @return mixed Property value
	 */
	public function __get($property) {
		switch($property) {
			case 'dataJWT':
				return $this->dataJWT;

			case 'displayName':
				return $this->getDisplayName();

			case 'email':
				return $this->email;

			case 'guest':
				return $this->role() === User::GUEST;

			case 'hasPassword':
				return $this->hasPassword;

			case 'id':
				return $this->id;

			case 'member':
				return $this->member;

			case 'metaData':
			case 'meta':
				if($this->metaData === null) {
					$this->metaData = new MetaData($this);
				}

				return $this->metaData;

			case 'name':
				return $this->name;

			case 'role':
				return $this->role();

			case 'roleName':
				$role = $this->role();
				$roles = $this->getRoles();
				return $roles[$role]['name'];

			case 'staff':
				return $this->atLeast(User::STAFF);

			case 'userId':
			case 'userid':
				return $this->userId;

            default:
                $trace = debug_backtrace();
                trigger_error(
                    'Undefined property ' . $property .
                    ' in ' . $trace[0]['file'] .
                    ' on line ' . $trace[0]['line'],
                    E_USER_NOTICE);
                return null;
        }
    }

	/**
	 * Get the effective user role. This will be the membership role if
	 * the user has a membership attached.
	 *
	 * @return string Role
	 */
    public function role() {
	    if($this->member !== null) {
		    return $this->member->role;
	    }

	    return $this->role;
    }

    /**
     * Property set magic method
     *
     * <b>Properties</b>
     * Property | Type | Description
     * -------- | ---- | -----------
     * email | string | Email address
     * id | int | Internal user ID
     * member | Membership | Set an active membership for this user
     * name | string | User name (Last, First)
     * role | string | User role (see constants above)
     * userId | string | External (world) user ID
     *
     * @param string $property Property name
     * @param mixed $value Value to set
     */
    public function __set($property, $value) {
        switch($property) {
	        case 'dataJWT':
				$this->dataJWT = $value;
				break;

	        case 'email':
		        $this->email = $value;
		        break;

	        case 'id':
	        	$this->id = $value;
	        	break;

	        case 'member':
		        $this->member = $value;
		        $this->member->user = $this;
		        break;

	        case 'name':
		        $this->name = $value;
		        break;

	        case 'role':
		        $this->role = $value;
		        break;

	        case 'userId':
	        	$this->userId = $value;
	        	break;

            default:
                $trace = debug_backtrace();
                trigger_error(
                    'Undefined property ' . $property .
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
		if($this->__get('role') != User::GUEST) {
			return self::toDisplayName($this->name);
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
	 * @param Site $site The Site object
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
			"iss" => $site->server, // "fitbuilder.org",  // Issuer application
			"nbf" => $time,      // Not before
			"exp" => $time + self::JWT_EXPIRATION,
			"data" => $this->dataJWT
		];

		return JWT::encode($token, $site->users->privateKey, 'RS256');
	}

	/**
	 * Write the meta-data for this user.
	 * @param Site $site Site object so we can access tables.
	 */
	public function writeMetaData(Site $site) {
		$users = new Users($site->db);
		$users->writeMetaData($this);
	}

	/**
	 * Set the JWT payload data.
	 * @param object $decoded Data from the JWT
	 */
	public function setFromJWT($decoded) {
		$this->dataJWT = (array)($decoded->data);
	}

	/**
	 * Set an additional key in the JWT (session) data
	 * @param string $key Key name
	 * @param mixed $value Value to set
	 */
	public function setJWT($key, $value) {
		$this->dataJWT[$key] = $value;
	}

	/**
	 * Removes a key from the JWT (session) data
	 * @param string $key Key name
	 */
	public function unsetJWT($key) {
		unset($this->dataJWT[$key]);
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
	 * @return bool True if the role is at least the specified role
	 */
	public function atLeast($atLeast) {
		$roles = $this->getRoles();
		if(!isset($roles[$atLeast])) {
			return false;
		}

		if(!isset($roles[$this->role()])) {
			return false;
		}

		return ($roles[$this->role()]['priority'] >= $roles[$atLeast]['priority']);
	}

	/**
	 * Test that a specified role is at least some required level.
	 * @param string $role Role to test
	 * @param string $atLeast The role must be for this to be true
	 * @return bool True if the role is at least the specified role
	 */
	public function roleAtLeast($role, $atLeast) {
		$roles = $this->getRoles();
		if(!isset($roles[$atLeast])) {
			return false;
		}

		if(!isset($roles[$role])) {
			return false;
		}

		return ($roles[$role]['priority'] >= $roles[$atLeast]['priority']);
	}

	/**
	 * Return true if a user is staff or better
	 * @return bool
	 */
	public function is_staff() {
		return $this->atLeast(User::STAFF);
	}

	/**
	 * Generate data to send to a client about this user.
	 * @param bool $private True if we sent all data, including private to user
	 * @return array Data
	 */
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

	private $id = 0;		    ///< Unique internal ID
	private $userId = null;	    ///< User id (like an MSU id)
	private $email = null;		///< Email address
	private $name = '';		    ///< User name, default is empty
	private $role = User::GUEST;	///< Role value, see constants above
	private $hasPassword = false;	///< User has a password set
	private $dataJWT = [];      ///< Data included in authentication JWT
	private $metaData = null;   ///< Attached meta-data

	private $member = null;     // Any membership for this user
}
