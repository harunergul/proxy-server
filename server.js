let http = require('http');

let server = http.createServer(function (request, response) {
    response.writeHead(200, {'Content-Type':'text/plain'});
    response.write('Request successfully proxied');
    response.end();
}).listen(9005);

