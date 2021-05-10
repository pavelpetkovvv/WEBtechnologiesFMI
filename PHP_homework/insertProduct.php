<?php
    require_once("./db.php");

    function addProduct(string $productName, int $quantity){
       try {

            $db = new DB();
            $connection = $db->getConnection();

            $sql = "INSERT into products (id, nameOfProduct, quantity) values (DEFAULT, '$productName', $quantity)";

            $stmt = $connection->prepare($sql);
            $stmt->execute();


        } catch (PDOException $e) {
            echo $e->getMessage();
        }
    }

?>