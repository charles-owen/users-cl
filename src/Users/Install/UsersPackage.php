<?php
/**
 * @file
 * Custom installation class for the users package
 */

namespace CL\Users\Install;

/**
 * Custom installation class for the users package
 */
class UsersPackage extends \CL\Site\Install\Package {
	/**
	 * Allow local version of the installer to do custom configurations.
	 * @param string $rootDir Path to the root directory of the site.
	 */
	public function custom($rootDir) {
		// Load the site.php file
		$site = file_get_contents($rootDir . '/site.php');
		$any = false;

		//
		// Does this include a public/private key combination?
		//
		if(preg_match('/\$site->users->setKeys\s*\(/', $site) !== 1) {
			$any = true;

			echo <<<COMMENT
Adding public/private keys to site.php

COMMENT;

			$site .= $this->generateKeys();
		}

		//
		// Does this include sample code for authorization?
		//
		if(preg_match('/\$site->users->auth\s*=/', $site) !== 1) {
			$dummyPW = substr(str_shuffle('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789') , 0 , 10 );
			$any = true;

			echo <<<COMMENT
Adding default user authentication code to site.php
Uncomment lines to configure.

COMMENT;

			$site .= <<<AUTH

// Uncomment to add an initial admin before tables are created
// and the first user added to tables.
//\$site->users->addUser('admin', 'User, Admin',
//	CL\Users\User::ADMIN, password_hash('$dummyPW', PASSWORD_DEFAULT));

AUTH;
		}


		if($any) {
			file_put_contents($rootDir . '/site.php', $site);
		}
	}

	private function generateKeys() {
		$res = openssl_pkey_new(["digest_alg" => "sha512",
			"private_key_bits" => 1024,
			"private_key_type" => OPENSSL_KEYTYPE_RSA]);
		if($res === false) {
			echo <<<COMMENT
Unable to added public/private keys to site.php. OpenSSL is not configured on 
this system. See http://php.net/manual/en/openssl.installation.php for details.
Ensure the file openssl.cnf is available.

COMMENT;

			return '';
		}

		// Extract the private key from $res to $privKey
		openssl_pkey_export($res, $privKey);

		// Extract the public key from $res to $pubKey
		$pubKey = openssl_pkey_get_details($res);
		$pubKey = $pubKey["key"];

		return <<<PHP

\$public = <<<KEY
{$pubKey}KEY;

\$private = <<<KEY
{$privKey}KEY;

\$site-> users->setKeys(\$public, \$private);

PHP;

	}

}