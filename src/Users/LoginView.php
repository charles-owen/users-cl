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
        $this->addCLS('cl-login', json_encode(['before'=>$this->__get('before'), 'after'=>$this->__get('after')]));
	}
}