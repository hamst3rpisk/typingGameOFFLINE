/*OBJECTS*/
const playbutton = document.querySelector("#playbutton"); /* Main Play button */
const rainY = document.querySelector("#rain"); /*Y Axis rain anim */
const rainX = document.querySelector("#rainside"); /*X Axis rain anim */
const title = document.querySelector("#main"); /* main title text */
const maingamediv = document.querySelector("#maingamediv");
const scorediv = document.querySelector("#scorediv");
const scorep = document.querySelector("#score");
const textDisplayed = document.querySelector("#textDisplayed");
const writeField = document.querySelector("#writeField");
const timep = document.querySelector("#time");
const wpmp = document.querySelector("#wpm");
const endgamep = document.querySelector("#endgame");
const letterSlider = document.querySelector("#letterSlider");
const wordSlider = document.querySelector("#wordSlider");
const mainDiv = document.querySelector("#mainDiv");
const settingDiv = document.querySelector("#settingDiv");
const selectedWords = document.querySelector("#selectedWords");
const selectedLetters = document.querySelector("#selectedLetters");
const endgamediv = document.querySelector("#endgamediv");
const endgamescoretext = document.querySelector("#endgamescoretext");
const endgamewpmtext = document.querySelector("#endgamewpmtext");
const endgamewordstext = document.querySelector("#endgamewordstext");
const backtomainbutton = document.querySelector("#backtomainbutton");
const leaderboardDiv = document.querySelector("#leaderboardDiv");
let score = 0;
let wordsWritten = 0;
let wpm = 0;
let timeInterval;
/*EVENT LISTENERS*/
playbutton.addEventListener("click",startgame);
writeField.addEventListener("input",checkText);
backtomainbutton.addEventListener("click", e => {
    location.reload();
});

/*FUNCTIONS*/

let numOfWords = 1;
let text2Display = "";
let letterString = "";
// async function apiRandomWords(url) {
//     text2Display="";
//     const result = await fetch (url)
//     json = await result.json();
//     for (let i=0;i<numOfWords;i++) {
//         text2Display += json[i] + " ";
//     }
//     textDisplayed.innerHTML = text2Display;
// }

wordSlider.addEventListener("change", e => {
    selectedWords.innerHTML = wordSlider.value;
});
letterSlider.addEventListener("change", e => {
    if (letterSlider.value == 1) selectedLetters.innerHTML = "Random";
    else selectedLetters.innerHTML = letterSlider.value;
});

let bestScoreP = document.querySelector("#bestScore");
let bestWpmP = document.querySelector("#bestWpm");
let bestWordsWrittenP = document.querySelector("#bestWordsWritten");
fetch("getBest.php")
    .then (response => response.json())
    .then (data=> {
        bestScoreP.innerText = "Best score: " + data[0];
        bestWpmP.innerText = "Best WPM (Words Per Minute): " + data[1];
        bestWordsWrittenP.innerText = "Most words written at once: " + data[2];
    });

