<?php
    $post_var = $_POST;
    
    require_once("./db.php");

    function fetchJSON($date, $time){
       try {

            $db = new DB();
            $connection = $db->getConnection();


            $sql = "SELECT date, time, presentationName, fn, presentorName, topic from reserveddates WHERE date=? && time=?";

            $stmt = $connection->prepare($sql);
            $stmt->execute([$date, $time]);


            if($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                echo(json_encode($row));
            }

        } catch (PDOException $e) {
            echo $e->getMessage();
        }
    }

    $dateAndTime = explode("-", $post_var['id']);

    fetchJSON("$dateAndTime[0]-$dateAndTime[1]-$dateAndTime[2]", "$dateAndTime[3]:$dateAndTime[4]");

?>