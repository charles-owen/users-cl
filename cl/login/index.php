<?php
require '../../site.php';
$view = new CL\Users\LoginView($site);
echo $view->vue('login');
