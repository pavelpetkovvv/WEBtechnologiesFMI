
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
    slides[slideIndex-1].style.display = "block";
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
  