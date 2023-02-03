        // HINTS:

    // No need to run any file in the terminal, just open the index.html in the browser
    // No need to come up with an AI strategy. You can search the internet for strategy descriptions. Do not use external code; implement written instructions instead.
    // No need to implement a general playing strategy. Tic-Tac-Toe has an easy unbeatable strategy that can be expressed as a sequence of conditionals.
    // The ideal team size is three. The maximum team size is three.
    // For the tasks to hide or display certain HTML elements the code is already implemented in the do-not-modify-this-file.js file as functions that you can call in your code.

        // GENERAL REQUIREMENTS:

    // Use forEach instead of for loops when applicable.

let gameTurn = 0;
let currentPlayer;
let board;

// this function will be called whenever the user changes
// the `select` input labeled `please select game mode`
function setGameMode(selectedValue) {
    switch (selectedValue) {
        case 'human-human':
            isPlayerXHuman = true;
            isPlayerYHuman = true;
            break;
        case 'human-ai':
            isPlayerXHuman = true;
            isPlayerYHuman = false;
            break;
    }
    resetBoard();

    setHTMLvisibilityForInputGameMode(false);
    setHTMLvisibilityForInputHumanCoordinates(true);
    setHTMLvisibilityForInputAiCoordinatesInput(false);
    setHTMLvisibilityForButtonLabeledReset(true);
    displayMessage("Player X's turn");
}

// this function is called whenever the user presses the `enter`
// key in the input box labeled `enter coordinates`
// paramerter: input - the content of the input box
function processHumanCoordinate(input) {
    console.log(`'processHumanCoordinate('${input}')`);
    if (gameTurn % 2 === 0) {
        currentPlayer = 'diamond';
    } else {
        currentPlayer = 'pets';
    }

    let coordinates = extractCoordinates(input);
    board[coordinates.x][coordinates.y] = currentPlayer;

    const winningPlayer = getWinningPlayer(board);
    if (winningPlayer) {
        displayMessage(`Player ${currentPlayer} has won !`);
    }

    gameTurn += 1;
    displayBoard(board);   

    // TODO: add a message stating either
    // Player X's turn
    // Player O's turn
    // It's a tie
    // Player X won 
    // Player O won 

    // TODO: add conditions to hide the coordinates screen for 
    // the human player & show for the button to generate AI 
    // coordinates
}

// this function is called whenever the user presses
// the button labeled `Generate AI coordinates`
function processAICoordinate() {
    console.log(`processAICoordinate()`);
}

// this function is called when the user clicks on 
// the button labeled `Restart Game`
function resetGame() {
    resetBoard()
    console.log(`resetGame()`);
    setHTMLvisibilityForInputGameMode(true)
    setHTMLvisibilityForInputHumanCoordinates(false);
    setHTMLvisibilityForInputAiCoordinatesInput(false);
}

// this function should change from A1..C3 to coordinates
// that are present in the `board` global variable
function extractCoordinates(input) {
    switch(input)
    {
        case "A1":
            return { x: 0, y: 0};
        case "A2":
            return { x: 0, y: 1};
        case "A3":
            return { x: 0, y: 2};
        case "B1":
            return { x: 1, y: 0};
        case "B2":
            return { x: 1, y: 1};
        case "B3":
            return { x: 1, y: 2};
        case "C1":
            return { x: 2, y: 0};
        case "C2":
            return { x: 2, y: 1};
        case "C3":
            return { x: 2, y: 2};
    }

    // this is a sample of what should be returned if the
    // the user had typed `A1`
    // you need to add the to also treat other cases (A2..C3)
    // return { x: 0, y: 0};

}

// this function should return `X` or `O` or undefined (carefull it's not a string )
// based on interpreting the values in the board variable
function getWinningPlayer(board) {
    return undefined;
}

        // TASK 2: Enter Coordinates when a Human is Playing

    // During the turn of a human player an input field for entering coordinates is displayed

    // When it is player X's turn, entering the coordinate A1 marks the corresponding position on the board with an X.

    // After the user enters a valid coordinate, the input field for entering coordinates is hidden from the page if the next player is an AI

    // After the user enters a valid coordinate, the Generate AI coordinates field is made visible on the page if the next player is an AI

