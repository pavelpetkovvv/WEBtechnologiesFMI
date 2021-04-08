<?php
require_once "Mail.php";

$name = $_POST['client_name'];
$email = $_POST['client_email'];
$message = $_POST['client_text'];

$from = 'best.homes@abv.bg'; //change this to your email address
$to = 'best.homes@abv.bg'; // change to address
$subject = 'Contact form'; // subject of mail
$body = "Name: $name \nE-mail: $email \nMessage: $message"; //content of mail

$headers = array(
    'From' => $from,
    'To' => $to,
    'Subject' => $subject
);

$smtp = Mail::factory('smtp', array(
        'host' => 'smtp.abv.bg',
        'port' => '465',
        'auth' => true,
        'username' => 'best.homes@abv.bg', //your gmail account
        'password' => 'besthomes01' // your password
    ));

// Send the mail
$mail = $smtp->send($to, $headers, $body);

//check mail sent or not
if (PEAR::isError($mail)) {
    echo '<p>Message was notsent! Try again latter</p>';
} else {
    echo '<p> meassage sent.</p>';
}
?>