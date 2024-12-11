// Changing the URL without reloading
// history.pushState(null, "", "/Gal_Ben_Abu's_Portfolio/JS_Projects/Oren's_Math_Game/index.html");

const resetToStartingScreen = () => {
    // Selects the first element with the class "game-container".
    const gameContainer = document.querySelector(".game-container");

    // Resetting the contents of the game-container back into its
    // default state - Starting Screen.
    gameContainer.innerHTML = `
        <h1>Oren's Math Game</h1>

            <h2>Welcome to Oren's Math Game where you can play and test your math skills.</h2>

            <div class="game-configuration">
                <h3>Game Configuration</h3>
                <div class="difficulty-section">
                    <label for="difficulty" id="difficulty-label"> Difficulty: </label>
                    <select class="difficulty easy-difficulty" name="difficulty" id="difficulty">
                        <option class="easy-difficulty" value="easy">Easy 😊</option>
                        <option class="medium-difficulty" value="medium">Medium 🤘</option>
                        <option class="hard-difficulty" value="hard">Hard 🔥</option>
                        <option class="extreme-difficulty" value="extreme">Extreme 🚒</option>
                    </select>
                </div>
                <div class="operator-selection-section">
                    <label for="operator-selection" id="operator-selection-label">
                        Operator(s):
                    </label>
                    <select name="operator-selection" id="operator-selection">
                        <option value="add">Addition ( + )</option>
                        <option value="subtraction">Subtraction ( - )</option>
                        <option value="multiplication">Multiplication ( × )</option>
                        <option value="division">Division ( ÷ )</option>
                        <option value="random">Random [+,-,×,÷]</option>
                    </select>
                </div>
            </div>

            <button class="start-game-button" onclick="startGame()">Start Game</button>
    `;
};

// Resetting to the Starting Screen.
resetToStartingScreen();

const generateQuestion = (difficulty, operator) => {
    let rangeStart = 1;
    let rangeEnd = 10;
    switch (difficulty) {
        case "easy":
            rangeEnd = 10;
            break;
        case "medium":
            rangeEnd = 100;
            break;
        case "hard" || "extreme":
            rangeEnd = 1000;
            break;
        default:
            break;
    }

    let chosenOperator = operator;

    if (operator === "random") {
        const supportedOperators = ["+", "-", "×", "÷"];

        // Generating a random index between 0 to 3 to select the operator.
        const chosenOperatorIndex = Math.floor(Math.random() * 4);

        // Selecting the operator based on the index.
        chosenOperator = supportedOperators[chosenOperatorIndex];

        console.log(`Generated random operator: ${chosenOperator}`);
    } else if (operator === "division") {
        chosenOperator = "÷";
    } else if (operator === "multiplication") {
        chosenOperator = "×";
    } else if (operator === "subtraction") {
        chosenOperator = "-";
    } else if (operator === "add") {
        chosenOperator = "+";
    }

    // Generating the numbers.
    // The *random number + rangeStart (1)* is to make sure the number is
    // not 0 to prevent division by zero.
    const firstNumber = Math.floor(Math.random() * rangeEnd) + rangeStart;
    const secondNumber = Math.floor(Math.random() * rangeEnd) + rangeStart;

    const question = `${firstNumber} ${chosenOperator} ${secondNumber} = ?`;

    return question;
};

const calculateAnswer = (question) => {
    const questionSplitted = question.split(" ");
    const firstNumber = +questionSplitted[0];
    const operator = questionSplitted[1];
    const secondNumber = +questionSplitted[2];

    let result = 0;

    switch (operator) {
        case "+":
            return firstNumber + secondNumber;
        case "-":
            return firstNumber - secondNumber;
        case "×":
            return firstNumber * secondNumber;
        case "÷":
            // Making sure the result is accurate up to the nearest 2 digits after the decimal point.
            result = (firstNumber / secondNumber).toFixed(2);
        default:
            break;
    }

    return +result;
};

const gameConfiguration = {};
const maxNumberOfQuestions = 10;

let gameDifficulty;
let gameOperatorSelection;

let currentQuestionNumber = 1;
let correctAnswers = 0;
let currentQuestion = "";

