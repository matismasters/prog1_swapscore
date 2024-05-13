/*

User Stories:

- As a Guest, I should be able to set the number of lists I want to play with, so that I can play with more than one list.
- As a Player, I should be able identify lists with letters, so it is easy for me to point out the numbers to swap.
- As a Player, I should be able to swap numbers between lists, so that I can sort more than one list at a time.

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

function swapNumbers(lists, listAIndex, positionA, listBIndex, positionB) {
  let valueAtPositionA = lists[listAIndex][positionA];
  let valueAtPositionB = lists[listBIndex][positionB];

  lists[listAIndex][positionA] = valueAtPositionB;
  lists[listBIndex][positionB] = valueAtPositionA;

  return lists;
}

function askForValidNumber(message) {
  let number = parseInt(prompt(message));

  while (isNaN(number)) {
    console.log("Invalid number");
    number = parseInt(prompt(message));
  }

  return number;
}

function calculateScore(lists, listAIndex, positionA, listBIndex, positionB) {
  let listA = lists[listAIndex];
  let valueBeforePositionA = listA[positionA - 1];
  let valueAtPositionA = listA[positionA];
  let valueAfterPositionA = listA[positionA + 1];

  let listB = lists[listBIndex];
  let valueBeforePositionB = listB[positionB - 1];
  let valueAtPositionB = listB[positionB];
  let valueAfterPositionB = listB[positionB + 1];

  let score = 0;
  if (positionA === 0 || valueBeforePositionA < valueAtPositionA) {
    score++;
  }

  if (positionA === (listA.length - 1) || valueAtPositionA < valueAfterPositionA) {
    score++;
  }

  if (positionB === 0 || valueBeforePositionB < valueAtPositionB) {
    score++;
  }

  if (positionB === (listB.length - 1) || valueAtPositionB < valueAfterPositionB) {
    score++;
  }

  return score;
}

function validateSortedList(list) {
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

function indexToLetter(index) {
  return String.fromCharCode(65 + index);
}

function letterToIndex(letter) {
  return letter.toUpperCase().charCodeAt(0) - 65;
}

function askForIndexInList(message) {
  let index = prompt(message);
  let letter = index[0];
  let number = parseInt(index.slice(1));

  while (isNaN(number) || number < 0) {
    console.log("Invalid index");
    index = prompt(message);
    letter = index[0];
    number = parseInt(index.slice(1));
  }

  return {
    listIndex: letterToIndex(letter),
    numberIndex: number
  };
}

function showLists(lists) {
  for (let i = 0; i < lists.length; i++) {
    console.log(`List ${indexToLetter(i)}: ${listToText(lists[i])}`);
  }
}

function indicesOfSortedLists(lists) {
  let indices = [];
  for (let i = 0; i < lists.length; i++) {
    if (validateSortedList(lists[i])) {
      indices.push(i);
    }
  }
  return indices;
}

function game() {
  console.clear();

  let players = [];
  do {
    let playerName = prompt("Enter the name of a player or 'exit' if you have entered all: ");

    if (playerName === "exit") {
      break;
    }

    players.push({ name: playerName, score: 0 });
  } while (true);

  let numberOfNumbers = askForValidNumber("Enter the number of numbers: ");
  let numberOfRounds = askForValidNumber("Enter the number of rounds to play: ");
  let numberOfLists = askForValidNumber("Enter the number of lists to play: ");
  console.clear();

  let lists = []
  for (let i = 0; i < numberOfLists; i++) {
    lists.push(generateList(numberOfNumbers));
  }
  showLists(lists);

  let score, player;
  let playerIndex = 0;
  while (numberOfRounds > 0) {
    playerIndex = playerIndex % players.length;
    player = players[playerIndex];

    let inputMessage = `Enter the letter of the column and the index of the number to swap (Example: A1): `;

    let listIndexAndPositionA = askForIndexInList(`${player.name}: ${inputMessage} `);
    let listIndexAndPositionB = askForIndexInList(`${player.name}: ${inputMessage} `);

    console.clear();
    lists = swapNumbers(
      lists,
      listIndexAndPositionA.listIndex,
      listIndexAndPositionA.numberIndex,
      listIndexAndPositionB.listIndex,
      listIndexAndPositionB.numberIndex
    );
    score = calculateScore(
      lists,
      listIndexAndPositionA.listIndex,
      listIndexAndPositionA.numberIndex,
      listIndexAndPositionB.listIndex,
      listIndexAndPositionB.numberIndex
    );

    let sortedLists = indicesOfSortedLists(lists);
    if (sortedLists.length > 0) {
      console.log(`${sortedLists.length} sorted lists!`);
      for (let sortedListIndex of sortedLists) {
        lists[sortedListIndex] = generateList(numberOfNumbers);
        score += 10;
      }
    }
    players = addScoreToPlayer(players, player.name, score);
    showLists(lists);
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