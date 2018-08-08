<?php
/**
 * @file
 * View class for the Login page
 */

namespace CL\Users;


use CL\Site\Site;

/**
 * View class for the Login page
 */
class LoginView extends \CL\Site\View {

	/**
	 * LoginView constructor.
	 * @param Site $site
	 */
	public function __construct(Site $site) {
		parent::__construct($site, ['open'=>true]);

		//
		// Allow for login page customization
		//
		$this->decorApply('login.decor.php');

		$this->title = "Login";
		$this->addJS('login');
		$this->addCLS('cl-login', json_encode(['before'=>$this->before, 'after'=>$this->after]));
	}

	/**
	 * Property set magic method
	 *
	 * <b>Properties</b>
	 * Property | Type | Description
	 * -------- | ---- | -----------
	 * after | string | HTML to add after the login form
	 * before | string | HTML to add before the login form
	 *
	 * Plus properties inherited from CL::Site::View
	 *
	 * @param string $property Property name
	 * @param mixed $value Value to set
	 */
	public function __set($property, $value) {
		switch($property) {
			case 'before':
				$this->before = $value;
				break;

			case 'after':
				$this->after = $value;
				break;

			default:
				parent::__set($property, $value);
		}
	}

	private $before = '';
	private $after = '';
}