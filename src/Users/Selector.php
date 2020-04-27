<?php
/**
 * @file
 * Hash-based selector for assignments or other persistent selections.
 */

namespace CL\Users;

use Exception;

/**
 * Hash-based selector for assignments or other persistent selections.
 *
 * For a given user and passed salt string, this will persistently select
 * from choices for a user. The idea is to provide a non-random way to choose
 * alternative assignments such that the assignment will be the same
 * every time the user goes to it.
 *
 * Can also be used to generate a repeatable sequence of pseudorandom numbers
 * specific to a user and salt.
 */
class Selector {
	/// Padding to be added to user ID when hashing
	const PADDING = "jczeKwnoz1nTED2frf2P";

	/**
	 * Selector constructor.
	 * @param $user
	 * @param $salt
	 */
	public function __construct(User $user, $salt) {
		$this->user = $user;
		$this->salt = $salt;

		$userId = $user->userId;
		$h = hash("sha256", self::PADDING . $userId . $this->salt);
		$h1 = hexdec(substr($h, 8, 8));
		$this->seed = $h1 & 2147483647;
		$this->initial_seed = $this->seed;
	}

	/**
	 * Property get magic method
	 *
	 * <b>Properties</b>
	 * Property | Type | Description
	 * -------- | ---- | -----------
	 *
	 * @param string $property Property name
	 * @return mixed
	 */
	public function __get($property) {
		switch($property) {
			case 'seed':
				return $this->initial_seed;

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
	 * Property set magic method
	 *
	 * <b>Properties</b>
	 * Property | Type | Description
	 * -------- | ---- | -----------
	 *
	 * @param string $property Property name
	 * @param mixed $value Value to set
	 */
	public function __set($property, $value) {
		switch($property) {
			case 'seed':
				$this->seed = $value;
				$this->initial_seed = $value;
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
	 * Get a random value in the range 0 to 2147483647
	 * @return int New random number
	 */
	public function get_rand() {
		$h = hash("sha256", self::PADDING . $this->seed . $this->salt);
		$h1 = hexdec(substr($h, 8, 8));
		$this->seed = $h1 & 2147483647;

		return $this->seed;
	}

	public function float() {
        $h = hash("sha256", self::PADDING . $this->seed . $this->salt);
        $h1 = hexdec(substr($h, 8, 7));
        $this->seed = $h1 & 2147483647;
        $d1 = $h1 / 268435456;

        return $d1;
    }

    /**
     * Choose one item from some array.
     * @param array $items Items to choose from
     * @return mixed Item from array
     */
    public function choose($items) {
	    return $items[$this->get_rand() % count($items)];
    }

    /**
     * Determine a random number in a specified range.
     * @param $min
     * @param $max
     * @return float
     */
    public function rand($min, $max) {
        $f = $this->float();
        return floor($min + ($max - $min + 1) * $f);
    }

	/**
	 * Compute selector as a float value for a user.
	 * @param mixed $user User object or string containing user (or team) ID
	 * @param string $salt Assignment specific selection string
	 * @return float 0 <= result < 1
	 * @throws Exception
	 */
	public static function get_float($user, $salt) {
		if(is_a($user, "\CL\Users\User")) {
			$userId = $user->userId;
		} else if(is_string($user)) {
			$userId = $user;
		} else {
			throw new Exception("Invalid argument type");
		}

		$h = hash("sha256", $userId . self::PADDING . $salt);
		$h1 = hexdec(substr($h, 8, 7));
		$d1 = $h1 / 268435456;
		return $d1;
	}

	/**
	 * Compute selector as integer
	 * @param mixed $user User object or string containing user (or team) ID
	 * @param string $salt Assignment specific selection string
	 * @param int $min Minimum possible integer value
	 * @param int $max Maximum possible integer value
	 * @return float Random number
	 * @throws Exception
	 */
	public static function get_int($user, $salt, $min, $max) {
		$f = self::get_float($user, $salt);
		return floor($min + ($max - $min + 1) * $f);
	}

	/**
	 * Get one of a set of options for a given user.
	 *
	 * First argument: $user passed to getFloat
	 * Second argument: $salt passed to getFloat
	 * Arguments 3+ options to select
	 *
	 * Usage:
	 * \code
	   $sel = \User\Selector::get_one($user, "step1-quiz2", "a", "b", "c", "d", "e", "f", "g");
	 * \endcode
	 * @return mixed Item from the options to select.
	 * @throws Exception
	 */
	public static function get_one() {
		$num = func_num_args();
		if($num < 3) {
			throw new Exception("Missing function arguments");
		}

		$args = func_get_args();
		$s = self::get_float($args[0], $args[1]);

		$s *= $num - 2;
		return $args[\intval($s) + 2];
	}

	private $user;          // The user
	private $salt;
	private $seed;          // Current seed value
	private $initial_seed;  // The initial seed value as set
}