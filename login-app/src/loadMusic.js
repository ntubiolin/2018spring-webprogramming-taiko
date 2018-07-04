const tjaFolder = '../public/tja/';
const fs = require('fs');
var readline = require('readline');
var stream = require('stream');
var iconv = require('iconv-lite');
var jconv =require( 'jconv' );
fs.readdir(tjaFolder, (err, files) => {
  files.forEach(file => {
    console.log(">>> Processing: " + file);
    let instream = fs.createReadStream(tjaFolder + file);
    let rl = readline.createInterface(instream);
    let arr = {}
    rl.on('line', function (line) {
      // process line here
      if (/^TITLE:(.*)/.test(line)){
        let jText = /^TITLE:(.*)/.exec(line)[1];
        console.log(jText);
        //console.log(iconv.decode(Buffer.from( /^TITLE:(.*)/.exec(line)[1]), 'Shift_JIS'));
        console.log(jconv.decode(jText, 'UCS2'));

      }
    });

    rl.on('close', function () {
      // do something on finish here
      //console.log('arr', arr);
    });

  });
})