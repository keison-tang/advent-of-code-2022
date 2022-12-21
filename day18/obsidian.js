const fs = require('fs');

class Cube {
  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.adjacentCount = 0;
  }
}

let cubes = [];

function ProcessLine(line) {
  if (line == '') return;

  const coords = line.split(',');

  cubes.push(new Cube(coords[0], coords[1], coords[2]));

  console.log(line);
}

function IsAdjacent(x1, y1, z1, x2, y2, z2) {
  //adj on x axis
  if (Math.abs(x1 - x2) == 1 && y1 == y2 && z1 == z2) {
    return true;
  }

  //adj on y axis
  if (x1 == x2 && Math.abs(y1 - y2) == 1 && z1 == z2) {
    return true;
  }

  //adj on z axis
  if (x1 == x2 && y1 == y2 && Math.abs(z1 - z2) == 1) {
    return true;
  }

  return false;
}

function CountAdjacent() {
  for (let i = 0; i < cubes.length; i++) {
    const current = cubes[i];

    for (let j = 0; j < cubes.length; j++) {
      const compare = cubes[j];

      if (
        IsAdjacent(
          current.x,
          current.y,
          current.z,
          compare.x,
          compare.y,
          compare.z
        )
      ) {
        cubes[i].adjacentCount++;
      }
    }
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

CountAdjacent();

console.log(cubes);

const initialValue = 0;
const exposedFaces = cubes.reduce(
  (accumulator, cube) => accumulator + (6 - cube.adjacentCount),
  initialValue
);

console.log(exposedFaces);
