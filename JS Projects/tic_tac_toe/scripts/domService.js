import { Board } from "./Board.js";

export const drawBoard = (board) => {
    const boardDiv = document.getElementById("board");
    const boardCells = [];

    board.getBoard().forEach((row, rowIndex) => {
        const rowDiv = document.createElement("div");
        rowDiv.classList.add("row");
        const rowCells = [];

        row.forEach((cell, cellIndex) => {
            const boardSize = board.getBoardSize();
            const cellDiv = document.createElement("div");
            cellDiv.classList.add("cell");

            const topLeftCell = rowIndex === 0 && cellIndex === 0;
            const topRightCell = rowIndex === 0 && cellIndex === boardSize;
            const bottomLeftCell = rowIndex === boardSize && cellIndex === 0;
            const bottomRightCell = rowIndex === boardSize && cellIndex === boardSize;

            const firstRow = rowIndex === 0 && cellIndex > 0 && cellIndex < boardSize;
            const lastRow = rowIndex === boardSize && cellIndex > 0 && cellIndex < boardSize;
            const firstColumn = rowIndex > 0 && rowIndex < boardSize && cellIndex === 0;
            const lastColumn = rowIndex > 0 && rowIndex < boardSize && cellIndex === boardSize;

            // Check if the cell is at one of the corners of the board.
            // Check if the cell is in the first row, last row,
            // first column or last column of the board.

            if (topLeftCell) {
                cellDiv.classList.add("top-left");
            } else if (topRightCell) {
                cellDiv.classList.add("top-right");
            } else if (bottomLeftCell) {
                cellDiv.classList.add("bottom-left");
            } else if (bottomRightCell) {
                cellDiv.classList.add("bottom-right");
            } else if (firstRow) {
                cellDiv.classList.add("in-first-row");
            } else if (lastRow) {
                cellDiv.classList.add("in-last-row");
            } else if (firstColumn) {
                cellDiv.classList.add("in-first-column");
            } else if (lastColumn) {
                cellDiv.classList.add("in-last-column");
            }

            rowDiv.appendChild(cellDiv);
            rowCells.push(cellDiv);
        });

        boardDiv.appendChild(rowDiv);
        boardCells.push(rowCells);
    });

    return boardCells;
};

export const addOnCellElementClickLogic = (boardCellsElements, board) => {
    boardCellsElements.forEach((row, rowIndex) => {
        row.forEach((cell, cellIndex) => {
            cell.addEventListener("click", () => {
                const boardState = board.checkWin();

                // If the game is still in progress.
                if (!boardState) {
                    const currentPlayer = board.getPlayer().toLowerCase();
                    const res = board.makeMove(rowIndex, cellIndex);
                    // If the move was valid then...
                    if (res) {
                        cell.classList.add(`cell-taken-by-${currentPlayer}`);
                        console.log("move successful - ", `cell-taken-by-${currentPlayer}`);
                    }
                } else {
                }
            });
        });
    });
};

export const gameOverEventListener = (result, board) => {
    const event = new CustomEvent("GameOver", {
        detail: {
            res: result,
            board: board,
            winOccurred: result === "X" || result === "O",
        },
    });
    document.dispatchEvent(event);
};

/**
 * Draws a winning line on the board.
 *
 * It takes in the board cells elements, the board, and the player who won as arguments.
 * It first converts the board cells elements into a matrix, then checks if the player won by
 * column, row, diagonal, or reverse diagonal.
 *
 * By checking in which way the player has won,
 * it creates a line according to the winning cells positions.
 *
 * @param {HTMLCollection} boardCellsElements The collection of cell elements.
 * @param {Board} board The board.
 * @param {String} player The player who won.
 */
export const drawWinningLine = (boardCellsElements, board, player) => {
    console.log(board);
    console.log(typeof board);

    const boardCellsElementsMatrix = convertBoardCellsElementsToMatrix(
        boardCellsElements,
        board.getBoardSize()
    );

    console.log("Board Matrix\n", boardCellsElementsMatrix);

    const winByColumn = board.checkWinColumn();
    const winByRow = board.checkWinRow();
    const winByDiagonal = board.checkWinDiagonal();
    const winByReverseDiagonal = board.checkWinReverseDiagonal();

    const cellElement = document.querySelector(".cell");
    console.log("Width:", cellElement.clientWidth, "Height:", cellElement.clientHeight);

    const winningLine = document.createElement("div");

    if (winByColumn) {
        console.log("Player", player, "won by column", winByColumn);
    } else if (winByRow) {
        console.log("Player", player, "won by row", winByRow);
    } else if (winByDiagonal) {
        console.log("Player", player, "won by diagonal", winByDiagonal);
    } else if (winByReverseDiagonal) {
        console.log("Player", player, "won by reverse diagonal", winByReverseDiagonal);
    }
};

/**
 * Converts a collection of cell elements into a matrix.
 *
 * The function takes in a collection of cell elements and the size of the board as arguments.
 * It converts the collection into a matrix and returns it.
 *
 * @param {HTMLCollection} boardCellsElements The collection of cell elements.
 * @param {Number} boardSize The size of the board.
 * @return {Array<Array>} The matrix (array that contains arrays) of cell elements.
 */
const convertBoardCellsElementsToMatrix = (boardCellsElements, boardSize) => {
    const boardCellsElementsArray = Array.from(boardCellsElements);

    // Creating and returning the matrix.
    const customMatrixObject = boardCellsElementsArray.reduce(
        (acc, cell) => {
            // Firstly push the cell into the acc.array.
            // To insure that the final cells will be pushed as an array into the matrix.
            acc.array.push(cell);

            if (acc.array.length === boardSize) {
                acc.matrix.push(acc.array);
                acc.array = [];
            }

            return acc;
        },
        // Initial acc values.
        {
            matrix: [],
            array: [],
        }
    );

    // Returning only the matrix.
    return customMatrixObject.matrix;
};
