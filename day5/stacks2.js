const fs = require('fs');

let stacks = [
  ['F', 'H', 'M', 'T', 'V', 'L', 'D'],
  ['P', 'N', 'T', 'C', 'J', 'G', 'Q', 'H'],
  ['H', 'P', 'M', 'D', 'S', 'R'],
  ['F', 'V', 'B', 'L'],
  ['Q', 'L', 'G', 'H', 'N'],
  ['P', 'M', 'R', 'G', 'D', 'B', 'W'],
  ['Q', 'L', 'H', 'C', 'R', 'N', 'M', 'G'],
  ['W', 'L', 'C'],
  ['T', 'M', 'Z', 'J', 'Q', 'L', 'D', 'R'],
];

const skipLines = 9;
let i = 0;

function ProcessLine(line) {
  if (line == '') return;

  if (i < skipLines) {
    i++;
    return;
  }

  const splitLine = line.split(' ');
  const command = [
    parseInt(splitLine[1]),
    parseInt(splitLine[3]),
    parseInt(splitLine[5]),
  ];

  console.log(command);

  MoveStacks(command);
}

//command array 3 numbers [count, sourceStack, destStack]
function MoveStacks(command) {
  const cnt = command[0];
  const sourceStackIndex = command[1] - 1;
  const destStackIndex = command[2] - 1;

  let currentSource = stacks[sourceStackIndex];
  let currentDest = stacks[destStackIndex];

  console.log(currentSource);
  console.log(currentDest);

  let tempArr = [];

  for (let i = 0; i < cnt; i++) {
    const top = currentSource.shift();
    tempArr.push(top);
  }

  currentDest = tempArr.concat(currentDest);

  console.log(currentSource);
  console.log(currentDest);

  stacks[sourceStackIndex] = currentSource;
  stacks[destStackIndex] = currentDest;
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

console.log(stacks);

stacks.forEach((s) => {
  process.stdout.write(s[0]);
});
