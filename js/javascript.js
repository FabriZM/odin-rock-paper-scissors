let humanScore = 5;
let computerScore = 5;

const whoWins = document.querySelector(".victory");
const infoText = document.querySelector(".result");
infoText.textContent = 'ROCK BEATS SCISSORS!';

const humanSel = document.querySelector("#playerBt");
const cpuSel = document.querySelector("#cpuBt");

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
    } else if (computerScore === 0) {
        whoWins.textContent = 'VICTORY!';
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
            return 'Tie!'

        case -2:
        case 1:
            --humanScore;
            updateScore(humanScore, humanLives);
            return 'Point for CPU! ';

        default:
            --computerScore;
            updateScore(computerScore, cpuLives);
            return 'Point for Player! ';
    }
}

const updateScore = (score, selector) => {
    let lives;
    switch (score) {
        case 5:
            lives = '●●●●●';
            break;
        case 4:
            lives = '●●●●○';
            break;
        case 3:
            lives = '●●●○○';
            break;
        case 2:
            lives = '●●○○○';
            break;
        case 1:
            lives = '●○○○○';
            break;
        case 0:
            lives = '○○○○○';
            break;
    }
    selector.textContent = lives;
}

const resetScores = () => {
    if (humanScore === 0 || computerScore === 0 ) {
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
