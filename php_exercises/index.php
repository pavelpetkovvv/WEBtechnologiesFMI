<?php

require_once "./student.php";

session_start();

    if (!isset($_SESSION["name"]) && isset($_GET["name"])) {
        $_SESSION["name"] = $_GET["name"];
        $name = $_SESSION["name"];
        echo "<h1>$name</h1>";
    } else if (isset($_SESSION["name"])) {
        $name = $_SESSION["name"];
        echo "<h1>Hello again $name</h1>";
    } else {
        echo "<h1>Who are you?</h1>";
    }

    if (isset($_GET["name"])) {
        setcookie("name", $_GET["name"], time() + 600);
    }

    echo $_SESSION["name"];

    $student = new Student("pavel", 22, 62302);

    var_dump($student);

?>