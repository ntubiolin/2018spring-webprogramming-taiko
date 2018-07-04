var cors = require('cors')
const axios = require('axios');
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const bodyParser = require('body-parser');
const moment = require('moment');
const crypto = require('crypto');
var path = require('path');
var ObjectID = require('mongodb').ObjectID; 
var DB_URL = "mongodb://webprogramming:w1e2b3p4ro@ds159400.mlab.com:59400/mymondb";
DB_URL =  "mongodb://localhost:27017/mymondb";
var now = moment();
var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');
var googleAPIURL = "996100624897-1o5d50v1lnk813m8vu1q71h5anov542v.apps.googleusercontent.com"
var generate_key = function () {
  var sha = crypto.createHash('sha256');
  sha.update(Math.random().toString());
  return sha.digest('hex');
};

var data1 = require('./login-app/public/chart/10tai.json');
var data2 = require('./login-app/public/chart/angel.json');
var data3 = require('./login-app/public/chart/badapple.json');
var data4 = require('./login-app/public/chart/clsmnk.json');
var data5 = require('./login-app/public/chart/Gloria.json');
var data6 = require('./login-app/public/chart/Iceon.json');
var data7 = require('./login-app/public/chart/kim4ra.json');
var data8 = require('./login-app/public/chart/mikuse.json');
var data9 = require('./login-app/public/chart/natsumatsuri.json');
var data10 = require('./login-app/public/chart/pastel.json');
var data11 = require('./login-app/public/chart/shing2.json');
var data12 = require('./login-app/public/chart/sotsuomeshiki.json');

const tempsongs = [
  {
    title: '天体観測',
    desc: '',
    category: 2,
    course: 'Hard', level: 4, file: 'music/10tai.ogg',
    chart: data1,
  },
  {
    title: 'エンジェル ドリーム',
    desc: '',
    category: 1,
    course: 'Easy', level: 3, file: 'music/angel.ogg',
    chart: data2,
  },
  {
    title: 'Bad Apple!! feat.nomico',
    desc: '東方Projectアレンジ Alstroemeria Records',
    category: 5,
    course: 'Normal', level: 5, file: 'music/badapple.ogg',
    chart: data3,
  },
  {
    title: 'カレ・カノ・カノン',
    desc: '',
    category: 6,
    course: 'Normal', level: 4, file: 'music/clsmnk.ogg',
    chart: data4,
  },
  {
    title: 'Gloria',
    desc: 'K.Key',
    category: 1,
    course: 'Oni', level: 10, file: 'music/Gloria.ogg',
    chart: data5,
  },
  {
    title: '月に叢雲華に風 (Arranged: Iceon)',
    desc: '東方Projectアレンジ 幽閉サテライト feat.senya',
    category: 5,
    course: 'Hard', level: 6, file: 'music/Iceon.ogg',
    chart: data6,
  },
  {
    title: '君の知らない物語',
    desc: '「化物語」より',
    category: 3,
    course: 'Easy', level: 3, file: 'music/kim4ra.ogg',
    chart: data7,
  },
  {
    title: '千本桜',
    desc: '黒うさP feat.初音ミク',
    category: 4,
    course: 'Easy', level: 3, file: 'music/mikuse.ogg',
    chart: data8,
  },
  {
    title: '夏祭り',
    desc: '',
    category: 2,
    course: 'Normal', level: 2, file: 'music/natsumatsuri.ogg',
    chart: data9,
  },
  {
    title: 'パステル ドリーム',
    desc: '',
    category: 1,
    course: 'Oni', level: 8, file: 'music/pastel.ogg',
    chart: data10,
  },
  {
    title: '紅蓮の弓矢',
    desc: '「進撃の巨人」より',
    category: 2,
    course: 'Easy', level: 5, file: 'music/shing2.ogg',
    chart: data11,
  },
  {
    title: 'そつおめしき',
    desc: 'feat.unmo',
    category: 3,
    course: 'Oni', level: 10, file: 'music/sotsuomeshiki.ogg',
    chart: data12,
  },
]
var initSongList = function (songList) {
  MongoClient.connect(DB_URL, function (err, db) {
    assert.equal(null, err);
    console.log("Connected successfully to server");
    // Get the documents collection
    var collection = db.collection('songList');
    songList.map((song)=>{
      collection.update(
        song,
        {
          $set: {
            joinedTime: now.format("YYYY-MM-DD HH:mm:ss Z"),
          }
        },
        { upsert: true }, function (err, result) {
          assert.equal(err, null);
          db.close();
        });
    });
    
  });
}
initSongList(tempsongs);
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/songList', (req, res) => {
  getSongList((result)=>{
    res.send(result);
  });
});
//TODO: clearState:0.1.2
app.post('/userScores', (req, res) => {
  filterUserScoresByName(req.body.id_token, (result)=>{
    res.send(result);
  });
});

app.post('/scoreSubmission', (req, res) => {
  updateScoreById(req.body.person_id, req.body.song_id, req.body.score, req.body.clear_state, (result) => {
    res.send(result);
  });
});

