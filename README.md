# basic-proxy-server
Basic proxy server sample based on NodeJS. The libraries that i used in the application are `http-proxy`,`winston` for logging,`winston-daily-rotate-file` for daily logging errors. You need to provide target address to proxy the request. 

    let server = http.createServer(function(request, response) {
          console.log("Request arrived");
          proxy.web(request, response, { target: "http://192.168.1.37:9005" });
    });
