<!DOCTYPE html>
<html>
    <head>
        <title>My notes</title>
    </head>
    <body>
        <header>
            <h1>Моите бележки</h1>
        </header>
        <form  action="handler.php" method="POST">
            <fieldset style="display: inline-block; background-color: rgb(120, 197, 207)">
                <legend>Name</legend>
                <label>Име на бележка</label>
                <br>
                <input id="noteName" name="noteName" type="text" minlength="1", maxlength="25">
                <br>
                <br>

                <label>Дата</label>
                <br>
                <input type="date">
                <br>
                <br>

                <label>Описание</label>
                <br>
                <textarea name="description" rows="10" cols="20"></textarea>
                <br>
                <br>

                <label>Приоритет</label>
                <br>
                <select>
                    <option>Висок</option>
                    <option>Среден</option>
                    <option>Нисък</option>
                </select>
                <br>
                <br>

                <button>Запиши</button>
            </fieldset>
        </form>

        <fieldset style="display: inline-block; background-color: rgb(221, 204, 255)">
        
        <?php
            echo "<fieldset>";
            echo $_POST["noteName"];
            echo "<br>";
            echo $_POST["description"];
            echo "</fieldset>";
        ?>

</fieldset>
    </body>
</html>