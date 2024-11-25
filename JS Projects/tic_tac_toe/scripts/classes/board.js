// Board Class.
class Board {
    constructor(boardSize) {
        this.boardSize = boardSize;
        this.board = [];
        this.htmlElementsBoard = [];

        for (let i = 0; i < boardSize; i++) {
            const line = [];
            for (let j = 0; j < boardSize; j++) {
                line.push(" ");
            }
            this.board.push(line);
        }

        this.createVisualBoard();
    }

    log() {
        this.board.forEach((line) => console.log(line));
    }

    createVisualBoard() {
        document.body.style.display = "flex";
        document.body.style.alignContent = "center";
        document.body.style.justifyContent = "center";

        const mainDiv = document.createElement("div");
        mainDiv.classList.add(".board");

        mainDiv.style.width = "50vw";
        mainDiv.style.height = "auto";

        mainDiv.style.display = "flex";
        mainDiv.style.alignContent = "center";
        mainDiv.style.justifyContent = "center";
        mainDiv.style.flexDirection = "column";

        // mainDiv.style.border = "3px groove black";
        mainDiv.style.marginBlock = "10px";

        for (let i = 0; i < this.boardSize; i++) {
            const boardElementsLine = [];
            const boardLine = document.createElement(`div`);
            boardLine.id = `bl-${i}`;
            boardLine.classList.add(".boardLine");

            boardLine.style.width = "100%";
            boardLine.style.height = "1fr";

            boardLine.style.display = "flex";
            boardLine.style.alignContent = "center";
            boardLine.style.justifyContent = "center";

            for (let j = 0; j < this.boardSize; j++) {
                const boardCell = document.createElement(`div`);
                boardCell.id = `bc-${i}${j}`;
                boardCell.classList.add(".boardCell");

                boardCell.style.width = "1fr";
                boardCell.style.height = "1fr";

                boardCell.style.display = "flex";
                boardCell.style.alignContent = "center";
                boardCell.style.justifyContent = "center";
                boardCell.style.border = "1px solid black";
                boardCell.style.padding = "15px";

                const iconImage = document.createElement("img.icon");
                const iconImageSize = "150px";
                iconImage.style.width = iconImageSize;
                iconImage.style.height = iconImageSize;
                iconImage.style.alt = "A cell's icon of an X or an O or it is empty/translucent";
                iconImage.style.border = "1px dotted red";

                boardCell.appendChild(iconImage);
                boardLine.appendChild(boardCell);
                boardElementsLine.push(boardCell);
            }
            mainDiv.appendChild(boardLine);
            this.htmlElementsBoard.push(boardElementsLine);
        }

        document.body.appendChild(mainDiv);
        console.log("TEST");

        this.bordersRebrand();
    }

    bordersRebrand() {
        const boardBorderThickness = "3px";
        const boardBorderStyle = "groove";
        const boardBorderColor = "black";
        const boardBorder = `${boardBorderThickness} ${boardBorderStyle} ${boardBorderColor}`;

        for (let row = 0; row < this.htmlElementsBoard.length; row++) {
            for (let col = 0; col < this.htmlElementsBoard[row].length; col++) {
                const cellElement = document.getElementById(`bc-${row}${col}`);

                if (cellElement) {
                    // Ensure the element exists
                    cellElement.style.border = boardBorder; // Set the full border

                    if (col !== 0 && col !== this.boardSize - 1) {
                        cellElement.style.border = "none";
                        cellElement.style.borderRight = boardBorder;
                    }

                    if (col === 0) {
                        cellElement.style.borderLeft = "none";
                    } else if (col === this.boardSize - 1) {
                        cellElement.style.borderRight = "none";
                        cellElement.style.borderLeft = "none";
                    }

                    if (row === 0) {
                        cellElement.style.borderTop = "none";
                        cellElement.style.borderBottom = "none";
                    } else if (row === this.boardSize - 1) {
                        cellElement.style.borderTop = boardBorder;
                        cellElement.style.borderBottom = "none";
                    } else {
                        cellElement.style.borderTop = boardBorder;
                        cellElement.style.borderBottom = "none";
                    }
                }
            }
        }
    }
}
