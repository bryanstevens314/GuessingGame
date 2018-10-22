var resetButton = document.getElementById('reset');
var hintbutton = document.getElementById('hint');
var userInput = document.getElementById('userInput');
var titleTag = document.getElementById('titleTag');

var guess1 = document.getElementById('guess1');
var guess2 = document.getElementById('guess2');
var guess3 = document.getElementById('guess3');
var guess4 = document.getElementById('guess4');
var guess5 = document.getElementById('guess5');
var guessArray = [guess1, guess2, guess3, guess4, guess5];

var hint1 = document.getElementById('hint1');
var hint2 = document.getElementById('hint2');
var hint3 = document.getElementById('hint3');
var hintArray = [hint1, hint2, hint3];

function generateWinningNumber() {
  return Math.ceil(Math.random() * 100);
}

function shuffle(array) {
  var m = array.length,
    t,
    i;
  while (m) {
    i = Math.floor(Math.random() * m--);
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }
  return array;
}

class Game {
  constructor() {
    this.playersGuess = null;
    this.pastGuesses = [];
    this.winningNumber = generateWinningNumber();
  }
  provideHint() {
    let array = new Array(3);
    array[0] = this.winningNumber;
    array[1] = generateWinningNumber();
    array[2] = generateWinningNumber();

    return shuffle(array);
  }
  difference() {
    return Math.abs(this.playersGuess - this.winningNumber);
  }
  isLower() {
    if (this.playersGuess < this.winningNumber) {
      return true;
    }
    return false;
  }
  playersGuessSubmission(guess) {
    if (guess >= 1 && guess <= 100) {
      this.playersGuess = guess;
      return this.checkGuess();
    } else {
      throw 'That is an invalid guess.';
    }
  }
  checkGuess() {
    if (this.pastGuesses.includes(this.playersGuess)) {
      return 'You have already guessed that number.';
    }
    if (this.pastGuesses.length < 5) {

      this.pastGuesses.push(this.playersGuess);
      var guess = guessArray[this.pastGuesses.length - 1];
      guess.innerText = this.playersGuess;
      if (this.playersGuess === this.winningNumber) {
        return 'You Win!';
      }
      if (this.pastGuesses.length === 5) {
        return 'You Lose! Winning number was ' + this.winningNumber;
      }
    }
    if (this.difference() < 10) {

      return "You're burning up! " + this.checkDirection();
    }
    if (this.difference() < 25) {
      return "You're lukewarm. " + this.checkDirection();
    }
    if (this.difference() < 50) {
      return "You're a bit chilly. " + this.checkDirection();
    }
    if (this.difference() < 100) {
      return "You're ice cold! " + this.checkDirection();
    }
  }
  checkDirection() {
    if (this.playersGuess > this.winningNumber) {
      return 'Lower';
    } else {
      return 'Higher';
    }
  }
}

var currentGame = '';

function newGame() {
  return new Game();
}
window.onload = () => {
  currentGame = newGame();
};


function resetGame() {
  console.log('reset');
  currentGame = newGame();
  titleTag.innerHTML = 'Guess a number between 1-100';
  guessArray.forEach(element => {
    element.innerHTML = '___';
  });
  hintArray.forEach(element => {
    element.innerHTML = '';
  });
}

function hint() {
  var array = currentGame.provideHint();
  hintArray.forEach((element, index) => {
    element.innerHTML = array[index];
  });
}
resetButton.addEventListener('click', resetGame);
hintbutton.addEventListener('click', hint);
userInput.addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    console.log(userInput.value);
    titleTag.innerHTML = currentGame.playersGuessSubmission(
      Number(userInput.value)
    );
    console.log(currentGame.winningNumber);
    userInput.value = '';
  }

});
