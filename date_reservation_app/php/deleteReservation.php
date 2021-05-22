<?php
    $post_var = $_POST;

    require_once("./db.php");

    function reserveDate($date, $time, $password){
       try {

            $db = new DB();
            $connection = $db->getConnection();

            $sql = "SELECT * from reserveddates WHERE date=? && time=?";

            $stmt = $connection->prepare($sql);
            $stmt->execute([$date, $time]);

            if($row = $stmt->fetch(PDO::FETCH_ASSOC)){
                if($row['password'] == $password){
                    $sql = "DELETE from reserveddates WHERE date=? && time=?";

                    $stmt = $connection->prepare($sql);
                    $stmt->execute([$date, $time]);

                    echo "reservation deleted";
                }else{
                    echo "incorrect password";
                }
            }else{
                echo "error";
            }
            
        } catch (PDOException $e) {
            echo $e->getMessage();
        }
    }

    $dateAndTime = explode("-", $post_var['id']);

    reserveDate("$dateAndTime[0]-$dateAndTime[1]-$dateAndTime[2]", "$dateAndTime[3]:$dateAndTime[4]", $post_var['password']);

?>