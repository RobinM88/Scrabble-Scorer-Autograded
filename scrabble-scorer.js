// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system.

const input = require("readline-sync");

const oldPointStructure = {
  1: ["A", "E", "I", "O", "U", "L", "N", "R", "S", "T"],
  2: ["D", "G"],
  3: ["B", "C", "M", "P"],
  4: ["F", "H", "V", "W", "Y"],
  5: ["K"],
  8: ["J", "X"],
  10: ["Q", "Z"],
};

function oldScrabbleScorer(word) {
  word = word.toUpperCase();
  let letterPoints = "";
  let totalPointValue = 0;

  for (let i = 0; i < word.length; i++) {
    for (const pointValue in oldPointStructure) {
      if (oldPointStructure[pointValue].includes(word[i])) {
        letterPoints += `Points for '${word[i]}': ${pointValue}\n`;
        totalPointValue += Number(pointValue);
      }
    }
  }
  return letterPoints;
}

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
  console.log("Let's play some scrabble!");
  const userWord = input.question("Enter a word: ");
//   return oldScrabbleScorer(userWord)

  return userWord;
}
// let points = initialPrompt();
// console.log(`${points}`);

function simpleScorer(word) {
  word = word.toUpperCase();
  return word.length;
}

function vowelBonusScorer(word) {
  const vowels = ["A", "E", "I", "O", "U"];
  let bonusScore = 0;
  console.log('word in bonus scorer', word)
  for (const letter in word) {
    vowels.includes(word[letter].toUpperCase())
      ? (bonusScore += 3)
      : (bonusScore += 1); // condition ? do if true : do if false;
  } // [p,p,p,r,e,e]
  return bonusScore;
}

function scrabbleScorer(word, pointScoring) {
  let totalScore = 0;

  for (const letter of word.toLowerCase()) {
    const points = pointScoring[letter] || 0;
    totalScore += points;
  }

  return totalScore;
}

let scoringAlgorithms = [
  {
    name: "Simple score",
    description: "Each letter is worth 1 point.",
    scorerFunction: simpleScorer,
  },
  {
    name: "Bonus vowels",
    description: "Vowels are 3 pts, consonants are 1 pt.",
    scorerFunction: vowelBonusScorer,
  },
  {
    name: "Scrabble",
    description: "The traditional scoring algorithm. Letter is worth 1 point.",
    scorerFunction: scrabbleScorer,
  },
];

function scorerPrompt(word) {
   console.log(`You entered: "${word}"`);
   console.log("Now, choose a scoring algorithm:");

  scoringAlgorithms.forEach((algorithm, index) => {
    console.log(`${index} - ${algorithm.name}: ${algorithm.description}`);
  });

  const choice = input.questionInt(
    "Enter the number corresponding to your choice: ",
    { min: 0, max: scoringAlgorithms.length - 1 }
  );

  const selectedAlgorithm = scoringAlgorithms[choice];

  const score = selectedAlgorithm.scorerFunction(word, newPointStructure);

  console.log(`Score for "${word}" using ${selectedAlgorithm.name}: ${score}`);
}

function transform(oldPointStructure) {
  let transformedStructure = {};
  for (let pointValue in oldPointStructure) {
    let letters = oldPointStructure[pointValue];
    letters.forEach((letter) => {
      transformedStructure[letter.toLowerCase()] = parseInt(pointValue);
    });
  }

  return transformedStructure;
}

const newPointStructure = transform(oldPointStructure);

function runProgram() {
  const userWord = initialPrompt();
  scorerPrompt(userWord);
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
  initialPrompt: initialPrompt,
  transform: transform,
  oldPointStructure: oldPointStructure,
  simpleScorer: simpleScorer,
  vowelBonusScorer: vowelBonusScorer,
  scrabbleScorer: scrabbleScorer,
  scoringAlgorithms: scoringAlgorithms,
  newPointStructure: newPointStructure,
  runProgram: runProgram,
  scorerPrompt: scorerPrompt,
};
