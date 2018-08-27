let connectDb = require('./connect');


async function updateInfo(dbName, dbCollection, jsonwhice, jsonval) {
  let client = await connectDb();
  let db = client.db(dbName);
  const collection = db.collection(dbCollection);
  return new Promise(resolve => {
    collection.updateOne(jsonwhice, jsonval, function (err, result) {
      if (err) {
        throw new error(err)
      }
      resolve(result)
    });
  }).catch(function (error) {
    console.log(error);
  })
}


module.exports = updateInfo;