import { Board } from "./Board.js";
import {
    drawBoard,
    addOnCellElementClickLogic,
    drawWinningLine,
    canvasResizer,
} from "./domService.js";

const board = new Board(13);

const test1 = () => {
    console.log(board);
    console.log(board.board);
    board.board = [
        ["", "", "O"],
        ["", "O", ""],
        ["O", "", ""],
    ];
    console.log(board.board[0]);
    console.log(board.board[1]);
    console.log(board.board[2]);
    console.log("column win:", board.checkWinColumn());
    console.log("row win:", board.checkWinRow());
    console.log("diagonal win:", board.checkWinDiagonal());
    console.log("reverse diagonal win:", board.checkWinReverseDiagonal());

    console.log("check win:", board.checkWin());
};

const test2 = () => {
    console.log(board);
    console.log(board.makeMove("X", 0, 0));
    console.log(board);
    console.log(board.makeMove("O", 0, 0));
    console.log(board);
    console.log(board.makeMove("X", 0, 0));
    console.log(board);
};

// Listening for window resize.
window.addEventListener("resize", canvasResizer);
// Initializing the canvas.
canvasResizer();

// Starting the listening for game over event.
document.addEventListener("GameOver", (e) => {
    if (e.detail.winOccurred) {
        const cellElements = document.getElementById("board").querySelectorAll(".cell");
        drawWinningLine(cellElements, e.detail.board);
    }
});

const boardCellsElements = drawBoard(board);
addOnCellElementClickLogic(boardCellsElements, board);
