const containerDiv = document.querySelector(".container");
const squareOne = document.querySelector(".square-1");
const squareTwo = document.querySelector(".square-2");
const squareThree = document.querySelector(".square-3");
const squareFour = document.querySelector(".square-4");
const squareFive = document.querySelector(".square-5");
const squareSix = document.querySelector(".square-6");
const squareSeven = document.querySelector(".square-7");
const squareEight = document.querySelector(".square-8");
const squareNine = document.querySelector(".square-9");
const squares = document.querySelectorAll(".square");
const startBtn = document.getElementById("start-game");
const frm = document.querySelector(".start-form");

const resetBtnDiv = document.createElement('div');
resetBtnDiv.classList.add('reset-div')

const againBtn = document.createElement('button');
againBtn.classList.add('again-btn');
againBtn.setAttribute('type', 'button');
againBtn.textContent = "Play Again";
resetBtnDiv.appendChild(againBtn);

const resetBtn = document.createElement('button');
resetBtn.classList.add('reset-btn');
resetBtn.setAttribute('type', 'button');
resetBtn.textContent = "Reset";
resetBtnDiv.appendChild(resetBtn);


againBtn.addEventListener('click', () => {
    gameboard.resetBoard();
    currentPlayer = player1;
    clearBoardDivs();
    turn = 1;
    resetBtnDiv.remove();
})

resetBtn.addEventListener('click', () => {
    gameboard.resetBoard();
    currentPlayer = player1;
    clearBoardDivs();
    turn = 0;
    player1.resetScore();
    player2.resetScore();
    resetBtnDiv.remove();
    containerDiv.appendChild(frm);
})


playerOneInput = document.getElementById('player-1');
playerTwoInput = document.getElementById('player-2');

titleHead = document.querySelector(".title");



startBtn.addEventListener('click', (e) => {
    player1.updateName(playerOneInput.value);
    player2.updateName(playerTwoInput.value);
    frm.remove()
    turn = 1;
    titleHead.textContent = `Go ${currentPlayer.getName()} Player: ${currentPlayer.getTic()}`
});



// global variable to determine who's turn it is
let turn = 0;

const gameboard = (() => {
    // initialized the game board
    let board = [['','',''],['','',''],['','','']]

    const updateBoard = (i , j, player) => {
        // updates the board once a player moves
        // make sure to call checkWin() after this function is called
        board[i][j] = player;
        // return checkWin(player); maybe include this here
    };

    // returns the current state of the board
    const getBoard = () => board;

    // returns the board to initial state
    const resetBoard = () => board = [['','',''],['','',''],['','','']];

    return {updateBoard, getBoard, resetBoard};

})();


const player = (name, tic) => {
    // wins, loses, ties
    let score = [0, 0, 0]
    const getName = () => name;
    const updateName = (newName) => {
        name = newName;
    }
    const getTic = () => tic;

    const getScore = () => score;

    const addScore = (x) => {
        if (x === 1) ++score[0];
        else if (x === 0) ++score[1];
        else ++score[2];
    }

    const resetScore = () => {
        score = [0, 0, 0];
    }
    return {getName, updateName, getTic, getScore, addScore, resetScore};
}

initializeButtons();
const player1 = player("", "X");
const player2 = player("", "O");

let currentPlayer = player1;
let waitingPlayer = player2;




// Deterimines if there is a win
// invoke this function after ever gameboard.updateBoard
function checkWin(p) {
    let tempboard = gameboard.getBoard();
    // check row
    for (let i = 0; i < 3; i++) {
        if (tempboard[i][0] === p && tempboard[i][1] === p && tempboard[i][2] === p) {
            return true;
        }
    }
    // check column
    for (let j = 0; j < 3; j++) {
        if (tempboard[0][j] === p && tempboard[1][j] === p && tempboard[2][j] === p) {
            return true;
        }
    }
    // check diagonal
    if (tempboard[0][0] === p && tempboard[1][1] === p && tempboard[2][2] === p) {
        return true;
    }
    // check diagonal
    else if (tempboard[2][0] === p && tempboard[1][1] === p && tempboard[0][2] === p) {
        return true;
    }
    else return false;
}


