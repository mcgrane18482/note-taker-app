const fs = require('fs');
const util = require('util');
const path = require('path');
const DB_PATH = path.join(__dirname, '../db/db.json')

// Promise version of fs.readFile
const readFromFile = util.promisify(fs.readFile);

const writeToFile = (content) =>
  fs.writeFile(DB_PATH, JSON.stringify(content, null, 4), (err) =>
    err ? console.error(err) : console.info(`\nData written to json file`)
  );

const readAndAppend = (content) => {
  fs.readFile(DB_PATH, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const parsedData = JSON.parse(data);
      parsedData.push(content);
      writeToFile(parsedData);
    }
  });
};

module.exports = { readFromFile, writeToFile, readAndAppend };
