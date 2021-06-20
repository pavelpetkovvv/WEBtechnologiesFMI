<?php
    $post_var = $_POST;

    require_once("./db.php");

    function reserveDate($presentationName, $fn,  $presentorName, $topic, $date, $time, $password){
       try {

            $db = new DB();
            $connection = $db->getConnection();

            $sql = "SELECT password from reserveddates WHERE date=? && time=?";

            $stmt = $connection->prepare($sql);
            $stmt->execute([$date, $time]);

            if($row = $stmt->fetch(PDO::FETCH_ASSOC)){
                if($row["password"] != $password)
                    echo "incorrect password";
                else{

                    $sql = "UPDATE reserveddates SET presentationName='$presentationName', fn='$fn', presentorName='$presentorName', topic='$topic' WHERE date=? && time=?";

                    $stmt = $connection->prepare($sql);
                    $stmt->execute([$date, $time]);
                    

                    $sql = "SELECT * from reserveddates WHERE date=? && time=?";

                    $stmt = $connection->prepare($sql);
                    $stmt->execute([$date, $time]);
        
                    if($row = $stmt->fetch(PDO::FETCH_ASSOC)){
                    echo(json_encode($row));
                    }
                }
        }
            

        } catch (PDOException $e) {
            echo $e->getMessage();
        }
    }

    $dateAndTime = explode("-", $post_var['id']);

    reserveDate($post_var['presentationName'], $post_var['fn'], $post_var['presentorName'], $post_var['topic'],
     "$dateAndTime[0]-$dateAndTime[1]-$dateAndTime[2]", "$dateAndTime[3]:$dateAndTime[4]", $post_var['password']);

?>