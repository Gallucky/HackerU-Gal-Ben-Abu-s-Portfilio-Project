// Global Functions.

const createBoard = (boardSize) => {
    return createLogicBoard();
};

const createLogicBoard = (boardSize) => {
    const boardTemplate = [];

    for (let i = 0; i < boardSize; i++) {
        const line = [];
        for (let j = 0; j < boardSize; j++) {
            line.push(" ");
        }
        boardTemplate.push(line);
    }

    // returns the board which is array of char arrays / matrix of chars.
    return boardTemplate;
};

const logBoard = (board) => {
    board.forEach((line) => console.log(line));
};
