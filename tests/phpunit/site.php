<?php
/**
 * @file
 * Configure file for the database test configuration.
 */

use CL\Site\Site;

return function(Site $site) {
	$standard = require __DIR__ . '/../../../site/tests/phpunit/site.php';
	$standard($site);

	$public = <<<KEY
-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCFfYSof4li+uZp6DMHUHYqgp1f
emT36GzumSOWVJXVJ3pOK/M3huivypbUWDI+FEOrZk6otIwfoMn6yfnrBDqxh1Zm
q21YefGwGOJ1verGOxCFsdoUGPlYNmj9YkwYTJVwVu6oPCIhx+b7qT672y7pEU13
dL4ReGHeAZhFKZZW1wIDAQAB
-----END PUBLIC KEY-----
KEY;

	$private = <<<KEY
-----BEGIN RSA PRIVATE KEY-----
MIICXQIBAAKBgQCFfYSof4li+uZp6DMHUHYqgp1femT36GzumSOWVJXVJ3pOK/M3
huivypbUWDI+FEOrZk6otIwfoMn6yfnrBDqxh1Zmq21YefGwGOJ1verGOxCFsdoU
GPlYNmj9YkwYTJVwVu6oPCIhx+b7qT672y7pEU13dL4ReGHeAZhFKZZW1wIDAQAB
AoGAWqN+draaP4Xi+5g5RcchZP3pA1Jkylub02pR2po2XlP+3KNE8rf8uJgTT71O
6A30YKYH1M86saMIYevQcP4fJzprD9+3LZ0sVcWRexuAWdDKfg8NxMNyA0YR8QLm
QILIH+ZHd4NrLjhKyPXVI92v4z5DBqLpdN0M+JDYbH4SuJkCQQDdwcckpAfmMYvH
rIq6nq+ztvp7FjUChl8AP3HOCDyxbFPxI5j8MizZdglQ+kb1NHPh1otPf+MMrSFc
tXFfUhFVAkEAmhp+Cjk1H0J1Lluc9n6KGUKBEAacwU0ZBlwhXoxh/SElGvIDj3k0
6bHrPIJHiZTyk1nsJs6iFh1foDnp0LP3ewJBAMfnsqUGNZS+31ot4ZWgDZX9gknJ
WBohlax8hRQNeuEaXYWI6JWYibOzY2ybYbIUCc7xf/43tC8uN2ACtOQP8E0CQEEW
yX/F9AMVDeubtGuEvQ24Qk0jjdgzmUtPZKTLxKOm+UYtTIWwG0JN7N7s5Axfhino
xE8L3fhbRcWmUHTfXrsCQQDcfydujDgjNgnhWNqAZdl+c+WH05z10syCY0phIW7y
GenI9zzvw6gHJjWgMlCphZuRkhl7GTV8MFX3TXRXaGUn
-----END RSA PRIVATE KEY-----
KEY;

	$site->users->setKeys($public, $private);

};