function checkTie() {
    tempboard = gameboard.getBoard();
    if (tempboard[0].includes("") || tempboard[1].includes("") || tempboard[2].includes("")) {
        return false;
    }
    else return true;
}



function playMove(i, j) {
    gameboard.updateBoard(i, j, currentPlayer.getTic());
    if (checkWin(currentPlayer.getTic())) {
        winnerIs(currentPlayer);
    }
    else if (checkTie()){
        tieGame();
    }
    else {
        changeTurn();
    }
}


function winnerIs(player) {
    currentPlayer.addScore(1);
    waitingPlayer.addScore(0);
    titleHead.textContent = `The winner is ${player.getName()} Player: ` + turn
    // prevents further buttons from being pressed without resetting
    turn = 0;
    containerDiv.appendChild(resetBtnDiv);
}


function tieGame() {
    currentPlayer.addScore(5);
    waitingPlayer.addScore(5);
    titleHead.textContent = `The Game is a tie`
    turn = 0;
    containerDiv.appendChild(resetBtnDiv);
}


// changes the turn counter and the current player
function changeTurn() {
    if (turn === 1) {
        currentPlayer = player2
        waitingPlayer = player1
        turn = 2;
        titleHead.textContent = `Go ${currentPlayer.getName()} Player: ${currentPlayer.getTic()}`
    }
    else {
        currentPlayer = player1
        waitingPlayer = player2
        turn = 1;
        titleHead.textContent = `Go ${currentPlayer.getName()} Player: ${currentPlayer.getTic()}`
    } 
}


function initializeButtons() {
    squareOne.addEventListener('click', () => {
        if (squareOne.textContent !== '' || turn === 0) {
            return;
        }
        squareOne.textContent = currentPlayer.getTic();
        playMove(0, 0);
    });
    
    squareTwo.addEventListener('click', () => {
        if (squareTwo.textContent !== '' || turn === 0) {
            return;
        }
        squareTwo.textContent = currentPlayer.getTic();
        playMove(0, 1);
    });
    
    squareThree.addEventListener('click', () => {
        if (squareThree.textContent !== '' || turn === 0) {
            return;
        }
        squareThree.textContent = currentPlayer.getTic();
        playMove(0, 2);
    });
    
    squareFour.addEventListener('click', () => {
        if (squareFour.textContent !== '' || turn === 0) {
            return;
        }
        squareFour.textContent = currentPlayer.getTic();
        playMove(1, 0);
    });
    
    squareFive.addEventListener('click', () => {
        if (squareFive.textContent !== '' || turn === 0) {
            return;
        }
        squareFive.textContent = currentPlayer.getTic();
        playMove(1, 1);
    });
    
    squareSix.addEventListener('click', () => {
        if (squareSix.textContent !== '' || turn === 0) {
            return;
        }
        squareSix.textContent = currentPlayer.getTic();
        playMove(1, 2);
    });
    
    squareSeven.addEventListener('click', () => {
        if (squareSeven.textContent !== '' || turn === 0) {
            return;
        }
        squareSeven.textContent = currentPlayer.getTic();
        playMove(2, 0);
    });
    
    squareEight.addEventListener('click', () => {
        if (squareEight.textContent !== '' || turn === 0) {
            return;
        }
        squareEight.textContent = currentPlayer.getTic();
        playMove(2, 1);
    });
    
    squareNine.addEventListener('click', () => {
        if (squareNine.textContent !== '' || turn === 0) {
            return;
        }
        squareNine.textContent = currentPlayer.getTic();
        playMove(2, 2);
    });
}



function clearBoardDivs() {
    for (i = 0; i < 9; i++) {
        squares[i].textContent = "";
    }
    titleHead.textContent = `Go ${currentPlayer.getName()} Player: ${currentPlayer.getTic()}`
}