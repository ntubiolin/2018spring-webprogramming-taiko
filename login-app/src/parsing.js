/* eslint-disable no-console */

const fs = require('fs');

const file = './src/sotsuomeshiki.tja';
const contents = fs.readFileSync(file, { encoding: 'utf8' });

const output = {
  offset: 0,
  totalnotes: 0,
  BPM: 0,
  Notes: [],
};

const lines = contents.split(/\r?\n/);
const BPMline = lines.find(element => element.startsWith('BPM'));
output.BPM = parseInt(BPMline.replace(/\D/g, ''), 10);

const OffsetLine = lines.find(element => element.startsWith('OFFSET'));
const offString = OffsetLine.substring(OffsetLine.indexOf(':') + 1, OffsetLine.length);
output.offset = parseFloat(offString);

const start = lines.findIndex(element => element.startsWith('#START'));
const end = lines.findIndex(element => element.startsWith('#END'));

let m = 0;
for (let index = start + 1; index < end; index += 1) {
  let element = lines[index];
  element = element.substring(0, element.indexOf(',')); // remove everything after ','
  element = element.replace(/\D/g, ''); // remove non-numeric
  if (element.length !== 0) {
    const multi = 48 / element.length;
    for (let n = 0; n < element.length; n += 1) {
      if (element[n] !== '0') {
        output.Notes.push({
          types: parseInt(element[n], 10),
          measure: m,
          time: n * multi,
        });
      }
    }
    m += 1;
  }
}

output.totalnotes = output.Notes.length;

fs.writeFile('output.json', JSON.stringify(output));
