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
        case 'ai-ai':
            isPlayerXHuman = false;
            isPlayerYHuman = false;
            break;
    }
    resetBoard();

    setHTMLvisibilityForInputGameMode(false);
    if (!isPlayerXHuman) {
        setHTMLvisibilityForInputHumanCoordinates(false);
        setHTMLvisibilityForInputAiCoordinatesInput(true);
    }
    else {
        setHTMLvisibilityForInputHumanCoordinates(true);
        setHTMLvisibilityForInputAiCoordinatesInput(false);
    }
    setHTMLvisibilityForButtonLabeledReset(true);
}

// this function is called whenever the user presses the `enter`
// key in the input box labeled `enter coordinates`
// paramerter: input - the content of the input box
function processHumanCoordinate(input) {
    console.log(`'processHumanCoordinate('${input}')`);
    if (gameTurn % 2 === 0) {
        currentPlayer = 'diamond';
        displayMessage("Player X's turn");
    } else {
        currentPlayer = 'pets';
        displayMessage("Player Y's turn");
    }

    let coordinates = extractCoordinates(input);

    if (coordinates === undefined) {
        displayMessage("Invalid coordinate entered! Please input another value.")
    }
    else if (board[coordinates.x][coordinates.y] === '') {
        board[coordinates.x][coordinates.y] = currentPlayer;
        gameTurn += 1;
        if (!isPlayerYHuman) {
            setHTMLvisibilityForInputHumanCoordinates(false);
            setHTMLvisibilityForInputAiCoordinatesInput(true);
        }
    }
    else {
        if (board[coordinates.x][coordinates.y] !== '')
            displayMessage("Position is already taken on board! Please input another value.");
    }

    displayBoard(board);
    const winningPlayer = getWinningPlayer(board);
    if (winningPlayer) {
        displayMessage(`Player ${currentPlayer} has won !`);
        setHTMLvisibilityForInputHumanCoordinates(false);
        setHTMLvisibilityForInputAiCoordinatesInput(false);
        setHTMLvisibilityForButtonLabeledReset(true);
    }
    else if (checkTie(board)) {
        displayMessage("It's a tie!");
        setHTMLvisibilityForInputHumanCoordinates(false);
        setHTMLvisibilityForInputAiCoordinatesInput(false);
        setHTMLvisibilityForButtonLabeledReset(true);
    }
}

// function generateAIinput(){
//     for(let line=0; line<board.length; line++){
//         for(let column = 0; column<board[line].length; column++){
//             if(board[line][column] === '')
//             switch(line){
//                 case 0:
//                     return "A"+(column+1);
//                 case 1:
//                     return "B"+(column+1);
//                 case 2:
//                     return "C"+(column+1);
//             }
//         }
//     }
// }

// this function is called whenever the user presses
// the button labeled `Generate AI coordinates`
function processAICoordinate() {
    console.log(`processAICoordinate()`);
    if (gameTurn % 2 === 0) {
        currentPlayer = 'diamond';
        displayMessage("Player X's turn");
    } else {
        currentPlayer = 'pets';
        displayMessage("Player Y's turn");
    }

    //let input = generateAIinput();
    let coordinates = generateAIinput(board);

    board[coordinates.x][coordinates.y] = currentPlayer;

    gameTurn += 1;
    displayBoard(board);
    //displayMessage("Player X's turn");
    if (!isPlayerXHuman) {
        setHTMLvisibilityForInputHumanCoordinates(false);
        setHTMLvisibilityForInputAiCoordinatesInput(true);
    }
    else {
        setHTMLvisibilityForInputHumanCoordinates(true);
        setHTMLvisibilityForInputAiCoordinatesInput(false);
    }
    const winningPlayer = getWinningPlayer(board);
    if (winningPlayer) {
        displayMessage(`Player ${currentPlayer} has won !`);
        setHTMLvisibilityForInputHumanCoordinates(false);
        setHTMLvisibilityForInputAiCoordinatesInput(false);
        setHTMLvisibilityForButtonLabeledReset(true);
    }
    else if (checkTie(board)) {
        displayMessage("It's a tie!");
        setHTMLvisibilityForInputHumanCoordinates(false);
        setHTMLvisibilityForInputAiCoordinatesInput(false);
        setHTMLvisibilityForButtonLabeledReset(true);
    }
}


function generateAIinput(board) {
    // Check if AI can win in the next move
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i][j] === '') {
                board[i][j] = 'pets';
                if (checkWin(board, 'pets')) {
                    board[i][j] = '';
                    return { x: i, y: j };
                }
                board[i][j] = '';
            }
        }
    }

    // Check if the player can win in the next move and block it
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i][j] === '') {
                board[i][j] = 'diamond';
                if (checkWin(board, 'diamond')) {
                    board[i][j] = '';
                    return { x: i, y: j };
                }
                board[i][j] = '';
            }
        }
    }

    // Generate a random move
    let moves = [];
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i][j] === '') {
                moves.push([i, j]);
            }
        }
    }
    let randomIndex = Math.floor(Math.random() * moves.length);
    //return moves[randomIndex];
    return { x: moves[randomIndex][0], y: moves[randomIndex][1] };
}

