<?php
/**
 * A membership is associated with a user.
 *
 * A typical use is membership in a course section.
 */

namespace CL\Users;


class Membership {

	public function __construct() {
	}

	/**
	 * Get standard properties for a membership.
	 *
	 * @param string $name Options are:
	 * @return Course|mixed|null|string Property value
	 */
	public function __get($key) {
		switch($key) {
			case 'user':
				return $this->user;

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

	/**
	 * Property set magic method
	 * @param string $key Property name
	 * @param any $value Value to set
	 */
	public function __set($key, $value) {
		switch($key) {
			case 'user':
				$this->user = $value;
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

	private $user;
}