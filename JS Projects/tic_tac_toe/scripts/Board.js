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
        for (let col = 0; col < this.boardSize; col++) {
            const sequence = [];
            for (let row = 0; row < this.boardSize; row++) {
                sequence.push(this.board[row][col]);
            }

            if (Board.#sequenceSameCharacter(sequence, "X")) {
                return "X";
            } else if (Board.#sequenceSameCharacter(sequence, "O")) {
                return "O";
            }
            console.log("sequence:", sequence);
        }
        return false;
    }

    checkWinRow() {
        for (let row = 0; row < this.boardSize; row++) {
            const sequence = this.board[row];
            if (Board.#sequenceSameCharacter(sequence, "X")) {
                return "X";
            } else if (Board.#sequenceSameCharacter(sequence, "O")) {
                return "O";
            }
        }

        return false;
    }

    checkWinDiagonal() {
        for (let row = 0; row < this.boardSize; row++) {
            const sequence = [];
            for (let col = 0; col < this.boardSize; col++) {
                if (row === col) {
                    sequence.push(this.board[row][col]);
                }
            }

            if (Board.#sequenceSameCharacter(sequence, "X")) {
                return "X";
            } else if (Board.#sequenceSameCharacter(sequence, "O")) {
                return "O";
            }
        }
        return false;
    }

    // Helper method:
    static #sequenceSameCharacter(seq, char) {
        return seq.every((cell) => cell === char);
    }
}
