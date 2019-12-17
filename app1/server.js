// function start(route, handle) {
//   function onRequest(request, response) {
//     var pathname = url.parse(request.url).pathname;
//     response.writeHead(200, { "Content-Type": "text/plain" });
//     var content = route(handle, pathname);
//     response.write(content);
//     response.end();
//   }

//   http.createServer(onRequest).listen(8888);
//   console.log("Server has started.");
// }

// var http = require("http");
// var url = require("url");

// function start (route, handle) {
//   function onRequest (request, response) {
//     // var pathname = url.parse(request.url).pathname;
//     // // console.log('response=====', response);

//     // route (handle, pathname, response);

//     var postData = "";
//     var pathname = url.parse(request.url).pathname;

//     console.log("Request for " + pathname + " recevied.");

//     request.setEncoding("utf8");

//     request.addListener("data", function(postDataChunk) {
//       postData += postDataChunk;
//       console.log("Recevied POST data chunk '" + postDataChunk + "'.");
//     });

//     request.addListener("end", function () {
//       route(handle, pathname, response, postData);
//     });
//   }

//   http.createServer(onRequest).listen(8888);
//   console.log("Server has started.")
// }

// exports.start = start;

// var http = require("http");
// var url = require("url");

// var formidable = require("formidable"),
//   http = require("http"),
//   util = require("util");

// http
//   .createServer(function(req, res) {
//     if (req.url == "/upload" && req.method.toLowerCase() == "post") {
//       // parse a file upload
//       var form = new formidable.IncomingForm();
//       form.parse(req, function(err, fields, files) {
//         res.writeHead(200, { "content-type": "text/plain" });
//         res.write("Recevied upload: \n\n");
//         res.end(util.inspect({ fields: fields, files: files }));
//       });

//       return;
//     }

//     // show a file upload form
//     res.writeHead(200, { "content-type": "text/html" });
//     res.end(
//       '<form action="/upload" enctype="multipart/form-data" ' +
//         'method="post">' +
//         '<input type="text" name="title"><br>' +
//         '<input type="file" name="upload" multiple="multiple"><br>' +
//         '<input type="submit" value="Upload">' +
//         "</form>"
//     );
//   }).listen(8888);

// var http = require("http");
// var url = require("url");

// function start(route, handle) {
//   function onRequest(request, response) {
//     var postData = "";
//     var pathname = url.parse(request.url).pathname;
//     console.log("Request for " + pathname + " received.");

//     request.setEncoding("utf8");

//     request.addListener("data", function(postDataChunk) {
//       postData += postDataChunk;
//       console.log("Received POST data chunk '" + postDataChunk + "'.");
//     });

//     request.addListener("end", function() {
//       route(handle, pathname, response, postData);
//     });
//   }

//   http.createServer(onRequest).listen(8888);
//   console.log("Server has started.");
// }

// exports.start = start;

var http = require("http");
var url = require("url");

function start(route, handle) {
  function onRequest(request, response) {
    var pathname = url.parse(request.url).pathname;
    console.log("Request for " + pathname + " received.");
    route(handle, pathname, response, request);
  }

  http.createServer(onRequest).listen(8888);
  console.log("Server has started.");
}

exports.start = start;




















