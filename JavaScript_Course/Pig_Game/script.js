'use strict';

//select elements
const player0Area = document.querySelector('.player--0');
const player1Area = document.querySelector('.player--1');
const player0Score = document.getElementById('score--0');
const player1Score = document.getElementById('score--1');
const player0Current = document.getElementById('current--0');
const player1Current = document.getElementById('current--1');
const dicePic = document.querySelector('.dice');
const rollBtn = document.querySelector('.btn--roll');
const holdBtn = document.querySelector('.btn--hold');
const newBtn = document.querySelector('.btn--new');
const targetScore = 15;
let activePlayer = 0;
let dice;
let isWinner = 0;

//Switching between the player and reset relevant elements
function switchPlayer() {
  player0Area.classList.toggle('player--active');
  player1Area.classList.toggle('player--active');
  if (activePlayer === 0) {
    player0Current.textContent = 0;
    activePlayer = 1;
  } else {
    player1Current.textContent = 0;
    activePlayer = 0;
  }
  console.log(activePlayer);
}

//reset a game
function resetGame() {
  if (activePlayer) {
    player1Area.classList.remove('player--winner');
    switchPlayer();
  } else {
    player0Area.classList.remove('player--winner');
    player0Current.textContent = 0; //if not switching player 0 current score need to be cleaned
  }
  player0Score.textContent = 0;
  player1Score.textContent = 0;
  isWinner = 0;
}

// adding the dice to the current score of the player
function increaseCurrent() {
  if (dice === 1) switchPlayer();
  else {
    let tmp = 0;
    if (!activePlayer) {
      tmp = Number(player0Current.textContent) + dice;
      player0Current.textContent = tmp;
    } else {
      tmp = Number(player1Current.textContent) + dice;
      player1Current.textContent = tmp;
    }
  }
}

//roll the dice
function genNumber() {
  if (isWinner);
  else {
    dice = Math.trunc(Math.random() * 6 + 1);
    dicePic.src = `dice-${dice}.png`;
    increaseCurrent();
  }
}

// checking if adding the score will win the game
function checkWinner(score) {
  return score >= targetScore ? true : false;
}

//a player wins the game
function winGame() {
  if (activePlayer === 0) {
    player0Area.classList.toggle('player--winner');
  } else {
    player1Area.classList.toggle('player--winner');
  }
  isWinner = 1;
}

// called upon click on hold
function updateScore() {
  if (!isWinner) {
    if (activePlayer === 0) {
      player0Score.textContent =
        Number(player0Score.textContent) + Number(player0Current.textContent);
      if (checkWinner(Number(player0Score.textContent))) winGame();
    } else {
      player1Score.textContent =
        Number(player1Score.textContent) + Number(player1Current.textContent);
      if (checkWinner(Number(player1Score.textContent))) winGame();
    }
  }
}

//reset a game
resetGame();
newBtn.addEventListener('click', resetGame);

//generate random number
dice = rollBtn.addEventListener('click', genNumber);

//display new score
holdBtn.addEventListener('click', updateScore);
