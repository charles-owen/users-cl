<?php
/**
 * @file
 * User preference: presents user name
 */

namespace CL\Users\Preferences;

use CL\Users\Preference;
use CL\Site\Site;
use CL\Users\User;

/**
 * User preference: presents user name
 */
class PreferenceName extends Preference {
	/// Tag associated with this preference
	const TAG = 'users-name';

	/**
	 * PreferenceName constructor.
	 */
	public function __construct() {
		parent::__construct(self::TAG,  'Name', 0);

		// I may make this not read-only in the future...
		$this->setReadOnly();
	}


	/**
	 * Generate data suitable for sending to About Me page
	 * @param Site $site The site object
	 * @param User $user The current user
	 * @return array Data suitable for sending to the client
	 */
	public function data(Site $site, User $user) {
		$data = parent::data($site, $user);

		$data['value'] = $user->name;

		return $data;
	}
}