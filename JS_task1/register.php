<?php
//$str_json = file_get_contents('php://input');
echo $_POST['username'];
$data = json_decode($_POST["json"]);
var_dump($data);
echo "hello world";
?>
