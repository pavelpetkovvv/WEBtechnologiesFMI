<tr>
	<td>
	<form  method="post">
	<p id="subject">Subject:</p>
	</td>
	<td>
    <select class="selectSub" name="selectSub" onchange="this.form.submit()">
	<option value="ALL" <?= $subName == "ALL" ? 'selected' : '' ?>>All</option>
    <option value="JAVASCRIPT" <?= $subName == "JAVASCRIPT" ? 'selected' : '' ?>>Javascript</option>
    <option value="HTML" <?= $subName == "HTML" ? 'selected' : '' ?>>HTML</option>
    <option value="CSS" <?= $subName == "CSS" ? 'selected' : '' ?>>CSS</option>
    <option value="PHP" <?= $subName == "PHP" ? 'selected' : '' ?>>Php</option>
    <option value="JAVA" <?= $subName == "JAVA" ? 'selected' : '' ?>>Java</option>
    <option value="DATABASE" <?= $subName == "DATABASE" ? 'selected' : '' ?>>Database/SQL</option>
   	<option value="OTHER" <?= $subName == "OTHER" ? 'selected' : '' ?>>Other</option>
    </select>
	</form>
	</td>
	</tr>
	
<?php 
require 'config.php';
require 'getvar.php';


$events=array(
null,null,null,null,null,null,null,null,null,null,
null,null,null,null,null,null,null,null,null,null,
null,null,null,null,null,null,null,null,null,null,
null,null,null,null,null,null,null,null,null,null,
null	
);



try{
$SQL_EVENTS= "SELECT * FROM eventcalendar";
$result=$con->query($SQL_EVENTS);
if($result !== FALSE){
	
$ctr=$result->fetchAll();
			 foreach($ctr as $row)
		    {
				
				$cn=$row['name'];
				$cf=$row['fn'];
				$cy=$row['year'];
				$cm=$row['month'];
				$cd=$row['day'];
				$ct=$row['time'];
				$cr=$row['sub'];
				$cTS=$currentTimeStamp;
				
			
		   		$monthName = date('F', mktime(0, 0, 0, $cm, 10));
				$diff=$cTS-strtotime("$cd-$monthName-$cy");	

				$datediff=floor($diff / (60 * 60 * 24));
				
			   if ($datediff==0) {

					$n=((intval((explode(":",$ct))[0])-8)*10+(intval((explode(":",$ct))[1])/$duration));
				    $events[$n]=$cn." - fn: ".$cf." - ".$cr;
				
			   }
			}	
 }	
}catch(PDOException $error) {
        echo $error->getMessage();
}


$hr=$startHr;
$min=$startMin;
for ($i=0; $i < sizeof($events) ; $i++) {
	if ($min==0) {
		$min='00';
	}else if($min>0 && $min<10){
		$min="0".$min;
	}
	
	if($hr==8){
		$hr="08";
	}
	
	if($hr==9){
		$hr="09";
	}

	if ($events[$i]==null) {
		if($min=="30"){
			echo "<tr><td >".$hr.":".$min."</td><td id=".$Year."/".$m."/".$day.'|'.$hr.':'.$min." class='event'><div class='appt3' style='width:400px;'>".$rest."</div>"."</td></tr>";
		}else{
           echo "<tr><td >".$hr.":".$min."</td><td id=".$Year."/".$m."/".$day.'|'.$hr.':'.$min." class='event'><div style='width:400px;'></div>"."</td></tr>";
		}
	}
	else{
		if($subName == (explode(' - ',$events[$i]))[2]){
			echo "<tr><td >".$hr.":".$min."  |  #".$turnNumber."</td><td id=".$Year."/".$m."/".$day.'|'.$hr.':'.$min." class='eventadded'><div class='appt2' style='width:400px;'>".$events[$i]."</div>"."</td></tr>";
		}else{
            echo "<tr><td >".$hr.":".$min."  |  #".$turnNumber."</td><td id=".$Year."/".$m."/".$day.'|'.$hr.':'.$min." class='eventadded'><div class='appt' style='width:400px;'>".explode(' - ',$events[$i])[0]." - ".explode(' - ',$events[$i])[1]."</div>"."</td></tr>";
		}
		$turnNumber+=1;
}

	$min+=$duration;
	if ($min==60) {
		$min=0;
		$hr++;
	}

}

?>