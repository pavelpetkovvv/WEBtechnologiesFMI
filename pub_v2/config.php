<?php  
$servername= "localhost";
$username= "root";
$password= "";
$dbname = "university";

$duration=6; //10
$startHr=8;
$startMin=0;
$turnNumber=1;
$rest="Break time -> stretch your legs";


try{
$con= new PDO("mysql:host=$servername;dbname=$dbname", $username, $password,
            array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));
			
					
//$sqlDB="CREATE DATABASE IF NOT EXISTS cal;";

//$createDB=$con->query($sqlDB);

$con= new PDO("mysql:host=$servername;dbname=$dbname", $username, $password,
            array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));
			
}catch(PDOException $error) {
        echo $error->getMessage();
}


?>