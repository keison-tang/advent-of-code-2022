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
//score is for me (right hand)
function RpsOutcome(handLeft, handRight) {
  const left = HandLeft[handLeft];
  const right = HandRight[handRight];

  //draw
  if (left == right) return 3 + right;

  //right wins
  if (left == 1 && right == 2) return 6 + right;
  if (left == 2 && right == 3) return 6 + right;
  if (left == 3 && right == 1) return 6 + right;

  //loss
  return 0 + right;
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
