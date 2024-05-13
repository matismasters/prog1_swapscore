# Swapscore

## Introduction

This is a project to test the skills of programming initiates. The project is a simple game where the player has to swap the numbers in the correct order to get points and win. The example code is written in basic JavaScript, without the usage of any libraries, frameworks, or class methods like filter, map, reduce, etc. We instead favor the use of loops and basic functions to solve the problems. The use of OOP is not required, but it is encouraged to use functions to make the code more readable and maintainable.

**Note:** With minimal to no edit in the user stories presented for each stage, this project can be expected to be developed in HTML/CSS/Javascript, and be played in a mobile browser with buttons and lists. 

## What you need to know before starting

- Conditionals: if, else, else if
- Loops: for, while
- Functions: declaration, calling, return
- Arrays: declaration, accessing, length
- Objects: declaration, accessing, properties

## Environment

- You can use any code editor you like. We recommend using Visual Studio Code.
- You should install nodejs to run the code. You can download it from [here](https://nodejs.org/en/download/).
- Make sure to create a new folder for your project and run `npm init -y` to create a new package.json file.
- To get user input, you can use the `prompt-sync` package. You can install it by running `npm install prompt-sync`. You can find more information about the package [here](https://www.npmjs.com/package/prompt-sync).
- If you are using Visual Studio Code. You can use the integrated terminal to run your code using `F5`, or `Run > Start Debugging`. In order to do that, you need to create a configuration file. Go to `Run > Add Configuration...` and select `Node.js`. The `launch.json` file look like the following (pay special attention to the `program` and `console` properties):

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Launch Program",
      "skipFiles": ["<node_internals>/**"],
      "program": "${file}",
      "console": "integratedTerminal"
    }
  ]
}
```

After all that is set try creating a new file named `test.js` and run the code below to see if everything is working correctly:

```javascript
const prompt = require('prompt-sync')();
let name = prompt('What is your name? ');
console.log(`Hello, ${name}!`);

// Expected output: Hello, <name>!
// Pay attention to the integrated terminal in Visual Studio Code
// You might need to select it with your mouse before being able to `input` anything
```

If you want to use use any other code editor, you can run your code using the terminal. Just navigate to the folder where your code is located and run `node filename.js`.

## The game

**Sort Score** is a straightforward game centered around the task of sorting numbers. It can be played individually or with multiple players.

### **Gameplay Overview:**
- The game is divided into rounds, with each player taking a turn per round.
- At the beginning of each turn, players are presented with multiple lists of unordered numbers.
- During their turn, players may swap any two numbers from any position within or between the lists.

### **Scoring Points:**
- If a number, after being swapped, is now in correct ascending order with the number that follows it in the list, the player scores a point. The same rule applies to the number following the second position involved in the swap.
- A player also scores a point if, after a swap, a number is greater than the number immediately preceding it in its list. The same rule applies to the number preceding the second position of the swap.
- Extra points are awarded if the swapped numbers are at the beginning or end of a list. One point is given for each number at either extremity. If both numbers are at the beginning or end, two points are awarded in total.
- A significant bonus of 10 points is given if a swap results in an entire list becoming sorted. This list is then removed from the game and replaced with a new one.

### **Ending the Game:**
- The game concludes after a predetermined number of rounds.
- The winner is the player who accumulates the most points.

This game offers unique challenges whether played solo or with others. In single-player mode, it tests your ability to plan strategically and predict the evolving order of numbers. In multiplayer mode, it adds an extra layer of complexity, as players must anticipate not only the numerical sequences but also the potential moves of their opponents, making each swap a critical decision for maximizing scoring potential.

## Develoment

Using iterative development, we will create the game in stages. Each stage will have a set of user stories that will guide the development process. By the end of each stage, the game should be playable, and the code should be refactored to be more readable and maintainable.

We separated each of the stages into different files to make it easier to follow the development process. You can copy the code from the previous stage to the next file and start implementing the new user stories. This will help you keep track of your progress and make it easier to debug your code. Your directory structure should look like this:

```plaintext
- en
  - stage1.js 
  - stage2.js
  - stage3.js
  ...
```

Your js files should look like this:

```javascript
// stage1.js
/*

User stories:

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
```

## Stage files

- [Stage 01](en/without_code/stage01.js)
- [Stage 02](en/without_code/stage02.js)
- [Stage 03](en/without_code/stage03.js)
- [Stage 04](en/without_code/stage04.js)
- [Stage 05](en/without_code/stage05.js)
- [Stage 06](en/without_code/stage06.js)
- [Stage 07](en/without_code/stage07.js)
- [Stage 08](en/without_code/stage08.js)
- [Stage 09](en/without_code/stage09.js)
- [Stage 10](en/without_code/stage10.js)
- [Stage 11](en/without_code/stage11.js)
- [Stage 12](en/without_code/stage12.js)
- [Stage 13](en/without_code/stage13.js)

## License

This project is licensed under the MIT License