app.post('/registration/', (req, res) => {
  //console.log(JSON.parse(req.body));
  //  console.log(req.body);
  let id_token = req.body.id_token;
  let sessionId = generate_key();
  console.log(">>> GOOGLE verification");
  axios.get('https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=' + id_token)
    .then(response => {
      if (response.data.aud === googleAPIURL) {
        MongoClient.connect(DB_URL, function (err, db) {
          assert.equal(null, err);
          console.log("Connected successfully to server");
          getSongIds(db,(songIds) =>{
            let userData = {
              email: response.data.email,
              name: response.data.name,
              photoURL: response.data.picture,
            }
            var initScore = songIds.map((id) => {
              return {
                songId: id,
                score: 0,
                clear_state: 0
              }
            })
            console.log(">>> Printing userData")
            console.log(userData);
            insertUsrOnce(db, userData, sessionId, initScore, function () {
              db.close();
            });
          });

          
         
        });
      } else {
        console.log(">>> WARNING: token source not verified!")
      }


    }
    ).then(() => {
      let returnJson = { loginStatus: 'success', sessionId: sessionId };
      console.log(">>> registration return obj:");
      console.log(returnJson);
      res.send(returnJson)
    }
    )
    .catch((error) => {
      console.error(error);
      res.send({ loginStatus: 'failed' })
    });

});

app.listen(port, () => console.log(`Listening on port ${port}`));

var insertUsrOnce = function (db, userData, sessionId, initScore, callback) {
  // Get the documents collection
  var collection = db.collection('documents');
  collection.update(
  //TODO:  $set: { lastLoginTime: now.format("YYYY-MM-DD HH:mm:ss Z")}, and SESSION KEY
    userData,
    {
      $set: {
        joinedTime: now.format("YYYY-MM-DD HH:mm:ss Z"),
        sessionId: sessionId
      },
      $setOnInsert: {
        scores: initScore
      }
    },
    { upsert: true }, function (err, result) {
      assert.equal(err, null);
      callback(result);
    });
}

var filterPostsByName = function (db, name, callback) {
  console.log(">>> In filterPost, and name: " + name);

  // Get the documents collection
  var collection = db.collection('documents');
  //TODO:  $set: { lastLoginTime: now.format("YYYY-MM-DD HH:mm:ss Z")}, and SESSION KEY
  collection.find(
    { name: name },
    { post: 1, _id: 0 }
  ).toArray((err, result) => {
    assert.equal(err, null);
    console.log(result)
    callback(result);
  });

}
var getUserList = function (db, callback) {
  console.log(">>> In getUserList()");

  // Get the documents collection
  var collection = db.collection('documents');
  //TODO:  $set: { lastLoginTime: now.format("YYYY-MM-DD HH:mm:ss Z")}, and SESSION KEY
  collection.find(
    {},
    { name: 1, _id: 0 }
  ).toArray(
    (err, result) => {
      assert.equal(err, null);
      console.log(result)
      callback(result);
    });

}
var filterUserScoresByName = function (idToken, callback) {
  console.log(">>> In filterUserScoresByName()");
  MongoClient.connect(DB_URL, function (err, db) {
    assert.equal(null, err);
    console.log(">>> Connected successfully to server");
    console.log(idToken);
    // Get the documents collection
    var collection = db.collection('documents');
    collection.find(
      { sessionId: idToken },
    ).toArray((err, result) => {
      assert.equal(err, null);
      if(result[0]){
        console.log(result[0].scores);
        db.close();
        callback(result[0].scores);
      }else{
        callback({status: sji })
      }
      
    });
  });
}
var getSongList = function (callback) {
  console.log(">>> In getSongList()");
  MongoClient.connect(DB_URL, function (err, db) {
    assert.equal(null, err);
    console.log(">>> Connected successfully to server");
    // Get the songList collection
    var collection = db.collection('songList');
    collection.find(
      {},
      {}
    ).toArray((err, result) => {
      assert.equal(err, null);
      console.log(result);
      db.close();
      result = result.sort(function (a, b) { return (a.category > b.category) ? 1 : ((b.category > a.category) ? -1 : 0); });
      callback(result);
    });
  });
}
var getSongIds = (db, callback) =>{
  var collection = db.collection('songList');
  collection.find(
    {},
    {}
  ).project({_id:1}).toArray((err, result) => {
    assert.equal(err, null);
    console.log(result.map((id)=>id._id))
    callback(result.map((id) => id._id));
  });
}
var updateScoreById = (person_id, song_id, score, clear_state, callback)=> {
  console.log(">>> In updateScoreById()");
  MongoClient.connect(DB_URL, function (err, db) {
    assert.equal(null, err);
    console.log(">>> Connected successfully to server");
    // Get the songList collection
    var collection = db.collection('documents');
    collection.updateOne(
      { sessionId: person_id, "scores.songId": ObjectID(song_id)},
      { "$max": { "scores.$.score": score, "scores.$.clear_state": clear_state} },
      function (err, result) {
        assert.equal(err, null);
        db.close();
        //console.log(">>> updateSCoreResult:");
        //console.log(result);
        callback(result);
      });
  });
}
var insertPost = function (db, sessionId, post, callback) {
  // Get the documents collection
  var collection = db.collection('documents');
  //TODO:  $set: { lastLoginTime: now.format("YYYY-MM-DD HH:mm:ss Z")}, and SESSION KEY
  collection.update(
    { sessionId: sessionId },
    {
      $push: {
        post: post,
      }
    },
    { upsert: true }, function (err, result) {
      assert.equal(err, null);
      callback(result);
    });
}