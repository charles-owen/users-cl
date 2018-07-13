<?php
/**
 * @file
 * Table maker for User tables
 */

namespace CL\Users;

use CL\Tables\Config;

/**
 * Table maker for User subsystem tables
 */
class UserTables extends \CL\Tables\TableMaker {
	/**
	 * UserTables constructor.
	 * @param Config $config
	 */
	public function __construct(Config $config) {
		parent::__construct($config);

		$this->add(new \CL\Users\Users($config));
		$this->add(new \CL\Users\Autologin($config));
	}
}