<?php
    require_once("./db.php");

    function fetchJSON(){
       try {

            $db = new DB();
            $connection = $db->getConnection();


            $sql = "SELECT * from presentationdates";

            $stmt = $connection->prepare($sql);
            $stmt->execute();


            while($row = $stmt->fetch(PDO::FETCH_ASSOC)){
                $data_array[]=$row;
            }

            echo(json_encode($data_array));
            

        } catch (PDOException $e) {
            echo $e->getMessage();
        }
    }

    fetchJSON();
?>