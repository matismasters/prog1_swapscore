/*

User Stories:

- As a Guest, I want to see a list of 10 random unordered numbers, so that I can plan my first swap.

*/

function generateList() {
  let list = [];
  for (let i = 0; i < 10; i++) {
    list.push(Math.floor(Math.random() * 100));
  }
  return list;
}

function listToText(list) {
  return list.join(", ");
}

function game() {
  let list = generateList();
  console.log(listToText(list));
}

game();