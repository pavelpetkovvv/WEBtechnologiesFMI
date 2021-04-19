function checkAndSubmit(){

    //getting values from submit form
    var username = document.getElementById("username-field").value;
    var password = document.getElementById("password-field").value;
    var phoneNumber = document.getElementById("phone-number-field").value;
    var email = document.getElementById("email-field").value;
    var role = document.getElementById("role-select").value;
    var apartmentNumber = document.getElementById("apartment-number-field").value;

    //remove all previous invalid input feedback
    removeinvalidInputFeedback();

    var allCorrect = true;

    if(!checkUsername(username)){
        displayFieldError("username-field");
        displayError("invalid-username-message-container", "Невалидно потребителско име!");
        allCorrect = false;
    }
    if(!checkPassword(password)){
        displayFieldError("password-field");
        displayError("invalid-password-message-container", "Невалидна парола!");
        allCorrect = false;
    }
    if(!checkPhoneNumber(phoneNumber)){
        displayFieldError("phone-number-field");
        displayError("invalid-phone-number-message-container", "Невалиден телефонен номер!");
        allCorrect = false;
    }
    if(!checkEmail(email)){
        displayFieldError("email-field");
        displayError("invalid-email-message-container", "Невалиден имейл!");
        allCorrect = false;
    }
    if(!checkApartmentNumber(apartmentNumber)){
        displayFieldError("apartment-number-field");
        displayError("invalid-apartment-number-message-container", "Невалиден номер на апартамент!");
        allCorrect = false;
    }

    if(allCorrect == true){
        console.log("would submit data if there was backend");
    }
}

function checkUsername(username){
    return username.length > 0;
}

function checkPassword(password){
    return(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password));
}

function checkEmail(email){
    return(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email));
}

function checkPhoneNumber(phoneNumber){
    return(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/.test(phoneNumber));
}

function checkApartmentNumber(apartmentNumber){
    return apartmentNumber.length > 0;
}


//display text message under field with invalid input
function displayError(errorMessageContainer, errorMessageText){
    var container = document.getElementById(errorMessageContainer);
    var message = document.createElement("input");
    message.setAttribute("disabled", "true");   
    message.setAttribute("class", "invalid-input-message");
    message.setAttribute("placeholder", errorMessageText);

    container.appendChild(message);
}

//make the field with invalid input with red border
function displayFieldError(fieldId){
    var field = document.getElementById(fieldId);
    field.setAttribute("class", "input-invalid");
}


//remove invalid input messages and red borders of input fields with invalid
function removeinvalidInputFeedback(){
    //remove invalid input messages
    var elements = document.getElementsByClassName("invalid-input-message");

    while(elements.length > 0) {
        elements[0].remove();
     }

    //remove invalid input fields red borders
    var elements = document.getElementsByClassName("input-invalid");

    while ( elements.length > 0){ 
        elements[0].setAttribute("class", "input-normal");
    }
}
