const fs = require('fs');

let sum = 0;

function ProcessLine(line) {
  if (line == '') return;

  console.log(line);

  const split = line.split(new RegExp('[-,]', 'g'));
  for (let i = 0; i < split.length; i++) {
    split[i] = parseInt(split[i]);
  }
  console.log(split);

  console.log(IsPairFullyContains(split));

  if (IsPairFullyContains(split)) {
    sum++;
  }
}

//input array with 4 numbers
function IsPairFullyContains(array) {
  //left is within right
  if (array[0] >= array[2] && array[1] <= array[3]) {
    return true;
  }

  //right is within left
  if (array[2] >= array[0] && array[3] <= array[1]) {
    return true;
  }

  return false;
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

console.log(sum);
