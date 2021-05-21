$(document).ready(function(){
var month=(($(".MYdiv").attr("id")).split("/"))[0];
var year=(($(".MYdiv").attr("id")).split("/"))[1];
var nodays=(($(".MYdiv").attr("id")).split("/"))[2];
var viewtype=$(".viewtype").attr("id");
var day=$(".daysel").attr("id");
var evID='';
var evTmp='';
var evYR='';
var evMon='';
var evDay='';
var evTime='';
var evMin='';
var delEvNm='';
var delEvTm='';
var evFN='';
var delEvFN='';

function daysInMonth(month,year) {
    return new Date(year, month, 0).getDate();
}

$(".next").click(function(){
	if (viewtype=='month') {
	month++;
	if (month>12) {year++;month=1;}
	window.open("?month="+month+"&&year="+year+"&&viewtype="+viewtype+"&&day="+day,"_self");
	
	}else if (viewtype=='month'){


	}else if (viewtype=='day'){
	day++;
	if (day>nodays) {
		month++; day=1;
	}
	if (month>12) {year++;month=1;}
	window.open("?month="+month+"&&year="+year+"&&viewtype="+viewtype+"&&day="+day,"_self");
	}

});



$(".back").click(function(){
	if (viewtype=='month') {
	month--;
	if (month<1){year--;month=12;}
	window.open("?month="+month+"&&year="+year+"&&viewtype="+viewtype+"&&day="+day,"_self");
	}else if (viewtype=='month'){


	}else if (viewtype=='day'){
	day--;
	if (day<1) {
		month--; day=daysInMonth(month,year);
	}
	if (month<1) {year--;month=12;}
	window.open("?month="+month+"&&year="+year+"&&viewtype="+viewtype+"&&day="+day,"_self");
	}
});



$(".day").click(function(){

var Sday=$(this).attr('id');
var y=(Sday.split('/'))[0];
var m=(Sday.split('/'))[1];
var d=(Sday.split('/'))[2];
window.open("?month="+m+"&&year="+y+"&&viewtype="+"day"+"&&day="+d,"_self");
});

$(".day1").click(function(){

var Sday=$(this).attr('id');
var y=(Sday.split('/'))[0];
var m=(Sday.split('/'))[1];
var d=(Sday.split('/'))[2];
window.open("?month="+m+"&&year="+y+"&&viewtype="+"day"+"&&day="+d,"_self");
});

$(".viewday").click(function(){

	viewtype='day';
	window.open("?month="+month+"&&year="+year+"&&viewtype="+viewtype+"&&day="+day,"_self");

});

$(".viewday1").click(function(){

	viewtype='day';
	window.open("?month="+01+"&&year="+2021+"&&viewtype="+viewtype+"&&day="+14,"_self");

});

$(".viewday2").click(function(){

	viewtype='day';
	window.open("?month="+01+"&&year="+2021+"&&viewtype="+viewtype+"&&day="+21,"_self");

});

$(".viewday3").click(function(){

	viewtype='day';
	window.open("?month="+01+"&&year="+2021+"&&viewtype="+viewtype+"&&day="+28,"_self");

});

$(".viewmonth").click(function(){

viewtype='month';
	window.open("?month="+month+"&&year="+year+"&&viewtype="+viewtype+"&&day="+day,"_self");

});

$('.event').click(function(){

	evID=$(this).attr("id");
	evTmp=evID.split('/');
	evYR=evTmp[0];
	evMon=evTmp[1];
	evDay=((evTmp[2]).split('|'))[0];
	evTime=((evTmp[2]).split('|'))[1];
    evMin=evTime.split(':')[1];
    if(evMin!='30'){
	   $('.evform').show('200');
    }

});

$('.close').click(function(){
	$('.evform').hide('200'); $('.evform2').hide('200'); 
});

$('.submit').click(function(){
	var evName=$(".evName").val();
	var evFN=$(".evFN").val();
	var sub=$(".sub").find(":selected").attr("value");
	var obj={
		name:evName,
		fn:evFN,
		year:evYR,
		month:evMon,
		day:evDay,
		time:evTime,
		subject:sub
	};
	$.post('add_event.php',obj,function(ret){
		alert(ret);
	window.open("?month="+month+"&&year="+year+"&&viewtype="+viewtype+"&&day="+day,"_self");

	});
  
});


$(".eventadded").click(function(){
	$('.evform2').show(100);
	evID=$(this).attr("id");
	evTmp=evID.split('/');
	evYR=evTmp[0];
	evMon=evTmp[1];
	evDay=((evTmp[2]).split('|'))[0];
	delEvTm=((evTmp[2]).split('|'))[1];
	delEvNm=$(this).text().split(' - fn: ')[0];
});

$('.delete').click(function(){
	var obj={
		name:delEvNm,
		time:delEvTm
	};
	$.post('del_event.php',obj,function(ret){
	alert(ret);
	window.open("?month="+month+"&&year="+year+"&&viewtype="+viewtype+"&&day="+day,"_self");
	});

});


});