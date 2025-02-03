export class Board {
    #board;
    #boardSize;

    constructor(boardSize = 3) {
        this.#board = [];
        for (let i = 0; i < boardSize; i++) {
            this.#board[i] = new Array(boardSize).fill("");
        }
        this.#boardSize = boardSize;
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

    makeMove(player, row, col) {
        if (this.#board[row][col] === "") {
            this.#board[row][col] = player;
            return true;
        }
        return false;
    }

    getBoard() {
        return this.#board;
    }

    getBoardSize() {
        return this.#boardSize;
    }

    // Helper method:
    static #sequenceSameCharacter(seq, char) {
        return seq.every((cell) => cell === char);
    }
}
