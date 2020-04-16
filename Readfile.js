
const filename = "input.txt";

const fs = require("fs");
const readline = require("readline");

const lineReader = readline.createInterface({input: fs.createReadStream(filename)})

console.log('Start reading ' + filename + '...');
console.log('==========================');

lineReader.on('line', line => {
    console.log(line);
});

lineReader.on('close', () => {
    console.log('============================');
    console.log('Reading ' + filename + ' completed.');
});