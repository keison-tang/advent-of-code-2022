const fs = require('fs');

const Hands = {
  Rock: 1,
  Paper: 2,
  Scissors: 3,
};

const HandLeft = {
  A: 1,
  B: 2,
  C: 3,
};

const HandRight = {
  X: 1,
  Y: 2,
  Z: 3,
};

//string inputs
function RpsOutcome(handLeft, handRight) {
  const left = HandLeft[handLeft];
  const right = HandRight[handRight];

  //lose
  if (right == 1) {
    if (left == 1) return 3;
    if (left == 2) return 1;
    if (left == 3) return 2;
  }

  //draw
  if (right == 2) return 3 + left;

  //right wins
  if (right == 3) {
    if (left == 1) return 6 + 2;
    if (left == 2) return 6 + 3;
    if (left == 3) return 6 + 1;
  }
}

function ProcessLine(line) {
  if (line == '') return 0;

  const arr = line.split(' ');
  return RpsOutcome(arr[0], arr[1]);
}

try {
  // read contents of the file
  const data = fs.readFileSync('input.txt', 'UTF-8');

  // split the contents by new line
  const lines = data.split(/\r?\n/);

  let totalScore = 0;

  // print all lines
  lines.forEach((line) => {
    console.log(line);
    totalScore = totalScore + ProcessLine(line);
    console.log(totalScore);
  });

  console.log(totalScore);
} catch (err) {
  console.error(err);
}
