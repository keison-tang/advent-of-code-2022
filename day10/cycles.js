const fs = require('fs');

let x = 1;
let cycles = 0;
let signalStrengths = [];

function ProcessLine(line) {
  if (line == '') return;

  console.log(line);

  if (line == 'noop') {
    cycles++;
    CheckCycles();
  } else {
    const command = line.split(' ');
    const value = parseInt(command[1]);

    cycles++;
    CheckCycles();

    cycles++;
    CheckCycles();
    x += value;
  }
}

function CheckCycles() {
  if (cycles == 20) {
    signalStrengths.push(cycles * x);
  }

  const isEvery40After20 = cycles > 20 && (cycles - 20) % 40 == 0;

  if (isEvery40After20) {
    signalStrengths.push(cycles * x);
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

console.log(signalStrengths);
console.log(signalStrengths.reduce((a, b) => a + b));
