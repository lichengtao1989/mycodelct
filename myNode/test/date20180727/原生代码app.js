var formidable = require('formidable'),
  http = require('http'),
  util = require('util');
var fs = require('fs');
var path = require('path');

var read = require('./read');

http
  .createServer(function(req, res) {
    // res.writeHead({"content-type":"text/plain","status":200})
    res.setHeader('Content-Type', 'text/html;chartset=UTF-8');
    if (req.url == '/upload.html') {
      console.log('upload');
      read('./upload.html', 'utf8').then(data => {
        // console.log(data);
        res.end(data);
      });
    } else if (req.url == '/doupload' && req.method.toLowerCase() == 'post') {
      var form = new formidable.IncomingForm();
      form.uploadDir = __dirname + '/upload/';
      form.parse(req, function(err, fields, files) {
        if (err) {
          throw new Error('error');
        }

        let extname = path.extname(files.upload.name);
        let newPath = files.upload.path + extname;
        // console.log(extname);
        fs.rename(files.upload.path, newPath, function(err, data) {
          if (err) {
            throw new Error('error');
          }
          res.end('upload success');
          // res.writeHead(200, { 'content-type': 'text/plain' });
          // res.write('received upload:\n\n');
          // res.end(util.inspect({ fields: fields, files: files }));
        });
      });

      return;
    } else {
      res.end('welcome');
    }
  })
  .listen(9900);
