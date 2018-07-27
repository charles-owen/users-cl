<?php
/**
 * @file
 * View class for the Login page
 */

namespace CL\Users;


use CL\Site\Site;

class LoginView extends \CL\Site\View {

	public function __construct(Site $site) {
		parent::__construct($site, ['open'=>true]);

		//
		// Allow for login page customization
		//
		$this->optionalFileApply('/site/login.inc.php');

		$this->title = "Login";
		$this->addJS('login');
		$this->addJSON('cl-login', json_encode(['before'=>$this->before, 'after'=>$this->after]));
	}

	public function __set($key, $value) {
		switch($key) {
			case 'before':
				$this->before = $value;
				break;

			case 'after':
				$this->after = $value;
				break;

			default:
				parent::__set($key, $value);
		}
	}

	private $before = '';
	private $after = '';
}