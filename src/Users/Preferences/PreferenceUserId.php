<?php
/**
 * @file
 * User preference: presents user ID
 */

namespace CL\Users\Preferences;

use CL\Users\Preference;
use CL\Site\Site;
use CL\Users\User;

/**
 * User preference: presents user ID
 */
class PreferenceUserId extends Preference {
	/// Tag associated with this preference
	const TAG = 'users-user-id';

	/**
	 * PreferenceUserId constructor.
	 */
	public function __construct() {
		parent::__construct(self::TAG,  'User ID');

		// I may make this not read-only in the future...
		$this->setReadOnly();
	}

	/**
	 * Property get magic method
	 *
	 * <b>Properties</b>
	 * Property | Type | Description
	 * -------- | ---- | -----------
	 *
	 * @param string $property Property name
	 * @return mixed
	 */
	public function __get($property) {
		switch($property) {

			default:
				return parent::__get($property);
		}
	}

	/**
	 * Generate data suitable for sending to About Me page
	 * @param Site $site The site object
	 * @param User $user The current user
	 * @return array Data suitable for sending to the client
	 */
	public function data(Site $site, User $user) {
		$data = parent::data($site, $user);

		$data['value'] = $user->userId;

		return $data;
	}
}