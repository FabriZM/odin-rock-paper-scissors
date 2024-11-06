let humanScore = 5;
let computerScore = 5;

const whoWins = document.querySelector(".victory");
const infoText = document.querySelector(".result");
infoText.textContent = 'ROCK BEATS SCISSORS!';

const humanSel = document.querySelector("#playerBox");
const cpuSel = document.querySelector("#cpuBox");

const cpuLives = document.querySelector("#cpu-lives");
const humanLives = document.querySelector("#player-lives");

const playRound = (humanPlay) => {

    let cpu = getComputerChoice();
    humanSel.textContent = getEmoji(humanPlay);
    cpuSel.textContent = getEmoji(cpu);
    // Check who wins
    whoWins.textContent = checkWinner(cpu, humanPlay);
    if (humanScore === 0) {
        whoWins.textContent = 'GAME OVER :C';
        gameOverSound();
    } else if (computerScore === 0) {
        whoWins.textContent = 'VICTORY!';
        victorySound();
    }

}

function getComputerChoice() {
    let play = Math.floor(Math.random() * 3 + 1);
    return play;
}

function getName(play) {
    switch (play) {
        case 1:
            return 'Rock';

        case 2:
            return 'Paper';

        case 3:
            return 'Scissors';
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
            humanSel.style = "background-color: #f2e7ab"
            cpuSel.style = "background-color: #f2e7ab"
            return 'Tie!'

        case -2:
        case 1:
            --humanScore;
            updateScore(humanScore, humanLives);
            humanSel.style = "background-color: #ce7777"
            cpuSel.style = "background-color: #77ceab"
            return 'Point for CPU! ';

        default:
            --computerScore;
            updateScore(computerScore, cpuLives);
            humanSel.style = "background-color: #77ceab"
            cpuSel.style = "background-color: #ce7777"
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