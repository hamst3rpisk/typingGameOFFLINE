<?php
    $connection = mysqli_connect("localhost","root","","typinggame");
?>

<?php
    if (isset($_POST["endGame"]) && $_POST["endGame"] == true) {
        if (isset($_POST["score"]) && isset($_POST["wpm"]) && isset($_POST["wordsWritten"])) {
            $score = $_POST["score"];
            $wpm = $_POST["wpm"];
            $wordsWritten = $_POST["wordsWritten"];
            $query = "INSERT INTO leaderboard(score,wpm,wordsWritten) VALUES ($score,$wpm,$wordsWritten);";
            $result = mysqli_query($connection,$query);
            echo $result;
        }

    }
    

?>

<?php
    mysqli_close($connection);
?>