<?php
/**
 * @file
 * User preference: presents user ID
 */

namespace CL\Users\Preferences;

use CL\Users\Preference;
use CL\Site\Api\APIException;
use CL\Site\Site;
use CL\Users\User;

/**
 * User preference: presents user ID
 */
class PreferenceEmail extends Preference {
	/// Tag associated with this preference
	const TAG = 'cl-users-email';

	/**
	 * PreferenceEmail constructor.
	 */
	public function __construct() {
		parent::__construct(self::TAG,  'Email');

		self::__set('comment', 'You are allowed to change your email address');
	}


	/**
	 * Generate data suitable for sending to About Me page
	 * @param Site $site The site object
	 * @param User $user The current user
	 * @return array Data suitable for sending to the client
	 */
	public function data(Site $site, User $user) {
		$data = parent::data($site, $user);

		$name = self::TAG;


		$data['value'] = $user->email;
		$data['type'] = Preference::TYPE_EMAIL;

		if(!$this->readOnly) {
			$data['editor'] = <<<HTML
<input type="email" spellcheck="false" id="$name" value="$user->email">
HTML;
		}

		return $data;
	}

	/**
	 * Handle a submission from the AboutMe page.
	 * @param Site $site The site object
	 * @param User $user The user we are modifying
	 * @param array $post The post data
	 * @param $time Current time
	 * @throws APIException on error
	 */
	public function submit(Site $site, User $user, array $post, $time) {
		if(!isset($post[self::TAG])) {
			throw new APIException("Invalid API Usage", APIException::INVALID_API_USAGE);
		}

		$user->email = trim(strip_tags($post[self::TAG]));
	}

}