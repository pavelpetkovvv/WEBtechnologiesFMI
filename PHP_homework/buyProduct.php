<?php
    require_once("./db.php");

    function buyProduct(int $productID){
       try {

            $db = new DB();
            $connection = $db->getConnection();

            $sql = "SELECT quantity from products where id=?";

            $stmt = $connection->prepare($sql);
            $stmt->execute([$productID]);

            $row = $stmt->fetch(PDO::FETCH_ASSOC);
            $quantity = $row["quantity"];
            if($quantity==0){
                return false;
            }
            $quantity-=1;

            $sql = "UPDATE products SET quantity=? WHERE id=?";

            $stmt = $connection->prepare($sql);
            $stmt->execute([$quantity, $productID]);

            return true;

        } catch (PDOException $e) {
            echo $e->getMessage();
        }
    }
?>