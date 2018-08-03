var http = require('http');
var fs = require('fs');

function read (files,options) {
  console.log(files);
  return new Promise((resolve, reject) => {
    fs.readFile(files, options, (err,data)=>{
      if(err) reject(err);
      resolve(data)
    })
  })
}
http.createServer(function (req, res) {
  // res.writeHead({"content-type":"text/plain","status":200})
  res.setHeader("Content-Type", "text/html;chartset=UTF-8")
  read('./test.html','utf8').then((data)=>{
    // console.log(data);
    res.end(data);
  })

  
  

}).listen(9900)