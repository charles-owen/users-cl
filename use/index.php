<?php
require '../../site/use/site.php';
$view = new CL\Site\Doc\DocView($site);
$view->title = 'cl/user';
?>
<!DOCTYPE html>
<html lang="en">
<head>
<link href="../../../../cl/site.css" type="text/css" rel="stylesheet" />
<?php echo $view->head(); ?>
</head>

<body>
<?php echo $view->header(); ?>

<p>The cl/users component is the user account component for CourseLib. It maintains a database of site users and supports user management.</p>
<ul>
    <li><a class="cl-autoback" href="install.php">Installation and Configuration</a></li>
</ul>

<?php echo $view->footer(); ?>
</body>
</html>
