let connectDb = require('../lib/db/connect');

function getUserInfo(req, res) {
  console.log(req.query)
  connectDb().then((client)=>{
    let db=client.db(dbName);
  })
}

module.exports = getUserInfo;