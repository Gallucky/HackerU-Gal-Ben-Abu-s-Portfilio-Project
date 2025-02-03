import { Board } from "./Board.js";
import { drawBoard } from "./domService.js";

const board = new Board(5);

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

drawBoard(board);
