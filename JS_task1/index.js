
//#region getting data
var usernameField = document.getElementById('usernameField');
var passwordField = document.getElementById('passwordInput');
var repeatPasswordField = document.getElementById('repeatPasswordInput');

var wrongUsernameCross = document.getElementById('wrongUsernameCross');
var wrongPasswordCross = document.getElementById('wrongPasswordCross');
var wrongRepeatPasswordCross = document.getElementById('wrongRepeatPasswordCross');


var username;
var password;
var repeatPassword;

usernameField.onfocus = resetFeedback;
passwordField.onfocus = resetFeedback;
repeatPasswordField.onfocus = resetFeedback;


var clickHandler = function(event) {
    username = usernameField.value;
    password = passwordField.value;
    repeatPassword = repeatPasswordField.value;

    giveFeedback();

    //#region debugging
    console.log(username);
    console.log(password);
    console.log(repeatPassword);
    console.log("username valid: " + validateUsername(username));
    console.log("password valid: " + validatePassword(password));
    console.log("repeat password same as original: " + validateRepeatPassword(repeatPassword));
    //#endregion 



};

var submitButton = document.getElementById('signupButton');
submitButton.addEventListener('click', clickHandler);

//#endregion

//#region validating data

function validateUsername(username){
    if(username.length < 3 || username.length > 10){
        return false;
    }

        var letterPresent = false;
        var digitPresent = false;
        var underscorePresent = false;

    for(var i = 0; i < username.length; i++){
        if(username.charCodeAt(i) == 95){
            underscorePresent = true;
        }
        if(username.charCodeAt(i) >= 65 && username.charCodeAt(i) <= 90 || username.charCodeAt(i) >= 97 && username.charCodeAt(i) <= 122){
            letterPresent = true;
        }
        if(username.charCodeAt(i) >= 48  && username.charCodeAt(i) <= 57){
            digitPresent = true;
        }
    }

    return letterPresent && digitPresent && underscorePresent;
}

function validatePassword(password){
    if(password.length < 6){
        return false;
    }

        var lowwerCaseLetterPresent = false;
        var upperCaseLetterPresent = false;
        var digitPresent = false;

    for(var i = 0; i < password.length; i++){
        if(password.charCodeAt(i) >= 65 && password.charCodeAt(i) <= 90){
            upperCaseLetterPresent = true;
        }
        if(password.charCodeAt(i) >= 97 && password.charCodeAt(i) <= 122){
            lowwerCaseLetterPresent = true;
        }
        if(password.charCodeAt(i) >= 48  && password.charCodeAt(i) <= 57){
            digitPresent = true;
        }
    }

    return lowwerCaseLetterPresent && upperCaseLetterPresent && digitPresent;
}

function validateRepeatPassword(repeatPassword){
    if(password.length != repeatPassword.length){
        return false;
    }

    for(var i = 0; i < password.length; i++){
        if(password.charCodeAt(i) != repeatPassword.charCodeAt(i)){
            return false;
        }
    }

    return true;
}

//#endregion

//#region feedback
function giveFeedback(){
    if(!validateUsername(username)){
        var div = document.getElementById("incorrectInput");
        var paragraph = document.createElement('p');
        paragraph.id = "wrongUsernameTextFeedback";
        var text = document.createTextNode("Incorrect username");
        paragraph.appendChild(text);
        div.appendChild(paragraph);
        wrongUsernameCross.hidden=false;
    }
    else
        if(!validatePassword(password)){
            var div = document.getElementById("incorrectInput");
            var paragraph = document.createElement('p');
            paragraph.id = "wrongPasswordTextFeedback";
            var text = document.createTextNode("Incorrect password");
            paragraph.appendChild(text);
            div.appendChild(paragraph);
            wrongPasswordCross.hidden=false;
        }
        else
            if(!validateRepeatPassword(repeatPassword)){
                var div = document.getElementById("incorrectInput");
            var paragraph = document.createElement('p');
            paragraph.id = "wrongRepeatPasswordTextFeedback";
            var text = document.createTextNode("Repeat password must match original password");
            paragraph.appendChild(text);
            div.appendChild(paragraph);
            wrongRepeatPasswordCross.hidden=false;
            }
            else{
                $.ajax({
                    type : "POST",  //type of method
                    url  : "register.php",  //your page
                    contentType: "application/json; charset=UTF-8",
                    data : {json: JSON.stringify(username)},
                    dataType : "json",
                
                    error: function(res){
                        console.log(res);
                        console.log("failure");
                    },
                    success: function(res){  

                        console.log("success");   
                        }
                });
            }
}

function resetFeedback(){
    wrongUsernameCross.hidden=true;
    wrongPasswordCross.hidden=true;
    wrongRepeatPasswordCross.hidden=true;

    if(document.getElementById("wrongUsernameTextFeedback") != null){
        document.getElementById("incorrectInput").removeChild(document.getElementById("wrongUsernameTextFeedback"));
    }

    if(document.getElementById("wrongPasswordTextFeedback") != null){
        document.getElementById("incorrectInput").removeChild(document.getElementById("wrongPasswordTextFeedback"));
    }

    if(document.getElementById("wrongRepeatPasswordTextFeedback") != null){
        document.getElementById("incorrectInput").removeChild(document.getElementById("wrongRepeatPasswordTextFeedback"));
    }
}

/*
data : JSON.stringify({
    name : username,
    password : password
}),
*/ 