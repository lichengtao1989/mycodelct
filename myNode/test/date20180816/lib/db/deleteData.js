// const MongoClient = require('mongodb').MongoClient;


// Database Name
// const dbName = 'student';

// Use connect method to connect to the server

function deleteData(db, docName, query) {
  return new Promise((resolve, reject) => {
    let collection = db.collection(docName);
    // console.log(db, docName, query)
    collection.remove(query, function (err, result) {
      if (err) {
        console.log(err);
        reject(err);
      }
      resolve(result);
    });
  })
}
module.exports = deleteData;