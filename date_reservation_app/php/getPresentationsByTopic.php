<?php
    $post_var = $_POST;
    
    require_once("./db.php");

    function fetchJSON($topic){
       try {

            $db = new DB();
            $connection = $db->getConnection();


            $sql = "SELECT date, time from reserveddates WHERE topic=?";

            $stmt = $connection->prepare($sql);
            $stmt->execute([$topic]);

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

    fetchJSON($post_var['topic']);
?>