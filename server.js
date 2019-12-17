var http = require('http');
var url = require('url');

// http.createServer(function(request, response) {
//   response.writeHead(200, {"Content-Type": "text/plain"});
//   response.write("Hello World");
//   response.end();
// }).listen(8090);
// function start (route) {
//   function onRequest(request, response) {
//     var pathname = url.parse(request.url).pathname;

//     console.log('Request received.');
//     console.log('Request for ' + pathname + ' received');

//     route(pathname);

//     response.writeHead(200, {'Content-Type': "text/plain"});
//     response.write("Hello World!");
//     response.end();
//   }

//   http.createServer(onRequest).listen(8888);
//   console.log('Server has started.');
// }

// http.createServer(onRequest).listen(8888);
// console.log('Server has started.');

// exports.start = start;

var exec = require('child_process').exec;

function start()  {
  console.log("Request handler 'start' was called.");  

  var content = 'empty';
  exec('ls -lah', function (error, stdout, stderr) {
    content = stdout;
  });

  return content;
}

function upload () {
  console.log('Request handler "upload" was called.');

  return 'Hello Upload';
}
   
exports.start = start;
exports.upload = upload;
