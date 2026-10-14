// ================================
// TIC-TAC-TOE GAME
// ================================

// Get HTML elements
const cells = document.querySelectorAll(".cell");

const statusText = document.getElementById("status");

const playerX = document.getElementById("playerX");
const playerO = document.getElementById("playerO");

const scoreXElement = document.getElementById("scoreX");
const scoreOElement = document.getElementById("scoreO");
const scoreDrawElement = document.getElementById("scoreDraw");

const restartButton = document.getElementById("restartBtn");
const resetButton = document.getElementById("resetBtn");


// ================================
// GAME VARIABLES
// ================================

let board = ["", "", "", "", "", "", "", "", ""];

let currentPlayer = "X";

let gameActive = true;

let scoreX = 0;
let scoreO = 0;
let scoreDraw = 0;


// ================================
// WINNING COMBINATIONS
// ================================

const winningConditions = [

    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    [0, 4, 8],
    [2, 4, 6]

];


// ================================
// CELL CLICK EVENT
// ================================

cells.forEach(cell => {

    cell.addEventListener("click", function () {

        const index = this.getAttribute("data-index");

        makeMove(index);

    });

});


// ================================
// MAKE MOVE
// ================================

function makeMove(index) {

    // If cell already filled
    if (board[index] !== "" || !gameActive) {
        return;
    }

    // Store player's move
    board[index] = currentPlayer;

    // Display move
    cells[index].textContent = currentPlayer;

    // Add CSS class
    cells[index].classList.add(
        currentPlayer.toLowerCase()
    );

    // Check winner
    checkResult();

}


// ================================
// CHECK RESULT
// ================================

function checkResult() {

    let roundWon = false;

    let winningCombination = null;


    // Check every winning combination

    for (let condition of winningConditions) {

        const a = condition[0];
        const b = condition[1];
        const c = condition[2];

        if (
            board[a] !== "" &&
            board[a] === board[b] &&
            board[a] === board[c]
        ) {

            roundWon = true;

            winningCombination = condition;

            break;
        }
    }


    // ================================
    // WINNER
    // ================================

    if (roundWon) {

        gameActive = false;

        winningCombination.forEach(index => {

            cells[index].classList.add("winner");

        });


        if (currentPlayer === "X") {

            scoreX++;

            scoreXElement.textContent = scoreX;

            statusText.textContent =
                "🎉 Player 1 Wins!";

        } else {

            scoreO++;

            scoreOElement.textContent = scoreO;

            statusText.textContent =
                "🎉 Player 2 Wins!";

        }

        return;
    }


    // ================================
    // DRAW
    // ================================

    if (!board.includes("")) {

        gameActive = false;

        scoreDraw++;

        scoreDrawElement.textContent = scoreDraw;

        statusText.textContent =
            "🤝 It's a Draw!";

        return;
    }


    // ================================
    // CHANGE PLAYER
    // ================================

    currentPlayer =
        currentPlayer === "X" ? "O" : "X";


    updatePlayerDisplay();

}


// ================================
// UPDATE PLAYER DISPLAY
// ================================

function updatePlayerDisplay() {

    if (currentPlayer === "X") {

        statusText.textContent =
            "Player 1's Turn (X)";

        playerX.classList.add("active");

        playerO.classList.remove("active");

    } else {

        statusText.textContent =
            "Player 2's Turn (O)";

        playerO.classList.add("active");

        playerX.classList.remove("active");

    }

}


// ================================
// RESTART GAME
// ================================

restartButton.addEventListener("click", restartGame);


function restartGame() {

    board = [
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        ""
    ];

    currentPlayer = "X";

    gameActive = true;


    // Clear cells

    cells.forEach(cell => {

        cell.textContent = "";

        cell.classList.remove(
            "x",
            "o",
            "winner"
        );

    });


    updatePlayerDisplay();

}


// ================================
// RESET SCORE
// ================================

resetButton.addEventListener("click", function () {

    scoreX = 0;

    scoreO = 0;

    scoreDraw = 0;


    scoreXElement.textContent = "0";

    scoreOElement.textContent = "0";

    scoreDrawElement.textContent = "0";


    restartGame();

});