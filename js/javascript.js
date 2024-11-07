let humanScore = 5;
let computerScore = 5;
let cpuPlay;
let humanPlay;



const roundCountdown = (player) => {
    let countdown = 3;
    let countdownInterval;
    clearInterval(countdownInterval);
    anySound('timer.mp3');
    cpuBox.textContent = countdown;
    upperText.textContent = '👀';
    if (humanScore == 1 && computerScore ==1) {
        upperText.textContent = '🙈';
    }
    if (humanScore == 1 || computerScore == 1) {
        upperText.style = "scale: 3";
    }

    countdownInterval = setInterval(() => {
        countdown--;
        if (countdown > 0) {
            cpuBox.textContent = countdown;
            anySound('timer.mp3');
        } else {
            clearInterval(countdownInterval);
            playRound(player);
        }
    }, 800);
}

const upperText = document.querySelector(".upperText");
const feed = document.querySelector(".feed");
feed.textContent = 'CHOOSE YOUR WEAPON!';

const humanBox = document.querySelector("#playerBox");
const cpuBox = document.querySelector("#cpuBox");

const cpuLives = document.querySelector("#cpu-lives");
const humanLives = document.querySelector("#player-lives");

const buttons = document.querySelectorAll(".option");

const restart = document.querySelector("#restart");

const playRound = (player) => {

    let cpu = getComputerChoice();
    cpuPlay = getName(cpuPlay);
    humanPlay = getName(player);
    cpuBox.textContent = getEmoji(cpu);
    // Check who wins
    upperText.style = "scale: 1"
    upperText.textContent = checkRoundWinner(cpu, player);
    
    checkGameWinner()

    buttons.forEach( button => {
        button.disabled = false;
    })

}

function checkGameWinner() {
    if (humanScore === 0) {
        upperText.textContent = 'GAME OVER :C';
        gameOverSound();
        restart.style = "display: block"
    } else if (computerScore === 0) {
        upperText.textContent = 'VICTORY!';
        victorySound();
        restart.style = "display: block"
    }
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
            humanBox.style = "background-color: #f2e7ab";
            cpuBox.style = "background-color: #f2e7ab";
            feed.textContent = `${humanPlay} TIES ${cpuPlay}`
            anySound('glug-a.mp3');
            return 'Tie!';

        case -2:
        case 1:
            --humanScore;
            updateScore(humanScore, humanLives);
            humanBox.style = "background-color: #ce7777";
            cpuBox.style = "background-color: #77ceab";
            feed.textContent = `${humanPlay} LOSES AGAINST ${cpuPlay}`
            anySound('wrong.mp3');
            return 'YOU LOST! ';

        default:
            --computerScore;
            updateScore(computerScore, cpuLives);
            humanBox.style = "background-color: #77ceab";
            cpuBox.style = "background-color: #ce7777";
            feed.textContent = `${humanPlay} BEATS ${cpuPlay}`
            anySound('correct.mp3');
            return 'YOU WON! ';
    }
}

const updateScore = (score, selector) => {
    let health;
    switch (score) {
        case 5:
            health = '●●●●●';
            selector.style = "color: white"
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
            selector.style = "color: #ce7777"
            health = '●○○○○';
            break;
        case 0:
            health = '○○○○○';
            break;
    }
    selector.textContent = health;
}

const resetScores = () => {
    if (humanScore === 0 || computerScore === 0) {
        humanScore = 5;
        computerScore = 5;
        updateScore(humanScore, humanLives);
        updateScore(computerScore, cpuLives);
    }
}

function startGame(player) {
    buttons.forEach( button => {
        button.disabled = true;
    })
    clearBoxes();
    humanBox.textContent = getEmoji(player);
    roundCountdown(player);
    resetScores();
    restart.style = "display: none"
}

document.getElementById("rock").onclick = function () { startGame(1) };
document.getElementById("paper").onclick = function () { startGame(2) };
document.getElementById("scissors").onclick = function () { startGame(3) };

document.getElementById("restart").onclick = function () {
    resetScores();
    anySound('rising-pops.mp3');
    feed.textContent = 'CHOOSE YOUR WEAPON!';
    upperText.textContent = "START";
    restart.style = "display: none"
    clearBoxes();
};

function clearBoxes() {
    cpuBox.textContent = '';
    cpuBox.style = "background-color: #272727";

    humanBox.textContent = '';
    humanBox.style = "background-color: #272727";
}

function playSound(sound) {
    let popSound = document.getElementById(sound);
    popSound.cloneNode(true).play();
}

function victorySound() {
    const victory = new Audio('./sounds/victory.mp3');
    victory.play();
}

function gameOverSound() {
    const gameOver = new Audio('./sounds/lose.mp3');
    gameOver.play();
}

function anySound(filename) {
    const anySound = new Audio(`./sounds/${filename}`);
    anySound.play();
}

