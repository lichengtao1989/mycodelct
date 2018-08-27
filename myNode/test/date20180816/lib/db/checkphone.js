let connectDb = require('./connect');
const dbName = 'student';
const dbCollection = 'users';
let checkPhone = async (queryInfo) => {
  let client = await connectDb();
  let queryPart = {
    // userId: queryInfo.userId,
    phone:queryInfo.phone
  };
  console.log(queryPart)
  let docs = await getFind(client, queryPart);
  return docs;
  // return new Promise((resolve) => {

  //   resolve(docs)
  // })
};
let getFind = async (client, query) => {
  let db = client.db(dbName);
  const collection = db.collection(dbCollection);
  return new Promise((resolve) => {
    collection.find(query).toArray(function (err, docs) {
      if (err) {
        throw new Error(err)
      };
      resolve(docs);    
    })
    client.close();
  }).catch(function (error) {
    console.log(error)
  })
}
module.exports = checkPhone;