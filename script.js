const grid = document.getElementById("grid");
const scoreDisplay = document.getElementById("score");
const timeLeftDisplay = document.getElementById("time-left");
const restartBtn = document.getElementById("restart-btn");
const modal = document.getElementById("game-over-modal");
const finalScoreDisplay = document.getElementById("final-score");
const playAgainBtn = document.getElementById("play-again-btn");

let score = 0;
let timeLeft = 30;
let gameInterval;
let timer;

/* Create Game Grid */
function createGrid() {
  grid.innerHTML = "";
  for (let i = 0; i < 9; i++) {
    const square = document.createElement("div");
    square.classList.add("square");
    square.setAttribute("data-id", i);
    square.addEventListener("click", whackMole);
    grid.appendChild(square);
  }
}

/* Place the Mole */
function placeMole() {
  const squares = document.querySelectorAll(".square");
  squares.forEach((square) => square.classList.remove("mole"));
  let randomSquare = squares[Math.floor(Math.random() * squares.length)];
  randomSquare.classList.add("mole");
}

/* Whack the Mole */
function whackMole(event) {
  if (event.target.classList.contains("mole")) {
    score++;
    scoreDisplay.textContent = score;
    event.target.classList.remove("mole");
  }
}

/* Start the Timer */
function startTimer() {
  timer = setInterval(() => {
    timeLeft--;
    timeLeftDisplay.textContent = timeLeft;

    if (timeLeft === 0) {
      clearInterval(timer);
      clearInterval(gameInterval);
      endGame();
    }
  }, 1000);
}

/* End Game */
function endGame() {
  finalScoreDisplay.textContent = score;
  modal.classList.add("show");
}

/* Restart Game */
function restartGame() {
  score = 0;
  timeLeft = 30;
  scoreDisplay.textContent = score;
  timeLeftDisplay.textContent = timeLeft;
  modal.classList.remove("show");
  clearInterval(timer);
  clearInterval(gameInterval);
  startGame();
}

/* Start Game */
function startGame() {
  createGrid();
  gameInterval = setInterval(placeMole, 800);
  startTimer();
}

/* Event Listeners */
restartBtn.addEventListener("click", restartGame);
playAgainBtn.addEventListener("click", restartGame);

/* Start on Page Load */
startGame();