const startGame = () => {
    const gameContainer = document.querySelector(".game-container");
    const difficulty = document.querySelector("#difficulty");
    const operatorSelection = document.querySelector("#operator-selection");

    console.log(`Difficulty Selected: ${difficulty.value}`);
    console.log(`Operator Selected: ${operatorSelection.value}`);

    gameContainer.innerHTML = `
        <div class="game-toolbar">
            <div class="tool-info-difficulty-level">
                <label for="difficulty" id="difficulty-label"> Difficulty: </label>
                <select class="difficulty" name="difficulty" id="difficulty">
                    <option class="easy-difficulty" value="easy">Easy 😊</option>
                    <option class="medium-difficulty" value="medium">Medium 🤘</option>
                    <option class="hard-difficulty" value="hard">Hard 🔥</option>
                    <option class="extreme-difficulty" value="extreme">Extreme 🚒</option>
                </select>
            </div>
            <div class="tool-info-operator">
                <label for="operator-selection" id="operator-selection-label">
                    Operator(s):
                </label>
                <select name="operator-selection" id="operator-selection">
                    <option value="add">Addition ( + )</option>
                    <option value="subtraction">Subtraction ( - )</option>
                    <option value="multiplication">Multiplication ( × )</option>
                    <option value="division">Division ( ÷ )</option>
                    <option value="random">Random [+,-,×,÷]</option>
                </select>
            </div>
            <div class="tool-info-number-of-questions">
                <label>Question: x / x</label>
            </div>
            <div class="tool-info-abort-game">
                <button onclick="abortGame()" id="abort-game-btn"><span>❌</span></button>
            </div>
        </div>
        <div class="game-body">
            <div class="question">X OPERATOR Y = ?</div>

            <div class="answer">
                <div class="answer-input">
                    <label for="answer-question">Answer:</label>
                    <!--  step="0.01" is to make sure the input is accurate up to the nearest 2 digits after the decimal point. -->
                    <input type="number" name="answer-question" id="answer" step="0.01" />
                </div>
                <button onclick="submitAnswer()" id="submit-answer">Submit</button>
            </div>
        </div>
        <div class="game-information">
            <table class="information-table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Question</th>
                        <th>Difficulty</th>
                        <th>Answer</th>
                        <th>Your Answer</th>
                        <th>Points Given</th>
                    </tr>
                </thead>
                <tbody id="answers-for-previous-questions">
                    <tr>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                    </tr>
                </tbody>
            </table>
        </div>
    `;

    // After updating the innerHTML where the game is displayed,
    // we need to update the difficulty and operator selection values
    // based on the user input.

    // Getting the updated elements
    gameDifficulty = document.querySelector("#difficulty");
    gameOperatorSelection = document.querySelector("#operator-selection");

    // Applying the user's input to the updated elements.
    gameDifficulty.value = difficulty.value;
    gameOperatorSelection.value = operatorSelection.value;

    // Updating the difficulty color based on the difficulty selected.
    switch (difficulty.value) {
        case "easy":
            gameDifficulty.classList.add("easy-difficulty");
            break;
        case "medium":
            gameDifficulty.classList.add("medium-difficulty");
            break;
        case "hard":
            gameDifficulty.classList.add("hard-difficulty");
            break;
        case "extreme":
            gameDifficulty.classList.add("extreme-difficulty");
            break;
    }

    // Game began.
    console.log("Game Started.");

    // Game configuration.
    console.log(`Difficulty Selected: ${gameDifficulty.value}`);
    console.log(`Operator Selected: ${gameOperatorSelection.value}`);

    // Saving configuration.
    gameConfiguration.difficulty = gameDifficulty.value;
    gameConfiguration.operatorSelection = gameOperatorSelection.value;

    // Setting up the flags that will be raised if the
    // configuration will be changed mid game.
    gameConfiguration.difficultyModified = false;
    gameConfiguration.operatorSelectionModified = false;

    // Updating the question number info.
    const questionNumberInfo = document.querySelector(".tool-info-number-of-questions");
    questionNumberInfo.innerHTML = `<label>Question: ${currentQuestionNumber} / ${maxNumberOfQuestions}</label>`;

    // First question will be generated.
    currentQuestion = generateQuestion(
        gameConfiguration.difficulty,
        gameConfiguration.operatorSelection
    );

    const answersTable = document.querySelector(".game-information > .information-table");
    answersTable.style.userSelect = "none";

    // Updating the question.
    const questionElement = document.querySelector(".question");
    questionElement.innerText = currentQuestion;

    // Calculating the answer.
    currentAnswer = calculateAnswer(currentQuestion);
    console.log(`Calculated Answer: ${currentAnswer}`);
};

