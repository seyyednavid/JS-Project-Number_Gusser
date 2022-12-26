/*
GAME FUNCTION:
- Player must guess a number between a min and max
- Player gets a certain amount of guesses
- Notify player of guesses remaining
- Notify the player of the correct answer if loose
- Let player choose to play again
*/

// game values
let min = 1,
  max = 10,
  winningNum = getRandomNum(min, max),
  guessesLeft = 3;

//  UI elements
const game = document.querySelector("#game"),
  minNUm = document.querySelector(".min-num"),
  maxNUm = document.querySelector(".max-num"),
  guessInput = document.querySelector("#guess-input"),
  guessBtn = document.querySelector("#guess-btn"),
  message = document.querySelector(".message");

//  Assign UI min and max
minNUm.textContent = min;
maxNUm.textContent = max;

//  Play again event listener
game.addEventListener("mousedown", function (e) {
  if (e.target.classList.contains("play-again")) {
    window.location.reload();
  }
});

// listen for guess
guessBtn.addEventListener("click", function () {
  let guess = parseInt(guessInput.value);

  // validate input
  if (isNaN(guess) || guess < min || guess > max) {
    setMessage(`Please enter a number between ${min} and ${max}`, "red");
  }

  //  check if won
  if (guess === winningNum) {
    // Game over - won
    gameOver(true, `${winningNum} is correct, YOU WIN`);
  } else {
    // wrong number
    guessesLeft -= 1;
    if (guessesLeft === 0) {
      // Game over - lost
      gameOver(
        false,
        `Game over, YOU LOST. The correct number was ${winningNum}`
      );
    } else {
      //  Game continue - answer wrong

      // change border color
      guessInput.style.borderColor = "red";

      //  Clear the input
      guessInput.value = "";

      //  Tell user it's the wrong number
      setMessage(
        `${guess} is not the correct, ${guessesLeft} guesses left`,
        "red"
      );
    }
  }
});

// Game over
function gameOver(won, msg) {
  let color;
  won === true ? (color = "green") : (color = "red");

  // disable input
  guessInput.disabled = true;
  // change birder color
  guessInput.style.borderColor = color;
  // Set message
  setMessage(msg, color);

  //  Play again
  guessBtn.value = "Play Again";
  guessBtn.className = "play-again";
}

// get getWinning number
function getRandomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

//  set message
function setMessage(msg, color) {
  message.style.color = color;
  message.textContent = msg;
}
