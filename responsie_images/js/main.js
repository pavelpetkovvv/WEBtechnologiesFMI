
//go to top button
mybutton = document.getElementById("myBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}


//get the hight and width of iframe every 1 second
//and display them (display function below)
function myLoop() {         
  setTimeout(function() {   
    var element = document.getElementById('iframe_responsive_image_example');

    var positionInfo = element.getBoundingClientRect();
    var height = positionInfo.height;
    var width = positionInfo.width;

    displayDimensions(width, height);

    myLoop();
  }, 1000)
}
myLoop();

//function to display width and height
function displayDimensions(width, height){

  //delete previous displayed text
  var elem = document.getElementById("size_temp");
  if(elem!=null){
    elem.remove();
  }
  
  //crate new <p> node
  var tag = document.createElement("p");
  tag.setAttribute("id", "size_temp");
  
  //retrieved numbers are greater with 4 (don't know why)
  height=height-4;
  width=width-4;
  
  //add text ("width x height")
  var text = document.createTextNode("Size (w/h): " + width + " x " + height);
  tag.appendChild(text);
  var element = document.getElementById("frame_size_display");
  element.appendChild(tag);
}