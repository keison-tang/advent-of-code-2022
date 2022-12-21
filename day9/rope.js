const fs = require('fs');

let tailVisitedPositions = { '0,0': 1 };

let headX = 0;
let headY = 0;
let tailX = 0;
let tailY = 0;

function ProcessLine(line) {
  if (line == '') return;

  const split = line.split(' ');

  const direction = split[0];
  const amount = parseInt(split[1]);
  console.log(`move ${direction} ${amount} times`);

  MoveHead(direction, amount);
}

function MoveHead(direction, amount) {
  for (let i = 0; i < amount; i++) {
    const currentHeadX = headX;
    const currentHeadY = headY;

    switch (direction) {
      case 'L':
        headX--;
        break;
      case 'R':
        headX++;
        break;
      case 'U':
        headY++;
        break;
      case 'D':
        headY--;
        break;
      default:
        break;
    }

    console.log(`head pos ${headX},${headY}`);

    UpdateTail(currentHeadX, currentHeadY);

    console.log(`tail pos ${tailX},${tailY}`);
  }
}

function UpdateTail(oldHeadX, oldHeadY) {
  const diffX = Math.abs(headX - tailX);
  const diffY = Math.abs(headY - tailY);

  //H and T on same point or adjacent
  if (diffX <= 1 && diffY <= 1) {
    return;
  }

  //T takes previous H position
  tailX = oldHeadX;
  tailY = oldHeadY;

  const dictKey = `${tailX},${tailY}`;
  const visitedCount = tailVisitedPositions[dictKey];
  if (!visitedCount) {
    tailVisitedPositions[dictKey] = 1;
  } else {
    tailVisitedPositions[dictKey] = visitedCount + 1;
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

console.log(Object.keys(tailVisitedPositions).length);
