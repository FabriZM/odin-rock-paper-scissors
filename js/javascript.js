let playerScore = 5;
let computerScore = 5;
let cpuPlay;
let playerPlay;

const upperText = document.querySelector(".upperText");
const feed = document.querySelector(".feed");
const playerBox = document.querySelector("#playerBox");
const cpuBox = document.querySelector("#cpuBox");
const cpuLives = document.querySelector("#cpu-lives");
const playerLives = document.querySelector("#player-lives");
const buttons = document.querySelectorAll(".option");
const restart = document.querySelector("#restart");

buttons.forEach(button => {
    button.addEventListener("mouseenter", () => {
        playSound('blop.mp3', 0.1);
    });
    button.addEventListener("click", (event) => {
        playSound('pop.mp3');
        startGame(parseInt(event.target.id));
    });
})

function startGame(player) {
    buttons.forEach(button => {
        button.disabled = true;
    })
    clearBoxes();
    restart.style = "display: none";
    if (playerScore === 0 || computerScore === 0) {
        resetScores();
    }
    playerBox.textContent = getEmoji(player);
    roundCountdown(player);
}

const roundCountdown = (player) => {
    let countdown = 3;
    let countdownInterval;
    clearInterval(countdownInterval);
    playSound('timer.mp3');
    cpuBox.textContent = countdown;
    upperText.textContent = '👀';

    if (playerScore == 1 && computerScore == 1) {
        upperText.textContent = '🙈';
    }
    if (playerScore == 1 || computerScore == 1) {
        upperText.style = "scale: 3";
    }

    countdownInterval = setInterval(() => {
        countdown--;
        if (countdown > 0) {
            cpuBox.textContent = countdown;
            playSound('timer.mp3');
        } else {
            clearInterval(countdownInterval);
            playRound(player);
        }
    }, 800);
}

const playRound = (player) => {
    let cpuNum = getComputerChoice();
    cpuPlay = getName(cpuPlay);

    playerPlay = getName(player);
    cpuBox.textContent = getEmoji(cpuNum);
    upperText.style = "scale: 1";
    upperText.textContent = checkRoundWinner(cpuNum, player);
    checkGameWinner();
    buttons.forEach(button => {
        button.disabled = false;
    })
}

function getComputerChoice() {
    cpuPlay = Math.floor(Math.random() * 3 + 1);
    return cpuPlay;
}

function getName(play) {
    switch (play) {
        case 1:
            return 'ROCK';

        case 2:
            return 'PAPER';

        case 3:
            return 'SCISSORS';
    }
}

function getEmoji(play) {
    switch (play) {
        case 1:
            return '🪨';

        case 2:
            return '🧻';

        case 3:
            return '✂️';
    }
}

function checkRoundWinner(cpu, player) {
    // CPU win cases (3-2, 2-1, 1-3)@{1,-2} ; Player win cases (2-3, 1-2, 3-1)@{-1,2} ; tie {0}
    switch (cpu - player) {
        case 0:
            playerBox.style = "background-color: #f2e7ab";
            cpuBox.style = "background-color: #f2e7ab";
            feed.textContent = `${playerPlay} TIES ${cpuPlay}`;
            playSound('glug-a.mp3');
            return 'Tie!';

        case -2:
        case 1:
            --playerScore;
            updateScore(playerScore, playerLives);
            playerBox.style = "background-color: #ce7777";
            cpuBox.style = "background-color: #77ceab";
            feed.textContent = `${playerPlay} LOSES AGAINST ${cpuPlay}`;
            playSound('wrong.mp3');
            return 'YOU LOST! ';

        default:
            --computerScore;
            updateScore(computerScore, cpuLives);
            playerBox.style = "background-color: #77ceab";
            cpuBox.style = "background-color: #ce7777";
            feed.textContent = `${playerPlay} BEATS ${cpuPlay}`;
            playSound('correct.mp3');
            return 'YOU WON! ';
    }
}

function checkGameWinner() {
    if (playerScore === 0) {
        upperText.textContent = 'GAME OVER :C';
        playSound('lose.mp3');
        restart.style = "display: block";
    } else if (computerScore === 0) {
        upperText.textContent = 'VICTORY!';
        playSound('victory.mp3');
        restart.style = "display: block";
    }
}

const updateScore = (score, selector) => {
    let health;
    switch (score) {
        case 5:
            health = '●●●●●';
            selector.style = "color: white";
            break;
        case 4:
            health = '●●●●○';
            break;
        case 3:
            health = '●●●○○';
            break;
        case 2:
            health = '●●○○○';
            break;
        case 1:
            selector.style = "color: #ce7777";
            health = '●○○○○';
            break;
        case 0:
            health = '○○○○○';
            break;
    }
    selector.textContent = health;
}

document.getElementById("restart").onclick = function () {
    playSound('rising-pops.mp3');
    resetScores();
    clearBoxes();
    feed.textContent = 'CHOOSE YOUR WEAPON!';
    upperText.textContent = "START";
    restart.style = "display: none";
};

const resetScores = () => {
    playerScore = 5;
    computerScore = 5;
    updateScore(playerScore, playerLives);
    updateScore(computerScore, cpuLives);
}

function clearBoxes() {
    cpuBox.textContent = '';
    cpuBox.style = "background-color: #272727";

    playerBox.textContent = '';
    playerBox.style = "background-color: #272727";
}

function playSound(filename, volume = 1) {
    const sound = new Audio(`./sounds/${filename}`);
    sound.volume = volume;
    sound.play();
}


