const fs = require('fs');

function ProcessLine(line) {
  if (line == '') return;

  console.log(line);

  console.log(FindMarker(line));
}

const MarkerLength = 4;

function FindMarker(line) {
  for (let i = 0; i <= line.length - MarkerLength; i++) {
    const slice = line.slice(i, i + MarkerLength);

    if (IsCharsUnique(slice)) return i + MarkerLength;
  }
}

function IsCharsUnique(str) {
  const chars = str.split('');

  let arr = [];

  for (let i = 0; i < chars.length; i++) {
    const char = chars[i];

    if (arr.includes(char)) {
      return false;
    } else {
      arr.push(char);
    }
  }

  return true;
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
