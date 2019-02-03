<?php
/**
 * @file
 * View class for the course About Me page
 */

namespace CL\Users;

use CL\Site\Site;


/**
 * View class for the course section selector page
 */
class AboutMeView extends View {
	/**
	 * AboutMeView constructor.
	 * @param Site $site The Site object
	 */
	public function __construct(Site $site) {
		parent::__construct($site, ['at-least'=>User::USER]);

		$data = $site->users->preferencesData($site, $this->user);
		$this->addCLS('cl-users-aboutme', json_encode($data));
	}
}
