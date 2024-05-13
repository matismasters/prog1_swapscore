/*

User Stories:

- As a Guest, I should not be able to swap numbers if the index is out of bounds, so that I don't break the game.
- As a Guest, I should be able to make swaps until the list is sorted, so that I can finish the game.

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

  while (validateSorted(list) === false) {
    let positionA = askForValidNumber("Enter position A: ");
    let positionB = askForValidNumber("Enter position B: ");

    console.clear();
    list = swapNumbers(list, positionA, positionB);
    console.log(listToText(list));
  }

  console.log("You won!");
}

game();