let url = "";
function fetchDatabaseData() {
    console.log("fetching from db...");
    if (letterSlider.value != 1) {
        letterString = "&length=" + letterSlider.value;
    }
    
    //get the data to php with fetch
    const playData = new FormData();
    playData.append("numWords",wordSlider.value);
    playData.append("numLetters",letterSlider.value);
    playData.append("startGame","true");
    fetch("logic.php", {
        method: "POST",
        body: playData
    })
    .then(response => response.text())
    .then(data => {
        data = data.trim();
        if (data == false) falseDataPopUp();
        textDisplayed.innerHTML = data;
        console.log(data + "- your data");

    })
}
function startgame() {
    fetchDatabaseData();
    //url = "https://random-word-api.herokuapp.com/word?number="+numOfWords+letterString;
    maingamediv.classList.remove("hidden");
    scorediv.classList.remove("hidden");
    endgamep.classList.remove("hidden");
    title.style.animation="fadeAway 1s";
    rainX.classList.add("hidden");
    rainY.classList.add("hidden");
    leaderboardDiv.classList.add("hidden");
    maingamediv.style.animation="fadeInto 1s";
    playbutton.style.animation="fadeAway 1s";
    maingamediv.style.animation="fadeInto 1s";
    scorediv.style.animation="fadeIntoNoBG 1s";
    endgamep.style.animation="fadeIntoNoBG 1s";

    setTimeout(function() {
        settingDiv.classList.add("hidden");
        title.classList.add("hidden");
        rainX.classList.add("hidden");
        rainY.classList.add("hidden");
        playbutton.classList.add("hidden");
        playbutton.disabled="true";
        maingamediv.style.opacity="100%";
        scorediv.style.opacity="100%";
        endgamep.style.opacity="100%";
        
    }, 1000);

    let startTypingInterval = setInterval(() => {
        document.onkeydown = function (e) {
                startTime();
                document.onkeydown = null;
                clearInterval(startTypingInterval);
            }
        
    },10);

    writeField.focus();
    //apiRandomWords(url);

    //END GAME
    document.addEventListener("keydown", e => {
        if (e.key == "Escape") {
            endGame();
        } 
    })
}
function falseDataPopUp() {
    clearInterval(timeInterval);
    maingamediv.style.display="none";
    scorediv.style.display="none";
    endgamep.style.display="none";
    endgamediv.classList.remove("hidden");
    endgamescoretext.innerText = "The mysql query failed... try different options";
    endgamewpmtext.innerHTML = "";
    endgamewordstext.innerHTML = "";
    endgamediv.style.animation="fadeIntoNoBG 1s";
    setTimeout(() => {
        endgamediv.style.animation="";
        endgamediv.style.opacity="100%";
    },1000);
}
function endGame() {
    clearInterval(timeInterval);
    maingamediv.style.display="none";
    scorediv.style.display="none";
    endgamep.style.display="none";
    endgamediv.classList.remove("hidden");
    if (score < 50) endgamescoretext.style.textShadow = "0 0 6px red";
    else if (score < 100) endgamescoretext.style.textShadow = "0 0 8px yellow"
    else if (score < 250) endgamescoretext.style.textShadow = "0 0 10px green";
    else {
        endgamescoretext.style.textShadow = "0 0 15px gold";
        endgamescoretext.style.color="gold";
    }
    endgamescoretext.innerHTML = "Score: " + score;
    if (wpm < 20) endgamewpmtext.style.textShadow = "0 0 6px red";
    else if (wpm < 40) endgamewpmtext.style.textShadow = "0 0 8px yellow";
    else if (wpm < 60) endgamewpmtext.style.textShadow = "0 0 10px green";
    else  {
        endgamewpmtext.style.textShadow = "0 0 15px gold";
        endgamewpmtext.style.color="gold";
    }
    endgamewpmtext.innerHTML = "Words per Minute: " + wpmp.innerHTML;
    if (wordsWritten < 5) endgamewordstext.style.textShadow="0 0 6px red";
    else if (wordsWritten < 10) endgamewordstext.style.textShadow="0 0 8px yellow";
    else if (wordsWritten < 25) endgamewordstext.style.textShadow="0 0 10px green";
    else  {
        endgamewordstext.style.textShadow="0 0 15px gold";
        endgamewordstext.style.color="gold";
    }
    endgamewordstext.innerHTML = "Words written: " + wordsWritten;
    endgamediv.style.animation="fadeIntoNoBG 1s";
    setTimeout(() => {
        endgamediv.style.animation="";
        endgamediv.style.opacity="100%";
    },1000);
    const endData = new FormData();
    endData.append("score",score);
    endData.append("wpm",wpm);
    endData.append("wordsWritten",wordsWritten);
    endData.append("endGame",true);
    fetch("leaderboard.php", {
        method: "POST",
        body: endData
    })
    .then(response => response.text())
    .then(data => {
        //nothing rn
    });
}
function startTime() {
    let dateStart = Date.now();
    timeInterval = setInterval(() => {
        let secondsPassed = (Date.now() - dateStart)/1000;
        timep.innerHTML = Math.floor(secondsPassed/3600) + "h:" + Math.floor(secondsPassed/60)%60 + "m:" + Math.floor(secondsPassed%60)+"s";
        wpmp.innerHTML = Math.round(wordsWritten / (secondsPassed/60)) + "wpm";
        wpm = Math.round(wordsWritten / (secondsPassed/60));
    },10);
}

function checkText() {
    let writeText = writeField.textContent;
    let displayedText = textDisplayed.innerHTML;
    let writeTextLength = writeText.length;
    let writtenWords = writeText.split(" ");
    let toWriteWords = displayedText.split(" ");
    if (writtenWords[0] == toWriteWords[0]) {
        wordsWritten++;

        writtenWords.shift();
        toWriteWords.shift();
        textDisplayed.innerHTML = toWriteWords.join(" ");
        writeField.textContent = "";
    }
    if (writeText.substring(0,writeTextLength).trim() != displayedText.substring(0,writeTextLength).trim() && writeText != displayedText) {
        //writeField.style.color="rgb(239, 31, 69)"
        writeField.style.textShadow="0 0 10px red";
    }
    else if (writeText.trim() == displayedText.trim() && writeText.length != 0) {
        writeField.style.textShadow="0 0 3px #FFFF";
        if (letterSlider.value == 1) score += parseInt(wordSlider.value) * Math.floor(Math.random() * (10) + 1);
        else score += parseInt(wordSlider.value) * parseInt(letterSlider.value);
        scorep.innerHTML = "Score: " + score;
        writeField.innerHTML = "";
        fetchDatabaseData();
    }
    else {
        writeField.style.color="white";
        writeField.style.textShadow="0 0 3px #FFFF";
    }

}