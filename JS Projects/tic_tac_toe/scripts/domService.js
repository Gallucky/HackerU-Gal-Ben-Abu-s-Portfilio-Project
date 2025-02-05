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

export const gameOverEventListener = (result) => {
    const event = new CustomEvent("GameOver", { detail: result });
    document.dispatchEvent(event);
};
