/*

In this stage we start to calculate the score points for each swap. Keep in mind the following concepts:
- Swap: The action of exchanging two numbers from a PositionA to a positionB in the list/s.
- NumberA: The first number to swap.
- PositionA: The index of the first number to swap.
- NumberB: The second number to swap.
- PositionB: The index of the second number to swap.
- Score: The points that a player gets after a swap.

### User Stories

- As a Guest, I should be getting one point if the numberA is the first number in the list, so that I get a point for sorting the list properly.
- As a Guest, I should be getting one point if the numberB is the first number in the list, so that I get a point for sorting the list properly.

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
  let text = "";
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

  if (valueAtPositionA < valueAfterPositionA) {
    score++;
  }

  if (positionB === 0 || valueBeforePositionB < valueAtPositionB) {
    score++;
  }

  if (valueAtPositionB < valueAfterPositionB) {
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

function game() {
  console.clear();
  let list = generateList();
  console.log(listToText(list));

  let score = 0;

  while (validateSorted(list) === false) {
    let positionA = askForValidNumber("Enter position A: ");
    let positionB = askForValidNumber("Enter position B: ");

    console.clear();
    list = swapNumbers(list, positionA, positionB);
    score += calculateScore(list, positionA, positionB);
    console.log(listToText(list));
    console.log("Score: " + score)
  }

  console.log("You won!");
  console.log("Final Score: " + score)
}

game();