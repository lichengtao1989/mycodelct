let connectDb = require('./connect');


function findInfo(dbName, dbCollection, queryObj, res) {
  connectDb().then((client) => {
    let db = client.db(dbName);
    const collection = db.collection(dbCollection);
    collection.find(queryObj).toArray(function (err, docs) {
      // assert.equal(err, null);
      if (err) {
        console.log(err);
      };
      if (docs.length > 0) {
        res.json({
          resultCode: 200,
          msg: 'success',
          data: docs[0]
        });
      }else{
        res.json({
          resultCode: 201,
          msg: '没有此信息',
          data: {}
        });
      }
      client.close();
    })

  })
};


module.exports = findInfo;