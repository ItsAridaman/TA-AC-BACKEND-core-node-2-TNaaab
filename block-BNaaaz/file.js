var http=require('http');


http.createServer((req,res)=>
{
res.end("hello there.....");
}).listen(5000,'localhost');

