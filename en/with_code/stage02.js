/*

User Stories:

- As a Guest, I want to see an index for each number in the list, so that I can choose which numbers to swap.
- As a Guest, I want to swap two numbers on the list by their index, so that I can start sorting it.
- As a Guest, I want to see the list of numbers after the swap, so that I see if my sorting worked.

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
    text += i + ": " + list[i] + ", ";
  }
  return text;
}

function swapNumbers(list, positionA, positionB) {
  let valueAtPositionA = list[positionA];

  list[positionA] = list[positionB];
  list[positionB] = valueAtPositionA;

  return list;
}

function game() {
  let list = generateList();
  console.log(listToText(list));

  let positionA = parseInt(prompt("Enter position A: "));
  let positionB = parseInt(prompt("Enter position B: "));

  list = swapNumbers(list, positionA, positionB);
  console.log(listToText(list));
}

game();