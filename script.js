const cells = document.querySelectorAll(".cell");
const resetButton = document.getElementById("resetButton");
const gameStatus = document.querySelector(".game-status");

let currentPlayer = "X";
let gameActive = true;
let board = ["", "", "", "", "", "", "", "", ""];

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8], // Rows
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8], // Columns
  [0, 4, 8],
  [2, 4, 6], // Diagonals
];

function handleCellClick(event) {
  const clickedCell = event.target;
  const clickedCellIndex = parseInt(clickedCell.dataset.cellIndex);

  if (board[clickedCellIndex] !== "" || !gameActive) {
    return;
  }

  board[clickedCellIndex] = currentPlayer;
  clickedCell.classList.add(currentPlayer.toLowerCase());
  clickedCell.textContent = currentPlayer;

  checkResult();
}

function checkResult() {
  let roundWon = false;
  for (let i = 0; i < winningConditions.length; i++) {
    const winCondition = winningConditions[i];
    let a = board[winCondition[0]];
    let b = board[winCondition[1]];
    let c = board[winCondition[2]];

    if (a === "" || b === "" || c === "") {
      continue;
    }
    if (a === b && b === c) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    gameStatus.textContent = `${currentPlayer} wins!`;
    gameActive = false;
    return;
  }

  let roundDraw = !board.includes("");
  if (roundDraw) {
    gameStatus.textContent = "It's a Draw!";
    gameActive = false;
    return;
  }

  changePlayer();
}

function changePlayer() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  gameStatus.textContent = `It's ${currentPlayer}'s turn`;
}

function resetGame() {
  currentPlayer = "X";
  gameActive = true;
  board = ["", "", "", "", "", "", "", "", ""];
  gameStatus.textContent = `It's ${currentPlayer}'s turn`;
  cells.forEach((cell) => {
    cell.textContent = "";
    cell.classList.remove("x", "o");
  });
}

cells.forEach((cell) => cell.addEventListener("click", handleCellClick));
resetButton.addEventListener("click", resetGame);

gameStatus.textContent = `It's ${currentPlayer}'s turn`;
