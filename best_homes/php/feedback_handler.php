<?php
// Time to get the variables from the user’s request. Once we execute these four commands, we’ll have the user’s data in our variables.
$name = $_POST['client_name'];
$email = $_POST['client_email'];
$message = $_POST['client_text'];

// Creating the email message that we’ll send.
$mes = "Name: $name \nE-mail: $email \nMessage: $message";

// Trying to send the message using the PHP mailer module.
$send = mail ("best.homes@abv.bg", "website feedback",$mes,"Content-type:text/plain; charset = UTF-8\r\nFrom:best.homes@abv.bg");
// If send successful:
if ($send == 'true')
// ‘Echo’ returns some text back to the webpage.
{echo "Message sent";}
// If send fails:
else {echo "Something went wrong";}
?>