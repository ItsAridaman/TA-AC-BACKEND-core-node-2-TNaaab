var http = require('http');
var fs = require('fs');
var url = require('url');
var userpath = __dirname + '/UserDetails/';

var server = http.createServer(handleRequest);

function handleRequest(req, res) {
    var store = '';
    req.on('data', (chunk) => {
        store += chunk;

    })

    var parsedUrl = url.parse(req.url, true);

    req.on('end', () => {
        if (req.url === '/users' && req.method === 'POST') {
            var username = JSON.parse(store).username;
            fs.open(userpath + username + '.json', 'wx', (err, fd) => {
                if (err) return console.log(err);
                fs.writeFile(fd, store, (err) => {
                    if (err) return console.log(err);
                    fs.close(fd, () => {
                        res.end("user created successfully");
                    })
                })
            })
        }
    })

    if (parsedUrl.pathname === '/users' && req.method === 'GET') {
        var username = parsedUrl.query.username;

        fs.readFile(userpath + username + '.json', (err, content) => {
            if (err) return console.log(err);
            res.setHeader('Content-Type', 'application.json');
            res.end(content);
        })
    }

    if (parsedUrl.pathname === '/users' && req.method === 'PUT') {
        var username = parsedUrl.query.username;

        fs.open(userpath + username + '.json', 'r+', (err, fd) => {
            if (err) return console.log(err);
            fs.ftruncate(fd, (err) => {
                if (err) return console.log(err);
                fs.writeFile(fd, store, (err) => {
                    if (err) return console.log(err);
                    fs.close(fd, () => {
                        res.end("user updated successfully")
                    }
                    )
                })
            })
        })
    }

    if (parsedUrl.pathname === '/users' && req.method === 'DELETE') {
        var username = parsedUrl.query.username;
        fs.unlink(userpath + username + '.json', (err) => {
            if (err) return console.log(err);
            res.end("user deleted successfully");
        })
    }

}

server.listen('5555', () => {
    console.log("server is running on port number 5555")
}
);