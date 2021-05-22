//fetching information about available and reserved date and hour slots
//and rendering them

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
      renderAvailableDateSlot(element.date);
      renderAvailableHourSlot(element.date, element.startHour,element.endHour, element.presentationTime);
    })})
    .then(function(){
      fetch('http://localhost/mydocs/date_reservation_app/php/getReservedHours.php')
      .then(response => response.json())
      .then(function(data) {
        reservedHours=data;
      }).catch(function(error) {
        console.log('Request failed', error);
      })
      .then(function(){
        if(reservedHours){
          reservedHours.forEach(element =>{
            renderReservedHourSlot(element.date, element.fn, element.presentationName, element.presentorName, element.time);
          })}
        })
      })
  

//insert dates into table  
  function renderAvailableDateSlot(date){
    //get container to attach dateboxes to
    let calendarContaner = document.getElementById("calendar-box-container");

    //checning if such date already exists
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
  function renderAvailableHourSlot(date, startHour, endHour, presentationTime){

    var startHours = splitHours(startHour)
    var endHours = splitHours(endHour);

    var dateID = document.getElementById(date);

    //#region 
    //split the date and set slots IDs to YYYY-MM-DD-HH-MM format depending on date and time
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
      slot.setAttribute("onclick", "openReservtionForm(\"" + slot.getAttribute("id")+"\")");
      if(startHours[1] < 10){
        slot.innerHTML=startHours[0].toString()+":0"+startHours[1].toString();
      }else{
        slot.innerHTML=startHours[0].toString()+":"+startHours[1].toString();
      }
      //#endregion

      slot.setAttribute("class", "free");
      dateID.appendChild(slot);
      addMinutesToHours(startHours, parseInt(presentationTime));

    }
  } 

  //coverts available hour slot to reserved hour slot
  //available hours slot with the date and hours must be present in DOM
  function renderReservedHourSlot(date, fn, presentationName, presentorName, time){
    var id = date;

    var hour = time.toString().split(':', 2);
    id += "-" + hour[0];
    id += "-" + hour[1];


    var slot = document.getElementById(id);

    slot.setAttribute('class', 'taken');
    slot.setAttribute('onclick', "openDeletionForm(\""+id+"\")")

    slot.innerHTML = hour[0]+":"+hour[1] + " " + presentationName + " - " + presentorName + " " + fn;
  }

  /*accepts string in format: HH:MM:SS
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

  function addMinutesToHours(hours, minutes){
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


//#region reservation form

function closeForm(id){
  document.getElementById(id).remove();
}

function openReservtionForm(id){
  var formContainer = document.getElementById("dialogue-box-container");
  
  var form = document.createElement("form");
  form.setAttribute("id", "reservation-form");
  formContainer.appendChild(form);

  var p = document.createElement("p");
  p.innerHTML=splitId(id);
  form.appendChild(p);

  addTypeInputs("reservation-form", "presentationName", "text", "Име на презентация");
  addTypeInputs("reservation-form", "facultyNumber", "number", "Факултетен номер");
  addTypeInputs("reservation-form", "presentorName", "text", "Име на презентатор");
  addTypeInputs("reservation-form", "password", "text", "Парола");

  createSelect("reservation-form");

  var button = document.createElement("button");
  button.setAttribute("class", "reservation-form-submit");
  button.setAttribute("type", "button");
  button.setAttribute("onclick", "reserveSlot(\""+id+"\")");
  button.innerHTML="Запази час";
  form.appendChild(button);

  var button = document.createElement("button");
  button.setAttribute("class", "reservation-form-submit");
  button.setAttribute("onclick", "closeForm(\"reservation-form\")");
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

function addTypeInputs(idToAttachTo, name, type, placeholder){
  var form = document.getElementById(idToAttachTo);

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

//gets values from reservation form and sends data to backend
function reserveSlot(id) {
  const noteForm = document.getElementById("reservation-form");

  var formData = new FormData(noteForm);
  var presentationName = formData.get("presentationName");
  var facultyNumber = formData.get("facultyNumber");
  var presentorName = formData.get("presentorName");
  var password = formData.get("password");
  var topic = formData.get("topic");

  //check if all fields are filled
  if(presentationName && facultyNumber && presentorName && password){
    reserveSlotSendData(id, topic, presentationName, facultyNumber, presentorName, password);
    closeForm("reservation-form");
  }else{
    //show error message
  }
}

//helper function which sends data to backend
function reserveSlotSendData(id, topic, presentationName, fn, presentorName, password){
  const xhr = new XMLHttpRequest();

  xhr.open("POST", "./php/reserveDate.php");
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.send("id="+id+"&topic="+topic+"&presentationName="+presentationName+"&fn="+fn+"&presentorName="+presentorName+"&password="+password);

  xhr.onload = function(){
    if(this.responseText!="reserved"){
    let response = JSON.parse(this.responseText);
    renderReservedHourSlot(response.date, response.fn, response.presentationName, response.presentorName, response.time);
  }
  }
}

//#region delition of reserved slot
function deleteReservation(id){
  const noteForm = document.getElementById("deletion-form");

  var formData = new FormData(noteForm);
  var password = formData.get("password");

  //check if all fields are filled
  if(password){
    deleteReservationSendData(id, password);
    closeForm("deletion-form");
  }else{
    //show error message
  }
}


function deleteReservationSendData(id, password){
  const xhr = new XMLHttpRequest();

  xhr.open("POST", "./php/deleteReservation.php");
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.send("id="+id+"&password="+password);

  xhr.onload = function(){
    if(this.responseText == "reservation deleted"){
      removeReservedSlot(id);
    }
  }
}

function removeReservedSlot(id){
  var slot = document.getElementById(id);
  var time = id.toString().split("-");

  slot.setAttribute('class', 'free');
  slot.setAttribute('onclick', "reserveSlot(\""+id+"\")");
  slot.innerHTML = time[3] + ":" + time[4];

}

function openDeletionForm(id){
  var formContainer = document.getElementById("dialogue-box-container");
  
  var form = document.createElement("form");
  form.setAttribute("id", "deletion-form");
  formContainer.appendChild(form);

  var p = document.createElement("p");
  p.innerHTML="Въведете паролата, с която е запазен часът, за да го отмените";
  form.appendChild(p);

  addTypeInputs("deletion-form", "password", "password", "Парола");

  var button = document.createElement("button");
  button.setAttribute("class", "reservation-form-submit");
  button.setAttribute("type", "button");
  button.setAttribute("onclick", "deleteReservation(\""+id+"\")");
  button.innerHTML="Изтрий час";
  form.appendChild(button);

  var button = document.createElement("button");
  button.setAttribute("class", "reservation-form-submit");
  button.setAttribute("onclick", "closeForm(\"deletion-form\")");
  button.innerHTML="Затвори";
  form.appendChild(button);

}
//#endregion

//#region fetch presentations by topic

function highlight(){
  const select = document.getElementById("filter");
  var filter = select.value;

  fetchByTopic(filter);
}


function fetchByTopic(topic){
  const xhr = new XMLHttpRequest();

  xhr.open("POST", "./php/getPresentationsByTopic.php");
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.send("topic="+topic);

  xhr.onload = function(){
    changeClass('taken-reccomended', 'taken');

    if(this.responseText){
      response = JSON.parse(this.responseText);
      response.forEach(element => {
        renderHightlighted(element.date, element.time);
      });
    }
  }
}

function renderHightlighted(date, time){
  var id = date;
  timeArray = time.split(":");

  id += "-" + timeArray[0] + "-" + timeArray[1];

  var slot = document.getElementById(id);

  slot.setAttribute('class', 'taken-reccomended');
}

function changeClass(oldClass, newClass){
  var elements = document.getElementsByClassName(oldClass);

  while (elements.length) {
    elements[0].setAttribute('class', newClass);
  }  
}