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

    // Checking if the max number of questions in the game has been reached.
    if (questionNumber === maxNumberOfQuestions) {
        console.log("Game Ended.");
        showSummaryScreen();
    } else {
        if (gameConfiguration.difficulty !== gameDifficulty.value) {
            console.log(`
                Game configuration changed mid game.
                Updating game configuration to match user input.
                Difficulty: ${gameDifficulty.value} ➡ ${gameConfiguration.difficulty}
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
                Operator Selection: ${gameOperatorSelection.value} ➡ ${gameConfiguration.operatorSelection}
            `);

            // Updating the game configuration that was changed.
            gameConfiguration.operatorSelection = gameOperatorSelection.value;

            // Raising flag to indicate that the game configuration has changed.
            gameConfiguration.operatorSelectionModified = true;
        }

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
