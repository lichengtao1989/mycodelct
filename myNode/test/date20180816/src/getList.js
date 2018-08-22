// let findUserListMongoDb = require('../lib/db/findUserListMongoDb')
// function userListInfo(req, res) {

//   findDocuments()
// }
// module.exports = userListInfo;
const MongoClient = require('mongodb').MongoClient;
// const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'student';
const dbCollection = 'users';
//获取查询总条数
function getCount(db) {
  return new Promise((resolve, reject) => {
    const collection = db.collection(dbCollection);
    collection.countDocuments({}, function (err, count) {
      if (err) {
        reject(err)
      };
      resolve(count)
    })
  })
}

const findUserList = function (req, res) {
  MongoClient.connect(url, {
    useNewUrlParser: true
  }, function (err, client) {
    if (err) {
      throw new Error(err)
    };
    const db = client.db(dbName);
    const collection = db.collection(dbCollection);
    var pageSize = parseInt(req.query.pageSize);
    var pageNum = req.query.pageNum;
    var skipVal = pageNum > 1 ? ((pageNum - 1) * pageSize) : 0;
    collection.find({}).limit(pageSize).skip(skipVal).toArray(function (err, docs) {
      if (err) {
        throw new Error(err);
      }

      if (docs.length > 0) {
        getCount(db).then((r) => {
          res.json({
            msg: 'success',
            resultCode: 200,
            total: r,
            data: {
              rows: docs
            }
          })
        })

      } else {
        res.json({
          msg: '暂无数据',
          resultCode: 201,
          total: 0,
          data: {
            rows: docs
          }
        })
      }
      client.close();
    });

  });

}


module.exports = findUserList;