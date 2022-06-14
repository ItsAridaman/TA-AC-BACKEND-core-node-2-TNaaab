var http = require('http');
var fs = require('fs');
var qs = require('querystring');

var server = http.createServer(handleTRequest)

function handleTRequest(req, res) {
    var store = '';
    req.on('data', (chunk) => {
        store += chunk;

    })

    req.on('end', () => {
        if (req.url === '/form' && req.method === 'GET') {

            res.setHeader('content-type', 'text/html')
            fs.createReadStream('./form.html').pipe(res);

            console.log(pathinfo);

        }
        if (req.url === '/form' && req.method === 'POST') {
            var pathinfo = qs.parse(store);
            res.setHeader('content-type', 'text/html');
            res.write(`<h1>${pathinfo.name}</h1>`);
            res.write(`<h2>${pathinfo.email}</h2>`);
            res.write(`<h3>${pathinfo.age}</h3>`);

            res.end();
        }
    })
}

server.listen('5000', () => {
    console.log("server is  running on port number 5000");
});
