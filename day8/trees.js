const fs = require('fs');

//treeGrid.length should equal treeGrid[0].length
const treeGrid = [];
let visibleCount = 0;

function ProcessLine(line) {
  if (line == '') return;

  console.log(line);

  treeGrid.push(line.split(''));
}

//2d array axes array[y][x]
function IsVisible(x, y) {
  let visibleLeft = true;
  let visibleRight = true;
  let visibleTop = true;
  let visibleBottom = true;

  const gridHeight = treeGrid.length;
  const gridWidth = treeGrid[0].length;

  const targetTreeHeight = treeGrid[y][x];

  if (x == 0 || x == gridWidth - 1) {
    return true;
  }

  if (y == 0 || y == gridHeight - 1) {
    return true;
  }

  //look left to right
  for (let index = 0; index < x; index++) {
    const treeHeight = treeGrid[y][index];

    if (treeHeight >= targetTreeHeight) {
      visibleLeft = false;
      break;
    }
  }

  //look right to left
  for (let index = treeGrid[y].length - 1; index > x; index--) {
    const treeHeight = treeGrid[y][index];

    if (treeHeight >= targetTreeHeight) {
      visibleRight = false;
      break;
    }
  }

  //look from top to bottom
  for (let index = 0; index < y; index++) {
    const treeHeight = treeGrid[index][x];

    if (treeHeight >= targetTreeHeight) {
      visibleTop = false;
      break;
    }
  }

  //look from bottom to top
  for (let index = treeGrid.length - 1; index > y; index--) {
    const treeHeight = treeGrid[index][x];

    if (treeHeight >= targetTreeHeight) {
      visibleBottom = false;
      break;
    }
  }

  return visibleLeft || visibleRight || visibleTop || visibleBottom;
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

console.log(treeGrid);

for (let y = 0; y < treeGrid.length; y++) {
  for (let x = 0; x < treeGrid[y].length; x++) {
    if (IsVisible(x, y)) {
      visibleCount++;
    }
  }
}

console.log(visibleCount);
