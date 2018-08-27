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