<?php
require '../../site/use/site.php';
$view = new CL\Site\Doc\DocView($site);
$view->title = 'cl/user installation';
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <link href="../../../../cl/site.css" type="text/css" rel="stylesheet" />
<?php echo $view->head(); ?>
</head>

<body>
<?php echo $view->header(); ?>
<?php echo Backto::to("cl/user", "./"); ?>


<p>You will need to have installed cl/site and have at least one simple
    page to load. First use composer to install the cl/users component and the site console component:</p>

<pre class="code">composer require cl/users
composer require cl/console
composer run cl-installer</pre>

<p>The <code>composer run cl-installer</code> command runs a script that installs the component in the
    system. It must be run any time a new component is added.</p>


<aside>The cl/setup/tables URL can be used at any time to ensure all
    required tables are created. It will not delete or modify any existing
    tables, but will install any tables that are currently missing.</aside>

<p>To get the initial tables created, browse to the URL (relative to the
    site root):</p>

<p class="center"><code>cl/setup/tables</code></p>
<p>For example, if the site URL is https://www.example.com/site, the URL to create the tables will be https://www.example.com/site/cl/setup/tables.</p>


<p>Normal pages on the site will now come up with a login window.
    To get the site up and running install a temporary admin user. Edit
    site.php and uncomment the following and edit in a reasonable password
    (please don't use the one that is included as an example):</p>
<pre class="code">// Uncomment to add an initial admin before tables are created
// and the first user added to tables.
$site-&gt;users-&gt;addUser('admin', 'User, Admin',
	CL\Users\User::ADMIN, password_hash('sHQFLJdNeI', PASSWORD_DEFAULT));</pre>
<p>You will now be able to log onto the site using these credentials. Then to do cl/console to access the site console. The Management option in the navigation bar takes you to a page where you can create an admin user. One the admin user is created, delete the temporary admin from site.php. Browse to cl/login to login the new user. </p>
<h3>Sandbox bypass and Email stripping</h3>
<p>Sandbox bypass allows the password to be omitted when logging into a local sandbox instance for testing purposes. The password will only be ignored if the site is specifically indicated as being in the sandbox (see the cl/site configuration).</p>
<p>Email stripping will remove the @server.edu from an email address to reduce it to just the network ID. </p>
<p>To enable either of these features add this code to site.php:</p>
<pre class="code">$site-&gt;users-&gt;auth = new \CL\Users\Authenticate([
    'sandbox-bypass'=&gt;true,
    'email-strip' =&gt; true
]);</pre>
<p>Include the desired option in the array.</p>
<p><?php echo Toggle::begin("Why email stripping?", "p"); ?> </p>
<p>It's amazing how many students cannot comprehend the concept of entering just their network ID. They are used to entering an email address. This option saves a lot of gripping.</p>
<?php echo Toggle::end(); ?>
<h3>LDAP Authentication</h3>
<p>To use LDAP authentication rather than an internal password system, add this code to site.php. The LDAP url and options will be provided by a system administrator. These example values are for the MSU Computer Science department:</p>
<pre class="code">$site-&gt;users-&gt;auth = new \CL\Users\AuthenticateLDAP([],
	"ldap://ds.cse.msu.edu:389",
	"ou=People,dc=cse,dc=msu,dc=edu"
);</pre>
<p>Both sandbox bypassing and email stripping can be added to the LDAP authentication object:</p>
<pre class="code">$site-&gt;users-&gt;auth = new \CL\Users\AuthenticateLDAP([
    'sandbox-bypass'=&gt;true,
    'email-strip' =&gt; true
  ],
	"ldap://ds.cse.msu.edu:389",
	"ou=People,dc=cse,dc=msu,dc=edu"
);</pre>
<p>Use either \CL\Users\Authenticate or \CL\Users\AuthenticateLDAP, not both!</p>


<?php echo Backto::to("cl/user", "./"); ?>
<?php echo $view->footer(); ?>
</body>
</html>
