const fs = require('fs');

let spritePos = 1;
let cycle = 0;
let screen = ['', '', '', '', '', ''];

function ProcessLine(line) {
  if (line == '') return;

  console.log(line);

  if (line == 'noop') {
    cycle++;
    DrawPixel();
  } else {
    const command = line.split(' ');
    const value = parseInt(command[1]);

    cycle++;
    DrawPixel();

    cycle++;
    DrawPixel();

    spritePos += value;
  }
}

function DrawPixel() {
  let char;

  const crtPos = (cycle % 40) - 1;

  if (crtPos <= spritePos + 1 && crtPos >= spritePos - 1) {
    char = '#';
  } else {
    char = '.';
  }

  if (cycle >= 1 && cycle <= 40) {
    screen[0] += char;
  } else if (cycle >= 41 && cycle <= 80) {
    screen[1] += char;
  } else if (cycle >= 81 && cycle <= 120) {
    screen[2] += char;
  } else if (cycle >= 121 && cycle <= 160) {
    screen[3] += char;
  } else if (cycle >= 161 && cycle <= 200) {
    screen[4] += char;
  } else if (cycle >= 201 && cycle <= 240) {
    screen[5] += char;
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

console.log(screen);
