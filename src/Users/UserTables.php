<?php
/**
 * Table maker for User tables
 */

namespace CL\Users;

use CL\Tables\Config;

class UserTables extends \CL\Tables\TableMaker {

	/**
	 * UserTable constructor.
	 * @param Config $config
	 */
	public function __construct(Config $config) {
		parent::__construct($config);

		$this->add(new \CL\Users\Users($config));
		$this->add(new \CL\Users\Autologin($config));
	}
}