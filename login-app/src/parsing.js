/* eslint-disable no-console */

const fs = require('fs');

const file = './public/tja/sotsuomeshiki.tja';
const contents = fs.readFileSync(file, { encoding: 'utf8' });

const output = {
  offset: 0,
  totalnotes: 0,
  BPM: 0,
  Notes: [],
  renda: [],
};

const lines = contents.split(/\r?\n/);
const BPMline = lines.find(element => element.startsWith('BPM'));
output.BPM = parseInt(BPMline.replace(/\D/g, ''), 10);

const OffsetLine = lines.find(element => element.startsWith('OFFSET'));
const offString = OffsetLine.substring(OffsetLine.indexOf(':') + 1, OffsetLine.length);
output.offset = parseFloat(offString);

const start = lines.findIndex(element => element.startsWith('#START'));
const end = lines.findIndex(element => element.startsWith('#END'));

const NoteLines = [];

let rendaLength = 0;
for (let index = start + 1; index < end; index += 1) {
  const element = lines[index];
  if (element.length > 0) {
    if (element[0] !== '#') {
      NoteLines.push(element);
    }
  }
}

for (let i = 0; i < NoteLines.length; i += 1) {
  let element = NoteLines[i];
  element = element.substring(0, element.indexOf(',')); // remove everything after ','

  const multi = 48 / element.length;
  for (let n = 0; n < element.length; n += 1) {
    if (element[n] !== '0') {
      switch (element[n]) {
        case '1':
        case '2':
        case '3':
        case '4':
          output.Notes.push({
            types: parseInt(element[n], 10),
            measure: i,
            time: n * multi,
          });
          break;
        case '5':
        case '6':
        case '7':
          output.renda[rendaLength] = {
            start: { measure: i, time: n * multi },
          };
          break;
        case '8':
          output.renda[rendaLength].end = { measure: i, time: n * multi };
          rendaLength += 1;
          break;
        default:
      }
    }
  }
}

output.totalnotes = output.Notes.length;

fs.writeFile('./public/chart/sotsuomeshiki.json', JSON.stringify(output));
