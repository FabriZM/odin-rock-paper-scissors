let humanScore = 5;
let computerScore = 5;
let cpuPlay;
let humanPlay;


const whoWins = document.querySelector(".victory");
const feed = document.querySelector(".feed");
feed.textContent = 'CHOOSE YOUR WEAPON!';

const humanSel = document.querySelector("#playerBox");
const cpuSel = document.querySelector("#cpuBox");

const cpuLives = document.querySelector("#cpu-lives");
const humanLives = document.querySelector("#player-lives");

const playRound = (player) => {

    let cpu = getComputerChoice();
    cpuPlay = getName(cpuPlay);
    humanPlay = getName(player);
    humanSel.textContent = getEmoji(player);
    cpuSel.textContent = getEmoji(cpu);
    // Check who wins
    whoWins.textContent = checkWinner(cpu, player);
    if (humanScore === 0) {
        whoWins.textContent = 'GAME OVER :C';
        gameOverSound();
    } else if (computerScore === 0) {
        whoWins.textContent = 'VICTORY!';
        victorySound();
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

function checkWinner(cpu, player) {
    // CPU win cases (3-2, 2-1, 1-3)@{1,-2} ; Player win cases (2-3, 1-2, 3-1)@{-1,2} ; tie {0}
    switch (cpu - player) {
        case 0:
            humanSel.style = "background-color: #f2e7ab";
            cpuSel.style = "background-color: #f2e7ab";
            feed.textContent = `${humanPlay} TIES ${cpuPlay}`
            return 'Tie!';

        case -2:
        case 1:
            --humanScore;
            updateScore(humanScore, humanLives);
            humanSel.style = "background-color: #ce7777";
            cpuSel.style = "background-color: #77ceab";
            feed.textContent = `${humanPlay} LOSES AGAINST ${cpuPlay}`
            return 'Point for CPU! ';

        default:
            --computerScore;
            updateScore(computerScore, cpuLives);
            humanSel.style = "background-color: #77ceab";
            cpuSel.style = "background-color: #ce7777";
            feed.textContent = `${humanPlay} BEATS ${cpuPlay}`
            return 'Point for Player! ';
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

document.getElementById("rock").onclick = function () {
    resetScores();
    playRound(1);
};
document.getElementById("paper").onclick = function () {
    resetScores();
    playRound(2);
};
document.getElementById("scissors").onclick = function () {
    resetScores();
    playRound(3);
};

function PlaySound(sound) {
    let popSound = document.getElementById(sound);
    popSound.cloneNode(true).play();
}

function victorySound() {
    const victory = new Audio('./sounds/boop.mp3');
    victory.play();
}

function gameOverSound() {
    const gameOver = new Audio('./sounds/disable-sound.mp3');
    gameOver.play();
}