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
// resetToStartingScreen();
