let presentationDates;
let reservedHours;

fetch('http://localhost/mydocs/date_reservation_app/php/getPresentationDates.php')
  .then(response => response.json())
  .then(function(data) {
    presentationDates=data;
  }).catch(function(error) {
    console.log('Request failed', error);
  })
  .then(function(){
    presentationDates.forEach(element => {
      addDate(element.date);
      createHours(element.date, element.startHour,element.endHour, element.presentationTime);
    })})
    .then(function(){fetch('http://localhost/mydocs/date_reservation_app/php/getReservedHours.php')
    .then(response => response.json())
    .then(function(data) {
      reservedHours=data;
    }).catch(function(error) {
        console.log('Request failed', error);

      })
        .then(function(){
          if(reservedHours){
            console.log(reservedHours);
            reservedHours.forEach(element =>{
            createReservedHours(element.date, element.fn, element.presentationName, element.presentorName, element.time);
            })}
        })
      })
  

//insert dates into table  
  function addDate(date){
    //get container to attach dateboxes to
    let calendarContaner = document.getElementById("calendar-box-container");
    if(document.getElementById(date)!=null){
      return;
    }
    //create datebox and attach it
    let dateBox = document.createElement("div");
    dateBox.setAttribute("class", "calendar-box");
    dateBox.setAttribute("id", date);
    calendarContaner.appendChild(dateBox);

    //create and attach dateBox date sign
    let dateText = document.createElement("p");
    dateText.innerHTML = date;
    dateBox.appendChild(dateText);

  }

  //create hour slots
  function createHours(date, startHour, endHour, presentationTime){
    var startHours = splitHours(startHour)
    var endHours = splitHours(endHour);
    var dateID = document.getElementById(date);

    while(!compareHours(startHours, endHours)){
      var slot = document.createElement("button");
      if(startHours[1] < 10){
        if(startHours[0] < 10){
          slot.setAttribute("id", date+"-0"+startHours[0].toString()+"-0"+startHours[1].toString());
        }
        else{
          slot.setAttribute("id", date+"-"+startHours[0].toString()+"-0"+startHours[1].toString());
        }
      }else{
        if(startHours[0] < 10){
          slot.setAttribute("id", date+"-0"+startHours[0].toString()+"-"+startHours[1].toString());
        }
        else{
          slot.setAttribute("id", date+"-"+startHours[0].toString()+"-"+startHours[1].toString());
        }
      }
      slot.setAttribute("class", "free");
      slot.setAttribute("onclick", "openReservtionForm(\"" + slot.getAttribute("id")+"\")");
      if(startHours[1] < 10){
        slot.innerHTML=startHours[0].toString()+":0"+startHours[1].toString();
      }else{
        slot.innerHTML=startHours[0].toString()+":"+startHours[1].toString();
      }
      dateID.appendChild(slot);
      addMinutes(startHours, parseInt(presentationTime));

    }
  } 

  function createReservedHours(date, fn, presentationName, presentorName, time){
    var id = date;
    var temp = time.toString().split(':', 2);
    id += "-" + temp[0];
    id += "-" + temp[1];
    temp = null;

    var slot = document.getElementById(id);

    slot.setAttribute('class', 'taken');

    slot.innerHTML = presentationName + " - " + presentorName + " " + fn;
  }

  /*accepst string in format: HH:MM:SS
  and returns array containing integers
  arr[0] = HH
  arr[1] = MM
  arr[2] = SS*/
  function splitHours(hour){
    let hours = hour.toString().split(':');
    hours[0] = parseInt(hours[0]);
    hours[1] = parseInt(hours[1]);
    hours[2] = parseInt(hours[2]);

    return hours;
  }

  /*returns true if hours1 is after hours2
  accepts 2 arrays where
  arr[0] = hours
  arr[1] = minutes
  arr[2] = seconds
  doesn't compare seconds for now bcaouse it is not neccesary
  and will only slow down code execution*/

  function compareHours(hours1, hours2){
    if(hours1[0]>hours2[0]){
      return true;
    }

    if(hours1[0] == hours2[0]){
      if(hours1[1] > hours2[1]){
        return true;
      }
    }

    return false;
  }

  /*accepts minutes(int) and array where
  arr[0] = hours(int)
  arr[1] = minutes(int)
  arr[2] = seconds(int)
  returns the array with added minutes
  returns NULL if minutes < 0*/

  function addMinutes(hours, minutes){
    if(minutes < 0){
      return null;
    }


    if(hours[1] + minutes >= 60){
      hours[0] += 1;
      hours[1] = (hours[1]+minutes)%60;

      if(hours[0] > 23){
        hours = hours % 24;
      }

    }else{
      hours[1] += minutes;
    }
  }


