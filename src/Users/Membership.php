<?php
/**
 * @file
 * A membership is associated with a user.
 */

namespace CL\Users;

/**
 * A membership is associated with a user.
 *
 * A typical use is membership in a course section.
 */
class Membership {
	/**
	 * Membership constructor.
	 */
	public function __construct() {
	}

	/**
	 * Get standard properties for a membership.
	 *
	 * <b>Properties</b>
	 * Property | Type | Description
	 * -------- | ---- | -----------
	 * user | User | User object this membership is installed in
	 *
	 * @param string $property Property name
	 * @return mixed Property value
	 */
	public function __get($property) {
		switch($property) {
			case 'user':
				return $this->user;

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
	 * user | User | User object this membership is installed in
	 *
	 * @param string $property Property name
	 * @param mixed $value Value to set
	 */
	public function __set($property, $value) {
		switch($property) {
			case 'user':
				$this->user = $value;
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

	private $user;
}