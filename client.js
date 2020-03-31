let httpProxy = require("http-proxy");
let http = require("http");

let proxy = httpProxy.createProxyServer({});

proxy.on("error", function(err, req, res) {
  console.log(err);
  res.writeHead(500, {
    "Content-Type": "text/plain"
  });

  res.write("\nERROR: " + err.name);
  res.write("\nERROR: " + err.stack);
  res.end("\nERROR MESSAGE: " + err.message);
});

let server = http.createServer(function(request, response) {
  console.log("Request arrived");
  proxy.web(request, response, { target: "http://192.168.1.37:9005" });
});

server.on("uncaughtException", function(e) {
  // Handle your error here
  console.log(e);
});

console.log("listening on port 8080");
server.listen(80);