function sendData(id, topic, presentationName, fn, presentorName){
  const xhr = new XMLHttpRequest();

  xhr.open("POST", "./php/reserveDate.php");
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.send("id="+id+"&topic="+topic+"&presentationName="+presentationName+"&fn="+fn+"&presentorName="+presentorName);

  xhr.onload = function(){
    if(this.responseText!="reserved"){
    let response = JSON.parse(this.responseText);
    createReservedHours(response.date, response.fn, response.presentationName, response.presentorName, response.time);
  }
  }
}

//sendData("2021-05-26-11-0", "HTML", "HTML Basics", 62302, "Pavel Petkov");

//#region reservation form

function closeReservationForm(){
  document.getElementById("reservation-form").remove();
}

function openReservtionForm(id){
  var formContainer = document.getElementById("dialogue-box-container");
  //доообрее 
  //(това го казах след като измислих как ще пиша кода и седнах до го пиша)
  var form = document.createElement("form");
  form.setAttribute("id", "reservation-form");
  //form.setAttribute("action", "getFormValue(\""+id+"\")");
  formContainer.appendChild(form);

  var p = document.createElement("p");
  p.innerHTML=splitId(id);
  form.appendChild(p);

  addTypeInputs("presentationName", "text", "Име на презентация");
  addTypeInputs("facultyNumber", "number", "Факултетен номер");
  addTypeInputs("presentorName", "text", "Име на презентатор");

  createSelect("reservation-form");

  var button = document.createElement("button");
  button.setAttribute("class", "reservation-form-submit");
  button.setAttribute("type", "button");
  button.setAttribute("onclick", "getFormValue(\""+id+"\")");
  button.innerHTML="Запази час";
  form.appendChild(button);

  var button = document.createElement("button");
  button.setAttribute("class", "reservation-form-submit");
  button.setAttribute("onclick", "closeReservationForm()");
  button.innerHTML="Затвори";
  form.appendChild(button);

}

function splitId(id){
  var idArr = id.toString().split("-");

  if(parseInt(idArr[4])<10){
    return idArr[0]+"-"+idArr[1]+"-"+idArr[2]+" "+idArr[3]+":0"+idArr[4];
  }else{
    return idArr[0]+"-"+idArr[1]+"-"+idArr[2]+" "+idArr[3]+":"+idArr[4];
  }
}

function addTypeInputs(name, type, placeholder){
  var form = document.getElementById("reservation-form");

  var input = document.createElement("input");
  input.setAttribute("name", name);
  input.setAttribute("class", "reservation-form-input");
  input.setAttribute("type", type);
  input.setAttribute("placeholder", placeholder);

  form.appendChild(input);
}

function createSelect(id){
  var form = document.getElementById(id);

  var select = document.createElement("select");
  select.setAttribute("class", "reservation-form-input");
  select.setAttribute("name", "topic");
  select.setAttribute("id", "topic");
  form.appendChild(select);

  var options = ["HTML", "CSS", "JavaScript", "PHP", "Database", "Security", "SPA", "Best practices"];

  options.forEach(element => {
    addOptionsToSelect("topic", element);
  });
}

function addOptionsToSelect(id, optionText){
  var select = document.getElementById(id);

  var option = document.createElement("option");
  option.setAttribute("value", optionText);
  option.innerHTML=optionText;
  select.appendChild(option);
}

//#endregion

function getFormValue(id) {
  const noteForm = document.getElementById("reservation-form");

  var formData = new FormData(noteForm);
  var presentationName = formData.get("presentationName");
  var facultyNumber = formData.get("facultyNumber");
  var presentorName = formData.get("presentorName");
  var topic = formData.get("topic");

  sendData(id, topic, presentationName, facultyNumber, presentorName);
  closeReservationForm();
}
