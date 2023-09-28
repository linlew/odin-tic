

const gameboard = () => {
    let board = [[0,0,0],[0,0,0],[0,0,0]]
    const updateBoard = (i , j, player) => board[i][j] = player;

    const getBoard = () => console.log(board);

    const resetBoard = () => board = [[0,0,0],[0,0,0],[0,0,0]];

    return {updateBoard, getBoard, resetBoard};

};

const myBoard = gameboard();

