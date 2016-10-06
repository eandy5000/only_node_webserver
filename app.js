var http = require('http');

http.createServer(function(req, res){
    res.writeHead(200, {'Content-Type': 'text/plain'});
   // res.write("another message");
    res.end("Hi...\n");
}).listen(3000);
console.log("working");

function home(req, res){
    res.writeHead(200, {"Content-Type": "text/plain"});
    res.write("Header\n");
    res.write("Search\n");
    res.end("Footer\n");
};