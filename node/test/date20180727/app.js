var http=require('http');

http.createServer(function(req,res){
  // res.writeHead({"content-type":"text/plain","status":200})
  res.end('hello world');

}).listen(3600)