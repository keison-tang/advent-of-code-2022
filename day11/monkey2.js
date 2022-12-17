class Monkey {
  constructor(id, trueMonkey, falseMonkey, items) {
    this.id = id;
    this.trueMonkey = trueMonkey;
    this.falseMonkey = falseMonkey;
    this.items = items;
    this.inspectedItems = 0;
  }
}

function GetOperationResult(monkeyId, old) {
  switch (monkeyId) {
    case 0:
      return old * 13;
    case 1:
      return old + 3;
    case 2:
      return old + 6;
    case 3:
      return old + 2;
    case 4:
      return old * old;
    case 5:
      return old + 4;
    case 6:
      return old * 7;
    case 7:
      return old + 7;
    default:
      throw new Error('ur a monkey');
  }
}

function GetTestResult(monkeyId, value) {
  switch (monkeyId) {
    case 0:
      return value % 19 == 0;
    case 1:
      return value % 2 == 0;
    case 2:
      return value % 13 == 0;
    case 3:
      return value % 5 == 0;
    case 4:
      return value % 7 == 0;
    case 5:
      return value % 11 == 0;
    case 6:
      return value % 17 == 0;
    case 7:
      return value % 3 == 0;
    default:
      throw new Error('ur a monkey');
  }
}

let monkeys = [
  new Monkey(0, 6, 7, [71, 86]),
  new Monkey(1, 5, 4, [66, 50, 90, 53, 88, 85]),
  new Monkey(2, 4, 1, [97, 54, 89, 62, 84, 80, 63]),
  new Monkey(3, 6, 0, [82, 97, 56, 92]),
  new Monkey(4, 5, 3, [50, 99, 67, 61, 86]),
  new Monkey(5, 3, 0, [61, 66, 72, 55, 64, 53, 72, 63]),
  new Monkey(6, 2, 7, [59, 79, 63]),
  new Monkey(7, 2, 1, [55]),
];

const lcm = 19 * 2 * 13 * 5 * 7 * 11 * 17 * 3;

const rounds = 10000;

for (let round = 1; round <= rounds; round++) {
  console.log(round);

  monkeys.forEach((monkey) => {
    while (monkey.items.length != 0) {
      //dequeue
      const item = monkey.items.shift();
      monkey.inspectedItems++;

      //inspect
      let worry = GetOperationResult(monkey.id, item);

      //bored
      worry = worry % lcm;

      //pass on
      const testResult = GetTestResult(monkey.id, worry);
      if (testResult) {
        monkeys[monkey.trueMonkey].items.push(worry);
      } else {
        monkeys[monkey.falseMonkey].items.push(worry);
      }
    }
  });
}

console.log(monkeys);

const inspectedCount = monkeys.map((m) => m.inspectedItems);
inspectedCount.sort((a, b) => b - a);
console.log(inspectedCount);
console.log(inspectedCount[0] * inspectedCount[1]);