function checkWin(board, symbol) {
    for (let i = 0; i < 3; i++) {
        if (board[i][0] === symbol && board[i][1] === symbol && board[i][2] === symbol) {
            return true;
        }
    }
    for (let j = 0; j < 3; j++) {
        if (board[0][j] === symbol && board[1][j] === symbol && board[2][j] === symbol) {
            return true;
        }
    }
    if (board[0][0] === symbol && board[1][1] === symbol && board[2][2] === symbol) {
        return true;
    }
    if (board[0][2] === symbol && board[1][1] === symbol && board[2][0] === symbol) {
        return true;
    }
    return false;
}




// this function is called when the user clicks on 
// the button labeled `Restart Game`
function resetGame() {
    resetBoard();
    gameTurn = 0;
    console.log(`resetGame()`);
    setHTMLvisibilityForInputGameMode(true)
    if (!isPlayerXHuman) {
        setHTMLvisibilityForInputHumanCoordinates(false);
        setHTMLvisibilityForInputAiCoordinatesInput(true);
    }
    else {
        setHTMLvisibilityForInputHumanCoordinates(true);
        setHTMLvisibilityForInputAiCoordinatesInput(false);
    }
    setHTMLvisibilityForButtonLabeledReset(false);
    displayBoard(board);
}

// this function should change from A1..C3 to coordinates
// that are present in the `board` global variable
function extractCoordinates(input) {
    switch (input) {
        case "A1":
            return { x: 0, y: 0 };
        case "A2":
            return { x: 0, y: 1 };
        case "A3":
            return { x: 0, y: 2 };
        case "B1":
            return { x: 1, y: 0 };
        case "B2":
            return { x: 1, y: 1 };
        case "B3":
            return { x: 1, y: 2 };
        case "C1":
            return { x: 2, y: 0 };
        case "C2":
            return { x: 2, y: 1 };
        case "C3":
            return { x: 2, y: 2 };
    }
    return undefined;

    // this is a sample of what should be returned if the
    // the user had typed `A1`
    // you need to add the to also treat other cases (A2..C3)
    // return { x: 0, y: 0};

}

function checkLine(line) {
    if (line.toString() == winnerLines[0])
        return 'X';
    else if (line.toString() == winnerLines[1])
        return 'Y';
    else
        return undefined;
}

// this function should return `X` or `O` or undefined (carefull it's not a string )
// based on interpreting the values in the board variable
function getWinningPlayer(board) {

    if (board[0][0] === 'diamond' && board[0][1] === 'diamond' && board[0][2] === 'diamond')
        return "X";
    else if (board[0][0] === 'pets' && board[0][1] === 'pets' && board[0][2] === 'pets')
        return "Y";
    else if (board[1][0] === 'diamond' && board[1][1] === 'diamond' && board[1][2] === 'diamond')
        return "X";
    else if (board[1][0] === 'pets' && board[1][1] === 'pets' && board[1][2] === 'pets')
        return "Y";
    else if (board[2][0] === 'diamond' && board[2][1] === 'diamond' && board[2][2] === 'diamond')
        return "X";
    else if (board[2][0] === 'pets' && board[2][1] === 'pets' && board[2][2] === 'pets')
        return "Y";
    else if (board[0][0] === 'diamond' && board[1][0] === 'diamond' && board[2][0] === 'diamond')
        return "X";
    else if (board[0][0] === 'pets' && board[1][0] === 'pets' && board[2][0] === 'pets')
        return "Y";
    else if (board[0][1] === 'diamond' && board[1][1] === 'diamond' && board[2][1] === 'diamond')
        return "X";
    else if (board[0][1] === 'pets' && board[1][1] === 'pets' && board[2][1] === 'pets')
        return "Y";
    else if (board[0][2] === 'diamond' && board[1][2] === 'diamond' && board[2][2] === 'diamond')
        return "X";
    else if (board[0][2] === 'pets' && board[1][2] === 'pets' && board[2][2] === 'pets')
        return "Y";
    else if (board[0][0] === 'diamond' && board[1][1] === 'diamond' && board[2][2] === 'diamond')
        return "X";
    else if (board[0][0] === 'pets' && board[1][1] === 'pets' && board[2][2] === 'pets')
        return "Y";
    else if (board[0][2] === 'diamond' && board[1][1] === 'diamond' && board[2][0] === 'diamond')
        return "X";
    else if (board[0][2] === 'pets' && board[1][1] === 'pets' && board[2][0] === 'pets')
        return "Y";

    return undefined;
}

function checkTie(board) {
    for (const line in board) {
        for (const column in board[line]) {
            if (board[line][column] === '') {
                return false;
            }
        }
    }
    return true;
}

        // TASK 2: Enter Coordinates when a Human is Playing

    // During the turn of a human player an input field for entering coordinates is displayed

    // When it is player X's turn, entering the coordinate A1 marks the corresponding position on the board with an X.

    // After the user enters a valid coordinate, the input field for entering coordinates is hidden from the page if the next player is an AI

    // After the user enters a valid coordinate, the Generate AI coordinates field is made visible on the page if the next player is an AI


