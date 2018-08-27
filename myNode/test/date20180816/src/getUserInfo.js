let findInfo = require('../lib/db/findInfo');
const dbName = 'student';
const dbCollection = 'users';
function getFindInfo(req, res) {
  findInfo(dbName,dbCollection,req.query,res)
  // console.log(findInfo(req))
}

module.exports = getFindInfo;