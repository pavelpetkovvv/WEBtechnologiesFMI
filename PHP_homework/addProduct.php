<?php
    require_once("./db.php");

    function addProduct(string $productName, int $quantity){
       try {

            $db = new DB();
            $connection = $db->getConnection();

            $sql = "SELECT * from products where nameOfProduct=?";

            $stmt = $connection->prepare($sql);
            $stmt->execute([$productName]);

            $row = $stmt->fetch(PDO::FETCH_ASSOC);

            if($row){
                $sql = "UPDATE products SET quantity=? WHERE nameOfProduct=?";

                $stmt = $connection->prepare($sql);
                $quantity = $quantity + $row['quantity'];
                $stmt->execute([$quantity, "$productName"]);

             }else{
                $sql = "INSERT into products (id, nameOfProduct, quantity) values (DEFAULT, '$productName', $quantity)";

                $stmt = $connection->prepare($sql);
                $stmt->execute();
            }


        } catch (PDOException $e) {
            echo $e->getMessage();
        }
    }
?>