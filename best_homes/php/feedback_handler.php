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
{echo '<meta charset="UTF-8">
    <div class="alert">
        <div style="text-align: center;">
        <p>
        Съобщението е изпратено успешно. Натиснете бутона, за да се върнете към предишната страница.
        </p>
        <button class="circle_button" onclick="goBack()">&#10094;</button>
    </div>
      </div>        
      <script>
        function goBack() {
          window.history.back();
        }
        </script>
        <style>
            p{
                margin-top: 5%;
                 background-color: rgb(103, 207, 33);
                  padding: 20px;
                   display: block;
                    border-radius: 20px;
            }

            .circle_button{
                background-color: rgba(68,68,68,0.9);
        border-radius: 50%;
        border: none;
        height: 150px;
        width: 150px;
        padding: 20px;
        text-align: center;
        cursor: pointer;
        text-decoration: none;
        color: white;
        font-size: xx-large;
            }

            .circle_button:hover{
opacity: 0.8;
transform:scale(1.2,1.2);
}
        </style>';}
// If send fails:
else {echo '        <meta charset="UTF-8">
    <div class="alert">
        <div style="text-align: center;">
        <p>
        Възникна проблем с изпращането на съобщението. Опитайте отново по-късно. Натиснете бутона, за да се върнете към предишната страница.
        </p>
        <button class="circle_button" onclick="goBack()">&#10094;</button>
    </div>
      </div>        
      <script>
        function goBack() {
          window.history.back();
        }
        </script>
        <style>
            p{
                margin-top: 5%;
                 background-color: rgb(223, 70, 70);
                  padding: 20px;
                   display: block;
                    border-radius: 20px;
            }

            .circle_button{
                background-color: rgba(68,68,68,0.9);
        border-radius: 50%;
        border: none;
        height: 150px;
        width: 150px;
        padding: 20px;
        text-align: center;
        cursor: pointer;
        text-decoration: none;
        color: white;
        font-size: xx-large;
            }

            .circle_button:hover{
opacity: 0.8;
transform:scale(1.2,1.2);
}
        </style>';}
?>