<?php
/**
 * @file
 * User preference: preferences that are stored in user metadata.
 */

namespace CL\Users\Preferences;

use CL\Users\Preference;
use CL\Site\Api\APIException;
use CL\Site\Site;
use CL\Users\User;

/**
 * User preference: preferences that are stored in user metadata.
 */
class PreferenceMeta extends Preference {

	/**
	 * PreferenceMeta constructor.
	 * @param string $category Metadata category to use
	 * @param string $tag Metadata tag to use
	 * @param string $description Description to appear on the About Me page
	 */
	public function __construct($category, $tag, $description) {
		parent::__construct('cl-users-prefmeta-' . $tag,  $description);

		$this->category = $category;
		$this->metaTag = $tag;
	}


	/**
	 * Generate data suitable for sending to About Me page
	 * @param Site $site The site object
	 * @param User $user The current user
	 * @return array Data suitable for sending to the client
	 */
	public function data(Site $site, User $user) {
		$data = parent::data($site, $user);

		$id = $this->tag;
		$value = $user->meta->get($this->category, $this->metaTag);
		$data['value'] = $value;

		$value = $value !== null ? $value : '';

		if(!$this->readOnly) {
			switch($this->type) {
				case Preference::TYPE_PASSWORD:
					$data['editor'] = <<<HTML
<input type="password" id="$id" value="$value">
HTML;
					break;

				case Preference::TYPE_EMAIL:
					$data['editor'] = <<<HTML
<input type="email" spellcheck="false" id="$id" value="$value">
HTML;
					break;

				default:
					$data['editor'] = <<<HTML
<input type="text" spellcheck="false" id="$id" value="$value">
HTML;
					break;
			}
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
		if(!isset($post[$this->tag])) {
			throw new APIException("Invalid API Usage", APIException::INVALID_API_USAGE);
		}

		$user->meta->set($this->category, $this->metaTag, trim(strip_tags($post[$this->tag])));
	}

	private $category;
	private $metaTag;
}