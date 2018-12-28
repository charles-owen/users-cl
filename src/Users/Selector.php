<?php
/**
 * @file
 * Hash-based selector for assignments or other persistent selections.
 */

namespace CL\Users;

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
	const PADDING = "jczeKwnoz1nTED2frf2P";

	/**
	 * Selector constructor.
	 * @param $user
	 * @param $salt
	 */
	public function __construct($user, $salt) {
		$this->initial_seed = self::get_int($user, $salt, 0, 2147483648);
		$this->seed = $this->initial_seed;
	}

	/**
	 * Set a seed, reseting the generator to some starting point
	 * @param $seed Seed to set
	 */
	public function set_seed($seed) {
		$this->seed = $seed;
		$this->initial_seed = $seed;
	}

	/**
	 * Get the initial seed for this random sequence.
	 * @return Initial random seed
	 */
	public function get_seed() {
		return $this->initial_seed;
	}

	/**
	 * @return int New random number in the the range 0 to 2147483647
	 */
	public function get_rand() {
		$this->seed = fmod(33797 * $this->seed + 1, 2147483648);
		return (int)$this->seed;
	}

	/**
	 * Compute selector as a float value for a user.
	 * @param mixed $user User object or string containing user (or team) ID
	 * @param string $salt Assignment specific selection string
	 * @return float 0 <= result < 1
	 * @throws \Exception
	 */
	public static function get_float($user, $salt) {
		if(is_a($user, "\CL\Users\User")) {
			$userId = $user->userId;
		} else if(is_string($user)) {
			$userId = $user;
		} else {
			throw new \Exception("Invalid argument type");
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
	 * @throws \Exception
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
	 * @throws \Exception
	 */
	public static function get_one() {
		$num = func_num_args();
		if($num < 3) {
			throw new \Exception("Missing function arguments");
		}

		$args = func_get_args();
		$s = self::get_float($args[0], $args[1]);

		$s *= $num - 2;
		return $args[\intval($s) + 2];
	}

	private $seed;                ///< Current seed value
	private $initial_seed;         ///< The initial seed value as set
}