const submitAnswer = () => {
    const answer = +document.querySelector("#answer").value;
    console.log(`User's Answer: ${answer}\nAnswer Type: ${typeof answer}`);

    const answerInputElement = document.querySelector(".answer-input > input");
    answerInputElement.disabled = true;
    let pointsGiven = 0;

    // Checking if the user's answer is correct.
    if (answer === currentAnswer) {
        console.log("Answer is correct.");
        answerInputElement.style.backgroundColor = "lightgreen";
        correctAnswers++;
        pointsGiven = 1;
    } else {
        console.log("Answer is incorrect.");
        answerInputElement.style.backgroundColor = "#ff474c";
    }

    console.log(`Current amount of correct answers: ${correctAnswers}`);

    // Saving question info to the answers table.
    const answersTableBody = document.getElementById("answers-for-previous-questions");
    const oldAnswersTableBodyInnerHTML = answersTableBody.innerHTML;

    const answersTable = document.querySelector(".game-information > .information-table");

    if (currentQuestionNumber === 1) {
        answersTableBody.innerHTML = `
                <tr>
                    <td>${currentQuestionNumber}</td>
                    <td>${currentQuestion}</td>
                    <td>${gameConfiguration.difficulty}</td>
                    <td>${currentAnswer}</td>
                    <td>${answer}</td>
                    <td>${pointsGiven}</td>
                </tr>
            `;
        answersTable.style.userSelect = "auto";
        console.log(`first question replaces the innerHTML of the answers table`);
    } else {
        answersTableBody.innerHTML =
            oldAnswersTableBodyInnerHTML +
            `
                <tr>
                    <td>${currentQuestionNumber}</td>
                    <td>${currentQuestion}</td>
                    <td>${gameConfiguration.difficulty}</td>
                    <td>${currentAnswer}</td>
                    <td>${answer}</td>
                    <td>${pointsGiven}</td>
                </tr>
            `;
    }

    // Preparing for the next question.
    const submitAnswer = document.querySelector("#submit-answer");
    submitAnswer.innerHTML = "Next Question ➡";
    currentQuestionNumber++;
    submitAnswer.onclick = () => nextQuestion(currentQuestionNumber);
};

const showSummaryScreen = () => {
    const gameContainer = document.querySelector(".game-container");

    gameContainer.innerHTML = `<h1>Game Summary</h1>`;
};

const nextQuestion = (questionNumber) => {
    console.log(`\nQuestion Number: ${questionNumber}`);

    // Updating the question number info.
    const questionNumberInfo = document.querySelector(".tool-info-number-of-questions");
    questionNumberInfo.innerText = `Question: ${currentQuestionNumber} / ${maxNumberOfQuestions}`;

    // Maybe migrate to event listener...
    if (gameConfiguration.difficulty !== gameDifficulty.value) {
        console.log(`
                Game configuration changed mid game.
                Updating game configuration to match user input.
                Difficulty: ${gameConfiguration.difficulty} ➡ ${gameDifficulty.value}
            `);

        // Updating the game configuration that was changed.
        gameConfiguration.difficulty = gameDifficulty.value;

        // Raising flag to indicate that the game configuration has changed.
        gameConfiguration.difficultyModified = true;
    }

    if (gameConfiguration.operatorSelection !== gameOperatorSelection.value) {
        console.log(`
                Game configuration changed mid game.
                Updating game configuration to match user input.
                Operator Selection: ${gameConfiguration.operatorSelection} ➡ ${gameOperatorSelection.value}
            `);

        // Updating the game configuration that was changed.
        gameConfiguration.operatorSelection = gameOperatorSelection.value;

        // Raising flag to indicate that the game configuration has changed.
        gameConfiguration.operatorSelectionModified = true;
    }

    // Checking if the max number of questions in the game has been reached.
    if (currentQuestionNumber > maxNumberOfQuestions) {
        // Applying changes to the submitAnswer button for the last question.
        const submitAnswerElement = document.querySelector("#submit-answer");
        submitAnswerElement.innerHTML = "View Results";
        submitAnswerElement.onclick = () => showSummaryScreen();

        // After the last question was answered / submitted,
        // removing the answer input field.
        const answerInputFieldElement = document.querySelector(".answer-input");
        answerInputFieldElement.remove();

        // Updating the question number info to be the same as the max number of questions.
        const questionNumberInfo = document.querySelector(".tool-info-number-of-questions");
        questionNumberInfo.innerText = `Question: ${maxNumberOfQuestions} / ${maxNumberOfQuestions}`;

        // Updating the question.
        const questionElement = document.querySelector(".question");
        questionElement.innerText = "The Game Has Ended";

        console.log("Game Ended.");
    } else {
        // Restoring the submitAnswer button to its default state.
        const submitAnswerElement = document.querySelector("#submit-answer");
        submitAnswerElement.innerHTML = "Submit";
        submitAnswerElement.onclick = () => submitAnswer();

        // Restoring the answer input field to its default state.
        const answerInputElement = document.querySelector(".answer-input > input");
        answerInputElement.style.backgroundColor = "lightblue";
        answerInputElement.value = "";
        answerInputElement.disabled = false;

        // Generating the next question.
        currentQuestion = generateQuestion(
            gameConfiguration.difficulty,
            gameConfiguration.operatorSelection
        );

        // Updating the question.
        const questionElement = document.querySelector(".question");
        questionElement.innerText = currentQuestion;

        // Calculating the answer.
        currentAnswer = calculateAnswer(currentQuestion);
        console.log(`Calculated Answer: ${currentAnswer}`);
    }
};

