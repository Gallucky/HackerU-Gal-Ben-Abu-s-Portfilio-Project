import { Board } from "./Board.js";

const board = new Board(3);

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
