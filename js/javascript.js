let humanScore = 0;
let computerScore = 0;

function getComputerChoice() {
    let play = Math.floor(Math.random() * 3 + 1);
    return play;
}

function getHumanChoice() {
    let play = prompt('1.Rock 2.Paper 3.Scissors!', '');

    if (parseInt(play) <= 3 || parseInt(play) > 0) {
        output = parseInt(play)
    } else {
        switch (play.toLowerCase()) {
            case 'rock':
                output = 1;
                break;

            case 'paper':
                output = 2;
                break;

            case 'scissors':
                output = 3;
                break;

            default:
                alert('Wrong input. Choose between Rock, Paper, Scissors.');
                output = getHumanChoice();
                break;
        }
    }

    return output;
}

function getPlayName(play) {
    let output;
    switch (play) {
        case 1:
            output = 'Rock';
            break;

        case 2:
            output = 'Paper';
            break;

        default:
            output = 'Scissors';
            break;
    }
    return output;
}

function checkWinner(cpu, player) {
    let result = cpu - player;
    // CPU win cases (3-2, 2-1, 1-3)@{1,-2} ; Player win cases (2-3, 1-2, 3-1)@{-1,2} ; tie {0}
    switch (result) {
        case 0:
            return 'Tie!'

        case -2:
        case 1:
            computerScore++;
            return 'Point for CPU! ';

        default:
            humanScore++;
            return 'Point for Player! ';
    }
}

function playGame() {
    for (let i = 0; i < 5; i++) {
        playRound(i);
    }
    if (humanScore > computerScore) {
        alert('YOU WIN! :D');
    } else if (computerScore > humanScore) {
        alert('You lost :c');
    } else {
        alert('The game ended in a draw! :I')
    }

    resetScores();
}

const resetScores = () => {
    humanScore = 0;
    computerScore = 0;
}

const playRound = (i) => {
    let player = getHumanChoice();
    let cpu = getComputerChoice();
    alert(`Round ${i + 1} | Computer chose ${getPlayName(cpu)}! ; Player chose ${getPlayName(player)}!`);
    // Check who wins
    console.log(checkWinner(cpu, player));
    alert(`Player: ${humanScore} | CPU: ${computerScore}`);
}
