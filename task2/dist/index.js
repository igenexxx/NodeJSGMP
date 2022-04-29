import { createReadStream, createWriteStream } from 'fs';
import { join } from 'path';
import csv from 'csvtojson'; // used "type": "module" instead of babel

createReadStream(join('task2', 'csv', 'test-table.csv')).on('error', err => {
  console.error('Read error:', err.message);
}).pipe(csv({
  eol: '\n'
})).pipe(createWriteStream(join('task2', 'json', 'result.json'))).on('error', err => {
  console.error('Write error:', err.message);
});