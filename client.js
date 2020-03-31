let httpProxy = require("http-proxy");
let http = require("http");
//Logger configuration
var winston = require('winston');
require('winston-daily-rotate-file');

var transport = new (winston.transports.DailyRotateFile)({
  filename: 'logs/application-%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxSize: '40m',
  maxFiles: '60d',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json())
});

transport.on('rotate', function(oldFilename, newFilename) {
    // do something fun
    console.log("On rotation");
  });
  
  var logger = winston.createLogger({
    transports: [
      transport
    ]
  });


let proxy = httpProxy.createProxyServer({});

proxy.on("error", function(err, req, res) {
  console.log(err);
  res.writeHead(500, {
    "Content-Type": "text/plain"
  });
 
  logger.error(err.name);
  logger.error(err.stack);
  logger.error(err.message); 
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

console.log("listening on port 80");
server.listen(80);
