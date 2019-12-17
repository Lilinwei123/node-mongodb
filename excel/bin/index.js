var http = require('http');
const xlxs = require('xlsx');
const {readFile} = require('fs').promises;

(async function (params) {
    
  // 获取数据
  const excelBuffer = await readFile('./excel/111.xls');
  
  // 解析数据
  const result = xlxs.read(excelBuffer,{
      type:'buffer',
      cellHTML:false,
  });
  
  console.log('TCL: result', result);

})();

http.createServer(function(request, response) {
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write("Hello World");
  response.end();
}).listen(8080);





