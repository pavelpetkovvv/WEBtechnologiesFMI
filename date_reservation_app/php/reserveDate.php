<?php
    $post_var = $_POST;

    require_once("./db.php");

    function reserveDate($presentationName, $fn,  $presentorName, $topic, $date, $time){
       try {

            $db = new DB();
            $connection = $db->getConnection();

            $sql = "SELECT * from reserveddates WHERE date=? && time=?";

            $stmt = $connection->prepare($sql);
            $stmt->execute([$date, $time]);

            if($row = $stmt->fetch(PDO::FETCH_ASSOC)){
                echo 'reserved';
            }else{

            $sql = "INSERT INTO reserveddates(presentationName, fn, presentorName, topic, date, time) values (?, ?, ?, ?, ?, ?)";

            $stmt = $connection->prepare($sql);
            $stmt->execute([$presentationName, $fn, $presentorName, $topic, $date, $time]);

            $sql = "SELECT * from reserveddates WHERE date=? && time=?";

            $stmt = $connection->prepare($sql);
            $stmt->execute([$date, $time]);

            if($row = $stmt->fetch(PDO::FETCH_ASSOC)){
            echo(json_encode($row));
            }
        }
            

        } catch (PDOException $e) {
            echo $e->getMessage();
        }
    }

    $dateAndTime = explode("-", $post_var['id']);

    reserveDate($post_var['presentationName'], $post_var['fn'], $post_var['presentorName'], $post_var['topic'],
     "$dateAndTime[0]-$dateAndTime[1]-$dateAndTime[2]", "$dateAndTime[3]:$dateAndTime[4]");

?>