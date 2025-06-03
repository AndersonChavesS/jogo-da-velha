const cellElements = document.querySelectorAll("[data-cell]");
const board = document.querySelector("[data-board]");
const winningMessage = document.querySelector("[data-winning-message]");
const winningMessageText = winningMessage.querySelector("p");
const restartButton = document.querySelector(".restart");

const backgroundMusic = document.getElementById("background-music");
backgroundMusic.volume = 0.2;

let isCircleTurn;

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const startGame = () => {
  isCircleTurn = false;

  for (const cell of cellElements) {
    cell.classList.remove("x");
    cell.classList.remove("circle");
    cell.removeEventListener("click", handleClick);
    cell.addEventListener("click", handleClick, { once: true });
  }

  setBoardHoverClass();
  winningMessage.style.display = "none";
};

const endGame = (isDraw) => {
  if (isDraw) {
    winningMessageText.innerText = "Empate!";
  } else {
    winningMessageText.innerText = isCircleTurn ? "O Venceu!" : "X Venceu!";
  }
  winningMessage.style.display = "flex";
};

const checkForWin = (currentPlayer) => {
  return winningCombinations.some((combination) => {
    return combination.every((index) => {
      return cellElements[index].classList.contains(currentPlayer);
    });
  });
};

const checkForDraw = () => {
  return [...cellElements].every((cell) => {
    return cell.classList.contains("x") || cell.classList.contains("circle");
  });
};

const placeMark = (cell, classToAdd) => {
  cell.classList.add(classToAdd);
};

const setBoardHoverClass = () => {
  board.classList.remove("x");
  board.classList.remove("circle");

  if (isCircleTurn) {
    board.classList.add("circle");
  } else {
    board.classList.add("x");
  }
};

const swapTurns = () => {
  isCircleTurn = !isCircleTurn;
  setBoardHoverClass();
};

const handleClick = (e) => {
  const cell = e.target;
  const classToAdd = isCircleTurn ? "circle" : "x";

  if (backgroundMusic.paused) {
    backgroundMusic.play();
  }

  placeMark(cell, classToAdd);

  const isWin = checkForWin(classToAdd);

  if (isWin) {
    endGame(false);
  } else if (checkForDraw()) {
    endGame(true);
  } else {
    swapTurns();
  }
};

restartButton.addEventListener("click", (e) => {
  e.preventDefault();
  startGame();
});

startGame();
