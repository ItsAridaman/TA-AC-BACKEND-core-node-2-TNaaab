var http = require('http');
var qs = require('querystring');

// function handleRequest(res,req)
// {
//     res.write("hello")
//     res.end();
// };

// var server=http.createServer(handleRequest);

// server.listen(7000,'localhost');

http.createServer((request, response) => {
    var store = "";
    request.on('data', (chunk) => {
        store = store + chunk;

    });

    request.on('end', () => {
        console.log(store);
        var parsedData = qs.parse(store);
        console.log(parsedData);
        console.log(JSON.stringify(parsedData));
    });



}
).listen(7000, 'localhost');
