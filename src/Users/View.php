<?php
/**
 * @file
 * View class for any view that relies on users.js
 */

namespace CL\Users;

use CL\Site\Site;

/**
 * View class for any view that relies on users.js
 *
 * This provides:
 * A protected member 'user' that is the current user.
 * A global variable 'user'
 * users.js
 * The cl-user user definition block
 */
class View extends \CL\Site\View {
	/**
	 * View constructor.
	 * @param Site $site The Site object
	 * @param array $options Options to pass to Site::start()
	 */
	public function __construct(Site $site, array $options = []) {
		parent::__construct($site, $options);

		$this->user = $site->users->user;

		// Some globals that make page creation easier
		$GLOBALS['user'] = $this->user;

		$this->addJS('users');

		$userjson = json_encode($site->users->user->data(true));
		$this->addJSON('cl-user', $userjson);

	}

	/**
	 * Property get magic method
	 *
	 * <b>Properties</b>
	 * Property | Type | Description
	 * -------- | ---- | -----------
	 * user | User | User object for current user.
	 *
	 * @param string $property
	 * @return mixed Property value
	 */
	public function __get($property) {
		switch($property) {
			case "user":
				return $this->user;

			default:
				return parent::__get($property);
		}
	}

	protected $user;    ///< User object for current user
}