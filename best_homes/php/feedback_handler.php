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
{echo '
  <script>
  window.history.back();
  </script>';}

  // If send fails:
else {echo '                <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <script  src="../js/main.js" defer></script>

  <title>Best homes</title>


  <style>
header{
position: relative;
text-align: center;
}

      .header_image_logo_container{
      position: relative;
      display: block;
      float: left;
      }
      @media screen and (max-width: 710px) {
      .site_heading_container{
      display: none;
      }
      header{
      display: block;
      }
      .header_image_logo_container {
      position: relative;
      float: none;
      }
      }
      .site_heading{
font-size: x-large;
display:block;
}

.navigation{
text-align: center;
background-color: rgb(167, 40, 40);
overflow: auto;
}


  </style>
  <header>
      <div class="header_top">
          <div class="header_image_logo_container">
              <img class="header_image_logo" src="../images/logo.jpg" alt="logo">
          </div>
          <div class="site_heading_container">
              <p class="site_heading">BEST HOMES</p>
          </div>
      </div>
  </header>

  <div class="navigation">
      <p class="site_heading">Възникна проблем при изпращането на съобщението, моля опитайте по-късно.</p>
  </div>
  <p>
      Ще бъдете пренасочени към предишната страница.
  </p>

  <script>
        function myLoop() {         
setTimeout(function() {    
  window.history.back();  
}, 8000)
}
myLoop();

  </script>';}
?>