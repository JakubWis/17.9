var http = require('http');
var colors = require('colors');

var handlers = require('./handlers');
var fs = require('fs');

function start() {
  function onRequest(request, response) {
    console.log("Odebrano zapytanie.".green);
    console.log("Zapytanie " + request.url + " odebrane.");

    response.writeHead(200, {"Content-Type": "text/plain; charset=utf-8"});

    switch (request.url) {
        case '/':
        case '/start':
            handlers.welcome(request, response);
            break;
        case '/style.css':
            response.writeHead(200, {"Content-Type": "text/css; charset=utf-8"});
            fs.readFile('css/index.css', function(err, css) {
              response.write(css);
              response.end();
            }); 
            break;
        case '/upload.css':
            response.writeHead(200, {"Content-Type": "text/css; charset=utf-8"});
            fs.readFile('css/upload.css', function(err, css) {
              response.write(css);
              response.end();
            }); 
            break;  
        case '/upload':
            handlers.upload(request, response);
            break;
        case '/show':
		    handlers.show(request, response);
		    break;
        default:
            handlers.error(request, response);
    }
  }

  http.createServer(onRequest).listen(9000);

  console.log("Uruchomiono serwer!".green);
}

exports.start = start;