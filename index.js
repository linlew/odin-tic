class Move 
{ 
    constructor() 
    { 
        let row,col; 
    } 
} 




const containerDiv = document.querySelector(".container");
const squares = document.querySelectorAll(".square");
const startBtn = document.getElementById("start-game");
const frm = document.querySelector(".start-form");

const resetBtnDiv = document.createElement('div');
resetBtnDiv.classList.add('reset-div')


const resetBtn = document.createElement('button');
resetBtn.classList.add('reset-btn');
resetBtn.setAttribute('type', 'button');
resetBtn.textContent = "Quit";
resetBtnDiv.appendChild(resetBtn);

const againBtn = document.createElement('button');
againBtn.classList.add('again-btn');
againBtn.setAttribute('type', 'button');
againBtn.textContent = "Play Again";
resetBtnDiv.appendChild(againBtn);


againBtn.addEventListener('click', () => {
    gameboard.resetBoard();
    currentPlayer = player1;
    clearBoardDivs();
    turn = 1;
    resetBtnDiv.remove();
    if (currentPlayer.getName() === '') {
        currentPlayer.aiMove();
    }
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
    if (currentPlayer.getName() === '') {
        currentPlayer.aiMove();
    }
});





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

    const initializeButtons = () => {
        let x = 0;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3 ; j++) {
                let currentSquare = squares[x];
                currentSquare.addEventListener('click', () => {
                    if (currentSquare.textContent !== '' || turn === 0) {
                        return;
                    }
                    playMove(i , j);
                });
                x++;
            }
        }
    };

    const populateBoard = () => {
        let x = 0;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3 ; j++) {
                let currentSquare = squares[x];
                let currentBoard = gameboard.getBoard();
                currentSquare.textContent = currentBoard[i][j];
                x++;
                }
            }
    }


    return {updateBoard, getBoard, resetBoard, initializeButtons, populateBoard};

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
    const aiMove = () => {
        let smartMove = findBestMove(gameboard.getBoard());
        playMove(smartMove.row, smartMove.col)
    }

    return {getName, updateName, getTic, getScore, addScore, resetScore, aiMove};
}

// global variable to determine who's turn it is
let turn = 0;

gameboard.initializeButtons();

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
    gameboard.populateBoard();
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


    if (currentPlayer.getName() === '') {
        currentPlayer.aiMove();
    }
}


function clearBoardDivs() {
    for (i = 0; i < 9; i++) {
        squares[i].textContent = "";
    }
    titleHead.textContent = `Go ${currentPlayer.getName()} Player: ${currentPlayer.getTic()}`
}


function isMovesLeft(b) 
{ 
    for(let i = 0; i < 3; i++) 
        for(let j = 0; j < 3; j++) 
            if (b[i][j] == '') 
                return true; 
                  
    return false; 
} 


function evaluate(b, depth) {
    // Checking for row victory
    for (let row = 0; row < 3; row++) 
    { 
        if (b[row][0] == b[row][1] && 
            b[row][1] == b[row][2]) 
        { 
            if (b[row][0] == currentPlayer.getTic()) 
                return +10 - depth; 
                  
            else if (b[row][0] == waitingPlayer.getTic()) 
                return -10 + depth; 
        } 
    } 

    // Checking for column victory
    for(let col = 0; col < 3; col++) 
    { 
        if (b[0][col] == b[1][col] && 
            b[1][col] == b[2][col]) 
        { 
            if (b[0][col] == currentPlayer.getTic()) 
                return +10 - depth; 
    
            else if (b[0][col] == waitingPlayer.getTic()) 
                return -10 + depth; 
        } 
    } 

    // Checking for Diagonals for X or O victory. 
    if (b[0][0] == b[1][1] && b[1][1] == b[2][2]) 
    { 
        if (b[0][0] == currentPlayer.getTic()) 
            return +10 - depth; 
                
        else if (b[0][0] == waitingPlayer.getTic()) 
            return -10 + depth; 
    } 
    
    if (b[0][2] == b[1][1] &&  
        b[1][1] == b[2][0]) 
    { 
        if (b[0][2] == currentPlayer.getTic()) 
            return +10 - depth; 
                
        else if (b[0][2] == waitingPlayer.getTic()) 
            return -10 + depth; 
    } 
    
    // Else if none of them have 
    // won then return 0 
    return 0; 
} 


function minimax(board, depth, isMax) 
{ 
    let score = evaluate(board, depth); 
   
    // If Maximizer has won the game 
    // return his/her evaluated score 
    if (score > 0) 
        return score; 
   
    // If Minimizer has won the game 
    // return his/her evaluated score 
    if (score < 0) 
        return score; 
   
    // If there are no more moves and 
    // no winner then it is a tie 
    if (isMovesLeft(board) == false) 
        return 0; 
   
    // If this maximizer's move 
    if (isMax) 
    { 
        let best = -1000; 
   
        // Traverse all cells 
        for(let i = 0; i < 3; i++) 
        { 
            for(let j = 0; j < 3; j++) 
            { 
                  
                // Check if cell is empty 
                if (board[i][j]== '') 
                { 
                      
                    // Make the move 
                    board[i][j] = currentPlayer.getTic(); 
   
                    // Call minimax recursively  
                    // and choose the maximum value 
                    best = Math.max(best, minimax(board, 
                                    depth + 1, !isMax)); 
   
                    // Undo the move 
                    board[i][j] = ''; 
                } 
            } 
        } 
        return best; 
    } 
   
    // If this minimizer's move 
    else
    { 
        let best = 1000; 
   
        // Traverse all cells 
        for(let i = 0; i < 3; i++) 
        { 
            for(let j = 0; j < 3; j++) 
            { 
                  
                // Check if cell is empty 
                if (board[i][j] == '') 
                { 
                      
                    // Make the move 
                    board[i][j] = waitingPlayer.getTic(); 
   
                    // Call minimax recursively and  
                    // choose the minimum value 
                    best = Math.min(best, minimax(board, 
                                    depth + 1, !isMax)); 
   
                    // Undo the move 
                    board[i][j] = ''; 
                } 
            } 
        } 
        return best; 
    } 
} 

function findBestMove(board) 
{ 
    let bestVal = -1000; 
    let bestMove = new Move(); 
    bestMove.row = -1; 
    bestMove.col = -1; 
   
    // Traverse all cells, evaluate  
    // minimax function for all empty  
    // cells. And return the cell 
    // with optimal value. 
    for(let i = 0; i < 3; i++) 
    { 
        for(let j = 0; j < 3; j++) 
        { 
              
            // Check if cell is empty 
            if (board[i][j] == '') 
            { 
                  
                // Make the move 
                board[i][j] = currentPlayer.getTic(); 
   
                // compute evaluation function  
                // for this move. 
                let moveVal = minimax(board, 0, false); 
   
                // Undo the move 
                board[i][j] = ''; 
   
                // If the value of the current move  
                // is more than the best value, then  
                // update best 
                if (moveVal > bestVal) 
                { 
                    bestMove.row = i; 
                    bestMove.col = j; 
                    bestVal = moveVal; 
                } 
            } 
        } 
    } 
   
    return bestMove; 
} 