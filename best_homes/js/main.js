
//slideshow JS
var slideIndex = 1;

function plusSlides(n) {
    showSlides(slideIndex += n);
  }

  function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("slide");
    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    if(slides.length!=0){
      slides[slideIndex-1].style.display = "block";
    }
  }

showSlides(slideIndex);

//change slide every 10 seconds
function myLoop() {         
    setTimeout(function() {  
        plusSlides(1);
      myLoop();
    }, 10000)
  }
  myLoop();
  

  function displaySuccessMessage(){
    var tag = document.createElement("p");


   var text = document.createTextNode("Успешно изпратихте вашето съобщение.");
   tag.appendChild(text);
   var element = document.getElementById("success_message");
   element.innerHTML="";
   element.appendChild(tag);
   document.getElementById("submit_button").remove;
  }

  function sendEmail(){

    const noteForm = document.getElementById("email_form");

    var formData = new FormData(noteForm);
    var client_name = formData.get("client_name");
    var client_email = formData.get("client_email");
    var client_text = formData.get("client_text");

    console.log(client_name);
    console.log(client_email);
    console.log(client_text);


    if(client_email && client_name && client_text){

    const xhr = new XMLHttpRequest();

    xhr.open("POST", "./php/feedback_handler.php");
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send("client_name="+client_name+"&client_email="+client_email+"&client_text="+client_text);
    

    xhr.onload = function(){
      console.log(this.responseText);
    }
    }
    displaySuccessMessage();
  }

  