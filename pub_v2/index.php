<?php require "getvar.php"; ?>

<html>
<head>
<title>FMIcalendar</title>
<link rel="stylesheet" type="text/css" href="calendar.css">
<script type="text/javascript" src="jquery.min.js"></script>
<script type="text/javascript" src="main.js"></script>
</head>
<body>
	<tr><button class="viewday">Day</button><button class="viewmonth">Month</button></tr>
	<br>
	<tr><button class="viewday1">Day I: 14/01/21</button><button class="viewday2">Day II: 21/01/21</button><button class="viewday3">Day III: 28/01/21</button></tr>
	<table style="border:3px solid green;" class="cal">

	<tr>
	
	<td><button class="back">Back</button></td>
	<td colspan="5">
	<?php echo "<span class=MYdiv id=".$month."/".$Year."/".$numDays.">".$day.",".$monthName.", ".$Year."</span>"; 
		  echo "<div class='daysel' style='display:none;' id=".$day."></div>";
	?>
	<button class="next">Next</button>
	</td>
	</tr>
	
<?php 
echo "<div class='viewtype' id=".$viewtype." style='display:none;'></div>";

if ($viewtype=="month") {
require 'month.php'; 
}
if ($viewtype=="day") {
require 'day.php'; 
}

?>
</table>

<div class="evform" style="display:none;">
<button class="close">Close</button>	
	<h5>Event Name:</h5>
	<input class="evName" type="text"><br>
	<h5>FN:</h5>
	<input class="evFN" type="text"><br>
	<h5>Subject:</h5>
   <select class="sub" name="names_subject" title="Java, javascript, HTML, etc.">
    <option value="JAVASCRIPT">JAVASCRIPT</option>
    <option value="HTML">HTML</option>
    <option value="CSS">CSS</option>
    <option value="PHP">PHP</option>
    <option value="JAVA">JAVA</option>
    <option value="DATABASE">DATABASE/SQL</option>
   	<option value="OTHER">Other</option>
   </select>


   <br><button class="submit">Submit</button>
</div>


<div class="evform2" style="display:none;">
<button class="close">Close</button>	<br><br>
<h4>Are you sure you want to delete the event?</h4>
<button class="delete">Delete Event</button>

</div>


</body>
</html>