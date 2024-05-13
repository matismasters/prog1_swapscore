/*

User Stories:

- As a Guest, I should be able to enter my name, so that I can become a player.
- As a Player, I should be able to see my name alongside my score, so that I know how well I'm doing.

*/

const prompt = require("prompt-sync")();

function generateList() {
  let list = [];
  for (let i = 0; i < 10; i++) {
    list.push(Math.floor(Math.random() * 100));
  }
  return list;
}

function listToText(list) {
  text = "";
  for (let i = 0; i < list.length; i++) {
    text += i + "-(" + list[i] + "), ";
  }
  return text;
}

function swapNumbers(list, positionA, positionB) {
  let valueAtPositionA = list[positionA];

  list[positionA] = list[positionB];
  list[positionB] = valueAtPositionA;

  return list;
}

function askForValidNumber(message) {
  let number = parseInt(prompt(message));

  while (isNaN(number)) {
    console.log("Invalid number");
    number = parseInt(prompt(message));
  }

  return number;
}

function calculateScore(list, positionA, positionB) {
  let valueBeforePositionA = list[positionA - 1];
  let valueAtPositionA = list[positionA];
  let valueAfterPositionA = list[positionA + 1];

  let valueBeforePositionB = list[positionB - 1];
  let valueAtPositionB = list[positionB];
  let valueAfterPositionB = list[positionB + 1];

  let score = 0;
  if (positionA === 0 || valueBeforePositionA < valueAtPositionA) {
    score++;
  }

  if (positionA === (list.length - 1) || valueAtPositionA < valueAfterPositionA) {
    score++;
  }

  if (positionB === 0 || valueBeforePositionB < valueAtPositionB) {
    score++;
  }

  if (positionB === (list.length - 1) || valueAtPositionB < valueAfterPositionB) {
    score++;
  }

  return score;
}

function validateSorted(list) {
  for (let i = 0; i < list.length - 1; i++) {
    if (list[i] > list[i + 1]) {
      return false;
    }
  }
  return true;
}

function displayScore(playerName, score) {
  console.log(playerName + ": " + score);
}

function game() {
  console.clear();

  let playerName = prompt("Enter your name: ");
  console.clear();

  let list = generateList();
  console.log(listToText(list));

  let score = 0;

  while (validateSorted(list) === false) {
    let positionA = askForValidNumber(`${playerName}: Enter position A: `);
    let positionB = askForValidNumber(`${playerName}: Enter position B: `);

    console.clear();
    list = swapNumbers(list, positionA, positionB);
    score += calculateScore(list, positionA, positionB);
    console.log(listToText(list));
    displayScore(playerName, score);
  }

  console.log("You won!");
  displayScore(playerName, score);
}

game();