const fs = require('fs');

let currentDir = '';
let allDirPaths = {};

function ProcessLine(line) {
  if (line == '') return;

  console.log(line);

  if (IsCommand(line)) {
    if (line.startsWith('$ cd')) {
      if (line == '$ cd /') {
        currentDir = '/';
      } else if (line == '$ cd ..') {
        let dirs = currentDir.split('/');

        if (dirs.length == 1 || dirs.length == 2) {
          currentDir = '/';
        } else {
          dirs.pop();

          currentDir = dirs.join('/');
        }
      } else {
        if (currentDir == '/') {
          currentDir = `/${line.substring(5)}`;
        } else {
          currentDir = `${currentDir}/${line.substring(5)}`;
        }
      }

      console.log('current dir = ' + currentDir);

      if (!allDirPaths[currentDir]) {
        allDirPaths[currentDir] = 0;
      }
    }
  } else {
    //files
    if (!line.startsWith('dir')) {
      let currentSize = allDirPaths[currentDir];

      const fileDetail = line.split(' ');
      const fileSize = parseInt(fileDetail[0]);

      currentSize += fileSize;

      allDirPaths[currentDir] = currentSize;

      if (currentDir != '/') {
        let folders = currentDir.split('/');

        //add size to each parent folder all the way to root
        for (let i = folders.length - 1; i > 0; i--) {
          folders.pop();

          const path = folders.length == 1 ? '/' : folders.join('/');

          let currentSubSize = allDirPaths[path];
          currentSubSize += fileSize;

          allDirPaths[path] = currentSubSize;
        }
      }
    }
  }
}

function IsCommand(line) {
  if (line.length == 0) return;
  return line[0] == '$';
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

console.log(allDirPaths);

let sum = 0;

for (var key in allDirPaths) {
  var value = allDirPaths[key];

  if (value <= 100000) {
    sum += allDirPaths[key];
  }
}

console.log(sum);
