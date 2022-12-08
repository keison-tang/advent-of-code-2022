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
function GetScenicScore(x, y) {
  let visibleLeft = 0;
  let visibleRight = 0;
  let visibleTop = 0;
  let visibleBottom = 0;

  const targetTreeHeight = treeGrid[y][x];

  //look left
  for (let index = x - 1; index >= 0; index--) {
    const treeHeight = treeGrid[y][index];

    if (treeHeight >= targetTreeHeight) {
      visibleLeft++;
      break;
    }

    visibleLeft++;
  }

  //look right
  for (let index = x + 1; index <= treeGrid[y].length - 1; index++) {
    const treeHeight = treeGrid[y][index];

    if (treeHeight >= targetTreeHeight) {
      visibleRight++;
      break;
    }

    visibleRight++;
  }

  //look up
  for (let index = y - 1; index >= 0; index--) {
    const treeHeight = treeGrid[index][x];

    if (treeHeight >= targetTreeHeight) {
      visibleTop++;
      break;
    }

    visibleTop++;
  }

  //look down
  for (let index = y + 1; index <= treeGrid.length - 1; index++) {
    const treeHeight = treeGrid[index][x];

    if (treeHeight >= targetTreeHeight) {
      visibleBottom++;
      break;
    }

    visibleBottom++;
  }

  return visibleLeft * visibleRight * visibleTop * visibleBottom;
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

let currentLargest = 0;

for (let y = 0; y < treeGrid.length; y++) {
  for (let x = 0; x < treeGrid[y].length; x++) {
    const scenicScore = GetScenicScore(x, y);

    if (scenicScore >= currentLargest) {
      currentLargest = scenicScore;
    }
  }
}

console.log(currentLargest);
