const fs = require('fs');

class EncryptedNum {
  constructor(startPosition, value) {
    this.startPosition = startPosition;
    this.value = value;
  }
}

let array = [];

function ProcessLine(line) {
  if (line == '') return;

  console.log(line);

  array.push(new EncryptedNum(array.length, parseInt(line)));
}

// moves the element at the input position a specified direction
// returns new position of element
function Move(currentPosition, isMoveLeft) {
  let newPosition;

  if (isMoveLeft) {
    newPosition =
      currentPosition - 1 < 0 ? array.length - 1 : currentPosition - 1;
  } else {
    newPosition =
      currentPosition + 1 > array.length - 1 ? 0 : currentPosition + 1;
  }

  const currentPositionObj = array[currentPosition];
  const newPositionObj = array[newPosition];

  //swap around
  array[currentPosition] = newPositionObj;
  array[newPosition] = currentPositionObj;

  return newPosition;
}

function MixArray() {
  //loop and move each in order of start position
  for (let startPosition = 0; startPosition < array.length; startPosition++) {
    const encryptedNum = array.find(
      (num) => num.startPosition == startPosition
    );

    let encryptedNumCurrentPosition = array.findIndex(
      (num) => num.startPosition == startPosition
    );

    const isMoveLeft = encryptedNum.value < 0;

    //e.g for ring size 3, +1 is same as +3, is the same as +5
    const iterationsToMove = Math.abs(encryptedNum.value) % (array.length - 1);

    for (
      let moveIteration = 0;
      moveIteration < iterationsToMove;
      moveIteration++
    ) {
      encryptedNumCurrentPosition = Move(
        encryptedNumCurrentPosition,
        isMoveLeft
      );
    }

    console.log;
  }
}

try {
  // read contents of the file
  const data = fs.readFileSync(__dirname + '/input.txt', 'UTF-8');

  // split the contents by new line
  const lines = data.split(/\r?\n/);

  // print all lines
  lines.forEach((line) => {
    ProcessLine(line);
  });
} catch (err) {
  console.error(err);
}

MixArray();

console.log(array);

const indexOfZeroValue = array.findIndex((e) => e.value == 0);
console.log(indexOfZeroValue);

const indexOf1000thAfterZero =
  (indexOfZeroValue + (1000 % array.length)) % array.length;
console.log(indexOf1000thAfterZero);
console.log(`value of 1000th after 0: ${array[indexOf1000thAfterZero].value}`);

const indexOf2000thAfterZero =
  (indexOfZeroValue + (2000 % array.length)) % array.length;
console.log(indexOf2000thAfterZero);
console.log(`value of 2000th after 0: ${array[indexOf2000thAfterZero].value}`);

const indexOf3000thAfterZero =
  (indexOfZeroValue + (3000 % array.length)) % array.length;
console.log(indexOf3000thAfterZero);
console.log(`value of 3000th after 0: ${array[indexOf3000thAfterZero].value}`);

console.log(
  array[indexOf1000thAfterZero].value +
    array[indexOf2000thAfterZero].value +
    array[indexOf3000thAfterZero].value
);
