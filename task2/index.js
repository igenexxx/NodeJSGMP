const { createReadStream, createWriteStream } = require('fs');
const { join } = require('path');
const csv = require('csvtojson');

createReadStream(join(__dirname, 'csv/test-table.csv'))
    .on('error', err => {
        console.error(err.message);
    })
    .pipe(csv({ eol: '\n' }))
    .pipe(createWriteStream(join(__dirname, 'json/result.json')))
    .on('error', err => {
        console.error(err.message);
    });

