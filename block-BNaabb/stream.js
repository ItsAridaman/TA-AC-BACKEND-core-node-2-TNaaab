var http=require('http');
var server=http.createServer(handleReq);

function handleReq(req,res) {

    var store='';
    req.on('data',(chunk)=>{
       store=store + chunk;
   });
   req.on('end',()=>
   {
       console.log(store);
   })

   if(req.method==='POST' && req.url==='./route')
    {
        res.setHeader('content-type', 'text/html');
        res.write(store);
        res.end();
    }
}


server.listen(3456,'localhost');