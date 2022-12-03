const fs = require('fs');

//i did this in excel so it's not that stupid
const LetterValues = {
  a: 1,
  b: 2,
  c: 3,
  d: 4,
  e: 5,
  f: 6,
  g: 7,
  h: 8,
  i: 9,
  j: 10,
  k: 11,
  l: 12,
  m: 13,
  n: 14,
  o: 15,
  p: 16,
  q: 17,
  r: 18,
  s: 19,
  t: 20,
  u: 21,
  v: 22,
  w: 23,
  x: 24,
  y: 25,
  z: 26,
  A: 27,
  B: 28,
  C: 29,
  D: 30,
  E: 31,
  F: 32,
  G: 33,
  H: 34,
  I: 35,
  J: 36,
  K: 37,
  L: 38,
  M: 39,
  N: 40,
  O: 41,
  P: 42,
  Q: 43,
  R: 44,
  S: 45,
  T: 46,
  U: 47,
  V: 48,
  W: 49,
  X: 50,
  Y: 51,
  Z: 52,
};

let groupLines = [];

let sum = 0;

function FindValueOfCommonItem(groupLines) {
  for (let i = 0; i < groupLines[0].length; i++) {
    const item1 = groupLines[0][i];

    for (let j = 0; j < groupLines[1].length; j++) {
      const item2 = groupLines[1][j];

      if (LetterValues[item1] == LetterValues[item2]) {
        if (groupLines[2].includes(item1)) {
          console.log(LetterValues[item1]);
          return LetterValues[item1];
        }
      }
    }
  }

  return 0;
}

try {
  // read contents of the file
  const data = fs.readFileSync(__dirname + '/input.txt', 'UTF-8');

  // split the contents by new line
  const lines = data.split(/\r?\n/);

  // print all lines
  lines.forEach((line) => {
    if (groupLines.length < 3) {
      groupLines.push(line);

      if (groupLines.length == 3) {
        sum += FindValueOfCommonItem(groupLines);
        console.log(groupLines);

        groupLines = [];
      }
    }
  });
} catch (err) {
  console.error(err);
}

console.log(sum);
