<?php
/**
 * @file
 * Base class for a user-installable preference.
 * Preferences can be edited via the About Me page for a user.
 */

namespace CL\Users;

use CL\Site\Site;
use CL\Users\User;
use CL\Site\Api\APIException;

/**
 * Class Preference
 * Base class for a user-installable preference.
 *
 * Preferences can be edited via the About Me page for a user.
 *
 * @cond
 * @property int order
 * @property string tag
 * @endcond
 */
abstract class Preference {
	/// The text preference type
	const TYPE_TEXT = 'text';

	/// The email preference type
	const TYPE_EMAIL = 'email';

	/// A password preference type
	const TYPE_PASSWORD = 'password';

	/**
	 * Preference constructor.
	 * @param string $tag The preference tag
	 * @param string $description The preference description
	 * @param int|null $order Optional preference presentation order
	 */
	public function __construct($tag, $description, $order=null) {
		$this->tag = $tag;
		$this->description = $description;
		$this->order = $order;
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
			case 'order':
				return $this->order;

			case 'tag':
				return $this->tag;

			case 'description':
				return $this->description;

			case 'comment':
				return $this->comment;

			case 'readOnly':
				return $this->readOnly;

			case 'type':
				return $this->type;

			default:
				$trace = debug_backtrace();
				trigger_error(
					'Undefined property ' . $property .
					' in ' . $trace[0]['file'] .
					' on line ' . $trace[0]['line'],
					E_USER_NOTICE);
				return null;
		}
	}

	/**
	 * Property set magic method
	 *
	 * <b>Properties</b>
	 * Property | Type | Description
	 * -------- | ---- | -----------
	 *
	 * @param string $property Property name
	 * @param mixed $value Value to set
	 */
	public function __set($property, $value) {
		switch($property) {
			case 'order':
				$this->order = $value;
				break;

			case 'comment':
				$this->comment = $value;
				break;

			case 'readOnly':
				$this->readOnly = $value;
				break;

			case 'type':
				$this->type = $value;
				break;

			default:
				$trace = debug_backtrace();
				trigger_error(
					'Undefined property ' . $property .
					' in ' . $trace[0]['file'] .
					' on line ' . $trace[0]['line'],
					E_USER_NOTICE);
				break;
		}
	}

	/**
	 * Generate data suitable for sending to About Me page
	 * @param Site $site The site object
	 * @param User $user The current user
	 * @return array Data suitable for sending to the client
	 */
	public function data(Site $site, User $user) {
		return [
			'tag'=>$this->tag,
			'desc'=>$this->description,
			'value'=>null,
			'type'=>$this->type,
			'comment'=>$this->comment,
			'editor'=>null
		];
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
	}

	/**
	 * Set preference as read only and optionally set the comment
	 * @param null $comment
	 */
	public function setReadOnly($comment = null) {
		$this->readOnly = true;
		if($comment !== null) {
			$this->comment = $comment;
		}
	}

	private $tag;           // Tag that identifies this preference
	private $description;   // Description of the preference
	private $order = null;  // Order of the preference on the page
	private $comment = '';  // Any comment to set
	private $readOnly = false;  // Preference is read-only (cannot be changed)
	private $type = self::TYPE_TEXT;    // The preference presentation type
}