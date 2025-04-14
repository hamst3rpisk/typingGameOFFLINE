<?php
    ini_set('display_errors',0);
    $connection = @mysqli_connect("localhost","root","","typinggame");
    if (!$connection) echo false;
    else {
        if (isset($_POST['startGame']) && $_POST['startGame'] == "true") {
            startGame();
        }
    }
    function startGame() {
        global $connection;
        $displayedText = "";
        if ($_SERVER['REQUEST_METHOD'] == "POST") {
            if (isset($_POST['numWords']) && isset($_POST['numLetters'])) {
                $numWords = (int) $_POST['numWords'];
                $numLetters = (int) $_POST['numLetters'];
                if ($numLetters == 1) $query = "SELECT word FROM words ORDER BY RAND() LIMIT $numWords";
                else $query = "SELECT word FROM words WHERE CHAR_LENGTH(word) = $numLetters ORDER BY RAND() LIMIT $numWords";
                $result = mysqli_query($connection,$query);
                if (mysqli_num_rows($result) == 0 || !$result) {
                    echo false;
                }
                else {
                    while ($row = mysqli_fetch_row($result)) {
                        $displayedText .= "$row[0] ";
                    }
                    $displayedText = rtrim($displayedText);
                    echo $displayedText;
                }
            }
        }
    }
?>

<?php
    if ($connection) mysqli_close($connection);
?>