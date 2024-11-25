// The main logic.

// The tic tac toe board is an array of strings.
// Currently the borders visuals are fully supported from 1-11,
// 1 is just right border.
// From 12 onwards there might be overlapping.
const board = new Board(13);

// Different ways to print the board.
console.log(board);
board.log();
