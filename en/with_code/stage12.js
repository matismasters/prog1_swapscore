/*

User Stories:

- As a Player, If I sort the list with my swap, I want to see a new list, so that me and other players can continue playing until the number of rounds is reach.
- As a Player, If my last swap sorted a list, I should get 10 points, so that I can get a bonus for sorting a list.

*/

const prompt = require("prompt-sync")();

function generateList(numberOfNumbers) {
  let list = [];
  for (let i = 0; i < numberOfNumbers; i++) {
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

function displayScores(players) {
  players.sort((a, b) => b.score - a.score);

  for (let player of players) {
    console.log(player.name + ": " + player.score);
  }
}

function addScoreToPlayer(players, playerName, score) {
  for (let player of players) {
    if (player.name === playerName) {
      player.score += score;
    }
  }

  return players;
}

function game() {
  console.clear();

  let players = [];
  do {
    let playerName = prompt("Enter a player's name or 'exit' if you have entered all: ");

    if (playerName === "exit") {
      break;
    }

    players.push({ name: playerName, score: 0 });
  } while (true);

  let numberOfNumbers = askForValidNumber("Enter the number of numbers: ");
  let numberOfRounds = askForValidNumber("Enter the number of rounds to play: ");
  console.clear();

  let list = generateList(numberOfNumbers);
  console.log(listToText(list));

  let score, player;
  let playerIndex = 0;
  while (numberOfRounds > 0) {
    playerIndex = playerIndex % players.length;
    player = players[playerIndex];

    let positionA = askForValidNumber(`${player.name}: Enter position A: `);
    let positionB = askForValidNumber(`${player.name}: Enter position B: `);

    console.clear();
    list = swapNumbers(list, positionA, positionB);
    score = calculateScore(list, positionA, positionB);
    if (validateSorted(list)) {
      console.log("List sorted!");
      list = generateList(numberOfNumbers);
      score += 10;
    }
    players = addScoreToPlayer(players, player.name, score);

    console.log(listToText(list));
    console.log("=====================");
    displayScores(players);
    console.log(`Remaining rounds: ${numberOfRounds}`);
    console.log("=====================");

    if (playerIndex === (players.length - 1)) {
      numberOfRounds--;
    }
    playerIndex++;
  }

  console.log("Game over!");
  displayScores(players);
}

game();