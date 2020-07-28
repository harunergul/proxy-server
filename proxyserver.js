let httpProxy = require("http-proxy");
let http = require("http");
//Logger configuration
var winston = require('winston');
require('winston-daily-rotate-file');

let portNumber = 1980;

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
  let cd = new Date();

  let formatted_date = cd.getDate() + "-" +cd.getMonth() + "-" + cd.getFullYear()+" "+cd.getHours()+":"+cd.getMinutes()

  console.log(formatted_date+ " request from " +request.headers.host);
  let targetUrl = "http://"+request.headers.host;
  proxy.web(request, response, { target: targetUrl });
});

server.on("uncaughtException", function(e) {
  console.log(e);
});

console.log("listening on port "+portNumber);
server.listen(portNumber);