const abortGame = () => {
    // Before showing the confirmation dialog, the abort game button should be disabled.
    const abortGameButton = document.querySelector("#abort-game-btn");
    abortGameButton.disabled = true;

    // Catching the game container element.
    const gameContainer = document.querySelector(".game-container");

    // Creating a pop up confirmation dialog.
    const confirmationDialog = document.createElement("dialog");
    confirmationDialog.id = "abort-game-confirmation-dialog";

    confirmationDialog.style.width = "400px";
    confirmationDialog.style.height = "200px";
    confirmationDialog.popover = "auto";

    gameContainer.style.position = "relative";
    confirmationDialog.style.position = "absolute";
    confirmationDialog.style.top = "25%";
    confirmationDialog.style.left = "30%";

    confirmationDialog.style.zIndex = "1";
    confirmationDialog.style.backgroundColor = "rgba(255, 255, 255, 0.926)";

    confirmationDialog.style.borderRadius = "16px";
    confirmationDialog.style.border = "3px groove black";
    confirmationDialog.style.boxShadow = "0px 0px 10px 5px rgba(0, 0, 0, 0.5)";

    confirmationDialog.style.display = "flex";
    confirmationDialog.style.flexDirection = "column-reverse";
    confirmationDialog.style.alignContent = "center";
    confirmationDialog.style.justifyContent = "center";
    confirmationDialog.style.gap = "20px";

    const confirmationTitle = document.createElement("h2");
    confirmationTitle.id = "abort-game-confirmation-title";
    confirmationTitle.innerHTML = `Abort Game?<br>Your progress will <strong>not</strong> be saved.`;

    const confirmationButtons = document.createElement("div");
    confirmationButtons.id = "abort-game-confirmation-buttons";

    confirmationButtons.style.display = "flex";
    confirmationButtons.style.alignContent = "center";
    confirmationButtons.style.justifyContent = "center";
    confirmationButtons.style.gap = "20px";

    const abortButton = document.createElement("button");
    abortButton.id = "abort-confirm-btn";
    abortButton.classList.add("outline-text");
    abortButton.innerHTML = "Abort Game Anyway";

    const cancelButton = document.createElement("button");
    cancelButton.id = "abort-cancel-btn";
    cancelButton.classList.add("outline-text");
    cancelButton.innerHTML = "<span>Continue Game</span>";

    // Adding functionality to the buttons.

    // When the user/player chose to abort.
    abortButton.onclick = () => {
        // Adding a closing animation to the confirmation dialog.
        confirmationDialog.classList.add("fade-out-shrink");

        confirmationDialog.addEventListener(
            "animationend",
            () => {
                // Resetting / game information and deleting progress.
                currentQuestionNumber = 1;

                // Game resetting to the starting screen.
                resetToStartingScreen();
            },
            // Making sure this event listener runs only once.
            { once: true }
        );
    };

    // When the user/player chose to continue playing the game
    // and cancel the abort game action.
    cancelButton.onclick = () => {
        // Adding a closing animation to the confirmation dialog.
        confirmationDialog.classList.add("fade-out-shrink");

        confirmationDialog.addEventListener(
            "animationend",
            () => {
                // Through confirmation dialog element accessing it's parent and then removing the
                // confirmation dialog from it's child list and thus removing it from the DOM.
                confirmationDialog.parentElement.removeChild(confirmationDialog);

                // Re-enabling the abort game button.
                const abortGameButton = document.querySelector("#abort-game-btn");
                abortGameButton.disabled = false;
            },
            // Making sure this event listener runs only once.
            { once: true }
        );
    };

    confirmationButtons.appendChild(abortButton);
    confirmationButtons.appendChild(cancelButton);
    confirmationDialog.appendChild(confirmationButtons);

    confirmationDialog.appendChild(confirmationTitle);
    gameContainer.appendChild(confirmationDialog);

    confirmationDialog.show();
};

// Division bug needs to be fixed because the input element of type number
// is not compatible with decimal numbers / fractions...
// FIXED:
// 1) Added the step attribute to the input element.
// 2) calculateAnswer method returned a string because of the toFixed method.
//    Changed the return type to number regardless of the result.

// Todo:
// 1) Fix the coloring of the difficulty level when changed. ✔
//    [solution in game_style.css - under select and select:focus + &:has(option:checked[value="..."])]
// 2) Difficulty of questions actually changes for the next questions.
//    Same as the operators. ✔
// 3) If difficulty change while in game set a flag of difficulty to be custom at the end.
// Same for the operator(s)... ✔
// 4) Summary Screen...
