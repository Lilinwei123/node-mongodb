// var exec = require("child_process").exec;

// function start(response) {
//   console.log("Request handler start was called.");

//   // 异步问题
//   // var content = 'empty';
//   // exec('ls -lah', function(error, stdout, stderr) {
//   //   content = stdout;
//   // });

//   // return content;
//   // 异步问题

//   // 修改后
//   exec("find /", { timeout: 1000, maxBuffer: 20000 * 1024 }, function(
//     error,
//     stdout,
//     stderr
//   ) {
//     response.writeHead(200, { "Content-Type": "text/plain" });

//     response.write('stdout=====' + stdout);
//     response.end();
//   });
// }

// function upload(response) {
//   response.writeHead(200, { "Content-Type": "text/plain" });
//   response.write("Hello Upload");
//   response.end();
// }

// exports.start = start;
// exports.upload = upload;

// var querystring = require("querystring"),
//   fs = require("fs");

// function start(response, postData) {
//   console.log("Request handler 'start' was called.");

//   var body =
//     "<html>" +
//     "<head>" +
//     '<meta http-equiv="Content-Type" ' +
//     'content="text/html; charset=UTF-8" />' +
//     "</head>" +
//     "<body>" +
//     '<form action="/upload" method="post">' +
//     '<textarea name="text" rows="20" cols="60"></textarea>' +
//     '<input type="submit" value="Submit text" />' +
//     "</form>" +
//     "</body>" +
//     "</html>";

//   response.writeHead(200, { "Content-Type": "text/html" });
//   response.write(body);
//   response.end();
// }

// function upload(response, postData) {
//   console.log("Request handler 'upload' was called.");
//   response.writeHead(200, { "Content-Type": "text/plain" });
//   response.write("You've sent the text: " + querystring.parse(postData).text);
//   response.end();
// }

// function show(response, postData) {
//   console.log("Request handler 'show' was called.");
//   fs.readFile("./tmp/test.txt", function(error, data) {
//     if (error) {
//       response.writeHead(500, { "Content-Type": "text/plain" });
//       response.write(error + "\n");
//       response.end();
//     } else {
//       response.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
//       console.log('file: ' + data.toString());
//       response.write(data);
//       response.end();
//     }
//   });
// }

// exports.start = start;
// exports.upload = upload;
// exports.show = show;


// exports.start = start;
// exports.upload = upload;

// var querystring = require("querystring"),
//     fs = require("fs");

// function start(response, postData) {
//   console.log("Request hanlder 'start' was called.");

//   var body = '<html>'+
//     '<head>'+
//     '<meta http-equiv="Content-Type" '+
//     'content="text/html; charset=UTF-8" />'+
//     '</head>'+
//     '<body>'+
//     '<form action="/upload" enctype="multipart/form-data" '+
//     'method="post">'+
//     '<input type="file" name="upload">'+
//     '<input type="submit" value="Upload file" />'+
//     '</form>'+
//     '</body>'+
//     '</html>';

//     response.writeHead(200, {"Content-Type": "text/html"});
//     response.write(body);
//     response.end();
// }

// function upload(response, postData) {
//   console.log("Request hanlder 'upload' was called.");

//   response.writeHead(200, {"Content-Type": "text/plain"});
//   response.write("You've sent the text: " + querystring.parse(postData).text);
//   response.end();
// }

// function show(response, postData) {
//   console.log("Request handler 'show' was called.");
//   fs.readFile("/tmp/putao.jpg", "binary", function(error, file) {
//     if(error) {
//       response.writeHead(500, {"Content-Type": "text/plain"});
//       response.write(error + "\n");
//       response.end();
//     } else {
//       response.writeHead(200, {"Content-Type": "image/jpg"});
//       response.write(file, "binary");
//       response.end();
//     }
//   });
// }

// exports.start = start;
// exports.upload = upload;
// exports.show = show;



var querystring = require("querystring"),
    fs = require("fs"),
    formidable = require("formidable");

function start(response) {
  console.log("Request handler 'start' was called.");

  var body = '<html>'+
    '<head>'+
    '<meta http-equiv="Content-Type" content="text/html; '+
    'charset=UTF-8" />'+
    '</head>'+
    '<body>'+
    '<form action="/upload" enctype="multipart/form-data" '+
    'method="post">'+
    '<input type="file" name="upload" multiple="multiple">'+
    '<input type="submit" value="Upload file" />'+
    '</form>'+
    '</body>'+
    '</html>';

    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(body);
    response.end();
}

function upload(response, request) {
  console.log("Request handler 'upload' was called.");

  var form = new formidable.IncomingForm();
  console.log("about to parse");
  form.parse(request, function(error, fields, files) {
    console.log("parsing done");
    fs.renameSync(files.upload.path, "/tmp/test.png");
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write("received image:<br/>");
    response.write("<img src='/show' />");
    response.end();
  });
}

function show(response) {
  console.log("Request handler 'show' was called.");
  fs.readFile("/tmp/test.png", "binary", function(error, file) {
    if(error) {
      response.writeHead(500, {"Content-Type": "text/plain"});
      response.write(error + "\n");
      response.end();
    } else {
      response.writeHead(200, {"Content-Type": "image/png"});
      response.write(file, "binary");
      response.end();
    }
  });
}

exports.start = start;
exports.upload = upload;
exports.show = show; 




