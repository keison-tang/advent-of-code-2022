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

let sum = 0;

function ProcessLine(line) {
  if (line === '') return 0;

  let compartment1 = line.substring(0, line.length / 2);
  let compartment2 = line.substring(line.length / 2);

  console.log(compartment1);
  console.log(compartment2);

  return FindValueOfCommonItem(compartment1, compartment2);
}

function FindValueOfCommonItem(compartment1, compartment2) {
  for (let i = 0; i < compartment1.length; i++) {
    const item1 = compartment1[i];

    for (let j = 0; j < compartment2.length; j++) {
      const item2 = compartment2[j];

      if (LetterValues[item1] == LetterValues[item2]) {
        console.log(LetterValues[item1]);
        return LetterValues[item1];
      }
    }
  }

  return 0;
}

try {
  // read contents of the file
  const data = fs.readFileSync('input.txt', 'UTF-8');

  // split the contents by new line
  const lines = data.split(/\r?\n/);

  // print all lines
  lines.forEach((line) => {
    console.log(line);

    sum += ProcessLine(line);
  });
} catch (err) {
  console.error(err);
}

console.log(sum);
