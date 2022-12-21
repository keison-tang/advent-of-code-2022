const fs = require('fs');

class Monkey {
  constructor(name, value, monkey1, monkey2, operation) {
    (this.name = name), (this.value = value);
    this.monkey1 = monkey1;
    this.monkey2 = monkey2;
    this.operation = operation;
  }
}

let monkeys = [];

function ProcessLine(line) {
  if (line == '') return;

  const info = line.split(' ');
  if (info.length == 2) {
    monkeys.push(new Monkey(info[0].slice(0, 4), parseInt(info[1])));
  } else {
    monkeys.push(
      new Monkey(info[0].slice(0, 4), undefined, info[1], info[3], info[2])
    );
  }

  console.log(line);
}

function DoOperation(val1, val2, op) {
  switch (op) {
    case '+':
      return val1 + val2;
    case '-':
      return val1 - val2;
    case '*':
      return val1 * val2;
    case '/':
      return val1 / val2;
    default:
      throw new Error('ur a monkey');
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

console.log(monkeys);

const rootIndex = monkeys.findIndex((monkey) => monkey.name == 'root');

while (monkeys[rootIndex].value == undefined) {
  for (let i = 0; i < monkeys.length; i++) {
    const monkey = monkeys[i];

    //monkey already has value
    if (monkey.value != undefined) {
      continue;
    }

    const monkey1Index = monkeys.findIndex((m) => m.name == monkey.monkey1);
    const monkey2Index = monkeys.findIndex((m) => m.name == monkey.monkey2);

    const monkey1Value = monkeys[monkey1Index].value;
    const monkey2Value = monkeys[monkey2Index].value;

    if (monkey1Value != undefined && monkey2Value != undefined) {
      const valueToUpdate = DoOperation(
        monkey1Value,
        monkey2Value,
        monkey.operation
      );

      monkeys[i].value = valueToUpdate;
    }
  }
}

console.log(monkeys[rootIndex].value);
