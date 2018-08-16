const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const url = 'mongodb://127.0.0.1:27017/student';
const dbName = 'student';
const express = require('express');
const app = express();
app.use(express.static('./static'));
// app.use('/static',express.static('./static'));
app.set('view engine', 'ejs');
app.get('/add', function(req, res) {
  res.render('add', {
    name: 'lct',
    list: ['hh', 'dd', 'bb']
  });
});
app.get('/db', function(req, res) {
  // Use connect method to connect to the server
  MongoClient.connect(
    url,
    { useNewUrlParser: true },
    function(err, client) {
      assert.equal(null, err);
      console.log('Connected successfully to server');
      res.send('Connected successfully to server');
      const db = client.db(dbName);

      client.close();
    }
  );
});
app.get('/student/:number', function(req, res) {
  res.set({
    'Content-Type': 'text/html;charset=UTF-8'
  });
  if (/^[\d]{6}$/.test(req.params.number)) {
    console.log(req.params.number);
    res.send('number:' + req.params.number);
  } else {
    res.send('number wrong');
  }
});
app.listen(9000);
