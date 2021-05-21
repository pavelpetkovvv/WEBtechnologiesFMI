<?php  
require 'config.php';


$name=	$_POST['name'];
$fn =   $_POST['fn'];
$year=	$_POST['year'];
$month=	$_POST['month'];
$day=	$_POST['day'];
$time=	$_POST['time'];
$sub=	$_POST['subject'];


try{
$SQL_Cal_Table=
"
CREATE TABLE IF NOT EXISTS `eventcalendar`
(
num int AUTO_INCREMENT PRIMARY KEY,
name varchar(255),
fn varchar(255),
year varchar(255),
month varchar(255),
day varchar(255),
time varchar(255),
sub varchar(255) NOT NULL,
locked INT DEFAULT 1
)
";
$SqlTable=$con->query($SQL_Cal_Table);

$sql_insert=
"
	 insert into `eventcalendar` (name,fn,year,month,day,time,sub)
	 values ('".$name."','".$fn."','".$year."','".$month."','".$day."','".$time."','".$sub."')
";

	
$SqlAddTable=$con->exec($sql_insert);

echo "Successfully Added";
}catch(PDOException $error) {
        echo $error->getMessage();
}

?>
