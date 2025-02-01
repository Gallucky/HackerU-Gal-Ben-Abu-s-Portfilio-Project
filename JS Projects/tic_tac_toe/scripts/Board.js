export class Board {
    board;
    boardSize;

    constructor(boardSize) {
        this.board = [];
        for (let i = 0; i < boardSize; i++) {
            this.board[i] = new Array(boardSize).fill("");
        }
        this.boardSize = boardSize;
    }

    checkWinColumn() {
        for (let i = 0; i < this.boardSize; i++) {
            for (let j = 0; j < this)
        }
    }
}
