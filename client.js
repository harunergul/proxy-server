let httpProxy = require('http-proxy');
let http = require('http');

let proxy = httpProxy.createProxyServer({ target: "http://192.168.1.36:9005" });

let server = http.createServer(function (request, response) {
    console.log("Request arrived");
    proxy.web(request, response, { target: 'http://192.168.1.36:9005' })
});

console.log("listening on port 80");
server.listen(80);