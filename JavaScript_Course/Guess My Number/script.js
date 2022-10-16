//DESCRIPTION: A game for slecting the correct number between 1-20
'use strict';

//Defining the label for simolicity of the code
const myCheck = document.querySelector('.btnCheck');
const myGuess = document.querySelector('.guess');
const myMessage = document.querySelector('.message');
const remainingattempts = document.querySelector('.score');
const myHighestScore = document.querySelector('.highscore');
const maxScore = 5;
const btnAgain = document.querySelector('.btnAgain');
let targetValue;

//recalculate a target number
const getNewNumber = () => {
  targetValue = Math.trunc(Math.random() * 20) + 1;
  myGuess.value = '';
};

getNewNumber();

//reduce the remaining attemps of the user
function reduceScore() {
  let tmpValue = Number(remainingattempts.textContent) - 1;
  remainingattempts.textContent = tmpValue;
  if (Number(remainingattempts.textContent) < 1) {
    myMessage.textContent = 'GAME OVER';
    document.querySelector('.number').textContent = targetValue;
    document.body.style.backgroundColor = 'red';
  }
}

//Logic upon clicking on "Check", practicing arrow function
function checkClickEvent() {
  let inputValue = Number(myGuess.value);
  if (Number(remainingattempts.textContent) < 1) myGuess.value = '';
  // No value was inserted
  else if (!inputValue) myMessage.textContent = '🤢 Dude, guess a number...';
  // select the correct number
  else if (inputValue === targetValue) {
    myMessage.textContent = '👑 Good Job!💕';
    myGuess.value = '';
    document.body.style.backgroundColor = 'green'; // @todo AGAIN function
    if (
      Number(myHighestScore.textContent) < Number(remainingattempts.textContent)
    ) {
      myHighestScore.textContent = remainingattempts.textContent;
    }
  }

  // Select greater number
  else if (inputValue > targetValue) {
    myMessage.textContent = '🤦‍♂️Too High...';
    reduceScore();
  }
  // Select lower number
  else if (inputValue < targetValue) {
    myMessage.textContent = '🤦‍♂️Too Low...';
    reduceScore();
  }
}

//Logic upon clicking on "Again", practicing arrow function
const againClickEvent = () => {
  getNewNumber();
  document.body.style.backgroundColor = 'black';
  remainingattempts.textContent = maxScore;
  document.querySelector('.number').textContent = '?';
  myMessage.textContent = 'Guess a number';
};

myCheck.addEventListener('click', checkClickEvent);
btnAgain.addEventListener('click', againClickEvent);
