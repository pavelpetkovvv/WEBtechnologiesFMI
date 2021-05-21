<?php
require 'config.php';
require 'getvar.php';

$name=	$_POST['name'];

$time=	$_POST['time'];


try{

$SQLsel = "SELECT locked FROM eventcalendar
WHERE name = '$name' AND time = '$time'
";

$sel = $con->prepare($SQLsel);
$sel->execute();
$value = $sel->fetchColumn();

if($value != 1){
$SQLdel="
DELETE FROM eventcalendar
WHERE name = '$name' AND time = '$time'
";

$del = $con->query($SQLdel);
echo "Event Successfully Deleted";
}else{
	echo "You don't permision to delete this event!";
}
}catch(PDOException $error) {
        echo $error->getMessage();
}

?>