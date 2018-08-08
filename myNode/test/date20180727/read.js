var fs = require('fs');

function readFn(files, options) {
  // console.log(files);
  return new Promise((resolve, reject) => {
    fs.readFile(files, options, (err, data) => {
      if (err) reject(err);
      resolve(data);
    });
  });
}
// exports.readFn = readFn;
module.exports = readFn;
