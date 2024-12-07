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
                    <select name="difficulty" id="difficulty">
                        <option value="easy">Easy 😊</option>
                        <option value="medium">Medium 🤘</option>
                        <option value="hard">Hard 🔥</option>
                        <option value="extreme">Extreme 🚒</option>
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

const startGame = () => {
    const gameContainer = document.querySelector(".game-container");

    gameContainer.innerHTML = `<div class="game-toolbar">
                <div class="tool-info-difficulty-level">
                    <label for="difficulty" id="difficulty-label"> Difficulty: </label>
                    <select class="difficulty easy-difficulty" name="difficulty" id="difficulty">
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
                        <input type="number" name="answer-question" id="answer" />
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
                            <td>x</td>
                            <td>x</td>
                            <td>x</td>
                            <td>x</td>
                            <td>x</td>
                            <td>x</td>
                        </tr>
                        <tr>
                            <td>x</td>
                            <td>x</td>
                            <td>x</td>
                            <td>x</td>
                            <td>x</td>
                            <td>x</td>
                        </tr>
                    </tbody>
                </table>
            </div>`;
};
