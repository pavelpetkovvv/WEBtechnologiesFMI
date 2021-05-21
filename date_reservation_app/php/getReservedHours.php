<?php
    require_once("./db.php");

    function fetchJSON(){
       try {

            $db = new DB();
            $connection = $db->getConnection();


            $sql = "SELECT * from reserveddates";

            $stmt = $connection->prepare($sql);
            $stmt->execute();

            $flag=0;

            while($row = $stmt->fetch(PDO::FETCH_ASSOC)){
                $data_array[]=$row;
                $flag=1;
            }

            if($flag)
            echo(json_encode($data_array));
            

        } catch (PDOException $e) {
            echo $e->getMessage();
        }
    }

    fetchJSON();
?>