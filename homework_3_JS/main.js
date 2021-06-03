
function validate(){
    resetForm();

    const usernameField = validateUsername(document.getElementById("username"));
    const passwordField = validatePassword(document.getElementById("password"));
    const nameField = validateName(document.getElementById("name"));
    const familyNameField = validateFamilyName(document.getElementById("family-name"));
    const emailField = validateEmail(document.getElementById("email"));
    const postalCodeField = validateCode(document.getElementById("postal-code"));

    fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(function(data){
        for (let i = 0; i < data.length; i++) {
            if (data[i].username === username.value) {
                displayError("Съществува потребител с това потребителско име", username);
                return false;
            }
        }
        return true;
    }).catch(function(error) {
        console.log('Request failed', error);
      }).then(function(data){
        if (usernameField && passwordField && nameField && familyNameField && emailField && postalCodeField && data) {
            var div = document.createElement('div');
            div.classList.add("temporary");
            div.classList.add("success-box");
            div.id = "success";
    
            var p = document.createElement('p')
            p.textContent = "Успешна регистрация " + username.value;
            p.classList.add("temporary");
            p.classList.add("success-text");
            p.id = "success";
    
            document.getElementById("register-btn").style.borderColor = "#AF706D"
            div.append(p);
            document.getElementById("register-btn").after(div)
        }
      });
}

function validateUsername(input) {
    let len = input.value.length;
    if (len > 10 || len < 3) {
        displayError("Невалидно потребителско име", input);
        return false;
    }
    return true;
}

function validateName(input) {
    let len = input.value.length;
    if (len > 50 || len === 0) {
        displayError("Невалидно име", input)
        return false;
    }
    return true;
}

function validateFamilyName(input) {
    let len = input.value.length;
    if (len > 50 || len === 0) {
        displayError("Невалидно фамилно име", input)
        return false;
    }
    return true;
}

function validatePassword(input) {
    const regex = new RegExp('^[A-Za-z1-9]+$');
    let len = input.value.length;
    if (!regex.test(input.value) || len < 6 || len > 10) {
        displayError("Невалиднa парола", input)
        return false;
    }
    return true
}

function validateEmail(input) {
    const regex = new RegExp('^[a-zA-Z0-9.!#$%&\'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$');
    if (!regex.test(input.value)) {
        displayError("Невалиден e-mail", input)
        return false;
    }
    return true;
}

function validateCode(input) {
    const regex1 = new RegExp('^[0-9]+$');
    const regex2 = new RegExp('^[0-9]+-[0-9]+$');
    if ( input.value.length === 0) {
        displayError("Невалиден пощенски код, postal-code", input)
        return false
    }
    if (!(regex1.test(input.value) || regex2.test(input.value))) {
        displayError("Невалиден пощенски код, postal-code", input)
        return false
    }
    return true
}

function displayError(message, usernameElement) {
    var div = document.createElement('div');
    div.classList.add("temporary");
    div.classList.add("error");
    div.classList.add("error-box");


    var p = document.createElement('p');
    p.textContent = message;
    p.classList.add("temporary");
    p.classList.add("error");
    p.classList.add("error-text");


    usernameElement.style.borderColor = "#AF706D";
    div.append(p);
    usernameElement.after(div)
}

function resetForm() {
    const elements = document.getElementsByClassName("temporary");
    const inputs = document.getElementsByTagName("input");

    if (inputs.length !== 0) {
        for (var i = inputs.length - 1; i >= 0; --i) {
            inputs[i].style.borderColor = '#B2BCAF'
        }
    }

    if (elements.length !== 0) {
        for (var i = elements.length - 1; i >= 0; --i) {
            elements[i].remove();
        }
    }
}
