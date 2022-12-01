const fs = require('fs');

var array = [0];

try {
  // read contents of the file
  const data = fs.readFileSync('input.txt', 'UTF-8');

  // split the contents by new line
  const lines = data.split(/\r?\n/);

  var i = 0;

  // print all lines
  lines.forEach((line) => {
    console.log(line);

    var num = parseInt(line.trim(), 10);

    if (!num) {
      i++;
      array.push(0);
    } else {
      array[i] = array[i] + num;
      console.log(array[i]);
    }
  });
} catch (err) {
  console.error(err);
}

console.log(array.length);

array.sort(function (a, b) {
  return a - b;
});

//max
console.log(array[array.length - 1]);

//top 3 combined
console.log(
  array[array.length - 1] + array[array.length - 2] + array[array.length - 3]
);
