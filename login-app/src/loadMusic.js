const tjaFolder = '../public/tja/';
const fs = require('fs');
var readline = require('readline');
var stream = require('stream');
var iconv = require('iconv-lite');
fs.readdir(tjaFolder, (err, files) => {
  files.forEach(file => {
    console.log(">>> Processing: " + file);
    fs.readFile(tjaFolder + file, function (err, data) {
      if (err) throw err;
      // console.log( data.toString('UTF-8') );    // (参考)UTF-8の場合はtoString()メソッドで文字列を取り出せる
      let buf = new Buffer(data, 'binary');     //バイナリバッファを一時的に作成する
      let retStr = iconv.decode(buf, "Shift_JIS"); //作成したバッファを使い、iconv-liteでShift-jisからutf8に変換
      console.log(retStr);
      let rl = readline.createInterface(retStr);
      let arr = {}
      rl.on('line', function (line) {
        // process line here
        if (/^TITLE:(.*)/.test(line)) {
          let jText = /^TITLE:(.*)/.exec(line)[1];
          console.log(jText);
          //console.log(iconv.decode(Buffer.from( /^TITLE:(.*)/.exec(line)[1]), 'Shift_JIS'));
          //バイナリバッファを一時的に作成する
          //var retStr = iconv.decode(buf, "Shift_JIS"); //作成したバッファを使い、iconv-liteでShift-jisからutf8に変換
          //console.log(retStr);
        }
      });
    });
    // let instream = fs.createReadStream(tjaFolder + file);
    // let rl = readline.createInterface(instream);
    // let arr = {}
    // rl.on('line', function (line) {
    //   // process line here
    //   if (/^TITLE:(.*)/.test(line)){
    //     let jText = /^TITLE:(.*)/.exec(line)[1];
    //     console.log(jText);
    //     //console.log(iconv.decode(Buffer.from( /^TITLE:(.*)/.exec(line)[1]), 'Shift_JIS'));
    //          //バイナリバッファを一時的に作成する
    //     //var retStr = iconv.decode(buf, "Shift_JIS"); //作成したバッファを使い、iconv-liteでShift-jisからutf8に変換
    //     //console.log(retStr);
    //   }
    // });

    // rl.on('close', function () {
    //   // do something on finish here
    //   //console.log('arr', arr);
    // });

  });
})