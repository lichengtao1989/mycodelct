const MongoClient = require('mongodb').MongoClient;
// const assert = require('assert');
const url = 'mongodb://localhost:27017';

function connectDb() {
  return new Promise((resolve, reject) => {
    MongoClient.connect(url, {
      useNewUrlParser: true
    }, function (err, client) {
      if (err) {
        reject(err);
      };
      resolve(client)
    });
  })
}
module.exports = connectDb;