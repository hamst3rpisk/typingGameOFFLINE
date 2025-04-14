<?php
    $connection = mysqli_connect("localhost","root","","typinggame");
?>
<?php
    $query = "SELECT MAX(score),MAX(wpm),MAX(wordsWritten) FROM leaderboard;";
    if ($connection) {
        $result = mysqli_query($connection,$query);
        if ($result) {
            $row = mysqli_fetch_row($result);
            $maxScore = $row[0];
            $maxWpm = $row[1];
            $maxWordsWritten = $row[2];
            $leaderboard = [
                $maxScore,
                $maxWpm,
                $maxWordsWritten
            ];
            header("Content-Type: application/json");
            echo json_encode($leaderboard);
        }
    }   
?>

<?php
    mysqli_close($connection);
?>