export class Board {
    #board;
    #boardSize;
    #player;

    /**
     * Initializes a new board for the Tic Tac Toe game.
     *
     * @param {number} boardSize - The size of the board, defaults to 3.
     *                             The board size is constrained between 3 and 16.
     *                             If a value less than 3 is provided, it defaults to 3.
     *                             If a value greater than 16 is provided, it defaults to 16.
     */
    constructor(boardSize = 3) {
        if (boardSize < 3) {
            boardSize = 3;
        } else if (boardSize > 16) {
            boardSize = 16;
        }

        this.#board = [];
        for (let i = 0; i < boardSize; i++) {
            this.#board[i] = new Array(boardSize).fill("");
        }
        this.#boardSize = boardSize;
        // The starting player plays as 'X'.
        this.#player = "X";
    }

    checkWinColumn() {
        for (let col = 0; col < this.#boardSize; col++) {
            const sequence = [];
            for (let row = 0; row < this.#boardSize; row++) {
                sequence.push(this.#board[row][col]);
            }

            if (Board.#sequenceSameCharacter(sequence, "X")) {
                return "X";
            } else if (Board.#sequenceSameCharacter(sequence, "O")) {
                return "O";
            }
        }
        return false;
    }

    checkWinRow() {
        for (let row = 0; row < this.#boardSize; row++) {
            const sequence = this.#board[row];
            if (Board.#sequenceSameCharacter(sequence, "X")) {
                return "X";
            } else if (Board.#sequenceSameCharacter(sequence, "O")) {
                return "O";
            }
        }

        return false;
    }

    checkWinDiagonal() {
        const sequence = [];
        for (let row = 0, col = 0; row < this.#boardSize && col < this.#boardSize; row++, col++) {
            sequence.push(this.#board[row][col]);
        }
        if (sequence.length !== this.#boardSize) {
            console.error("sequence is not the same length as boardSize.");
            return false;
        }

        if (Board.#sequenceSameCharacter(sequence, "X")) {
            return "X";
        } else if (Board.#sequenceSameCharacter(sequence, "O")) {
            return "O";
        }
        return false;
    }

    checkWinReverseDiagonal() {
        const sequence = [];
        for (
            let row = 0, col = this.#boardSize - 1;
            row < this.#boardSize && col >= 0;
            row++, col--
        ) {
            sequence.push(this.#board[row][col]);
        }

        if (sequence.length !== this.#boardSize) {
            console.error("sequence is not the same length as boardSize.");
            return false;
        }

        if (Board.#sequenceSameCharacter(sequence, "X")) {
            return "X";
        } else if (Board.#sequenceSameCharacter(sequence, "O")) {
            return "O";
        }

        return false;
    }

    /**
     * Checks if there is a win in the board.
     *
     * It checks all the possible ways to win, and if none of them are true, and the board is full, it returns "Draw".
     * @returns {String|Boolean} "X", "O", or "Draw" indicating the winner, or `false` if there is no winner yet.
     */
    checkWin() {
        const columnWin = this.checkWinColumn();
        const rowWin = this.checkWinRow();
        const diagonalWin = this.checkWinDiagonal();
        const reverseDiagonalWin = this.checkWinReverseDiagonal();
        const boardIsFull = this.#board.every((row) => row.every((cell) => cell !== ""));

        // Checking whether if there is a draw/tie.
        if (boardIsFull && !columnWin && !rowWin && !diagonalWin && !reverseDiagonalWin) {
            return "Draw";
        }

        return columnWin || rowWin || diagonalWin || reverseDiagonalWin;
    }

    makeMove(row, col) {
        if (this.#board[row][col] === "") {
            this.#board[row][col] = this.#player;

            // Switching the turn to the next player.
            this.#player = this.#player === "X" ? "O" : "X";

            console.log("Board:", this.#board);
            return true;
        }

        console.warn("%cThis cell is already taken. Please select another cell.", "color:yellow");

        return false;
    }

    getBoard() {
        return this.#board;
    }

    getBoardSize() {
        return this.#boardSize;
    }

    getPlayer() {
        return this.#player;
    }

    // Helper method:
    static #sequenceSameCharacter(seq, char) {
        return seq.every((cell) => cell === char);
    }
}
