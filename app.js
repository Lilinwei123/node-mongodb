// get请求
// const http = require('http');
// const querystring = require('requirestring');

// const server = http.createServer((req, res) => {
//   console.log('method: ', req.method);
//   const url = req.url;
//   console.log('url: ', url);
//   req.query = querystring.parse(url.split('?')[1]);
//   console.log('req.query: ', req.query);
//   res.end(
//     JSON.stringify(req.query)
//   );
// });

// server.listen(3000);
// console.log('OK');


// post
// const http = require('http');

// const server = http.createServer((req, res) => {
//   if (req.method === 'POST') {
//     // req 数据格式
//     console.log('req content-type: ', req.headers['content-type']);
//     // 接受数据
//     let postData = '';
//     req.on('data', chunk => {
//       postData += chunk.toString();
//     });
//     req.on('end', () => {
//       console.log('postData===', postData);
//       res.end('Hello World!');
//     })
//   }
// })

// server.listen(3000);
// console.log('OK');

// const http = require('http');
// const querystring = require('querystring');

// const server = http.createServer((req, res) => {
//   const method = req.method;
//   const url = req.url;
//   const path = url.split('?')[0];
//   const query = querystring.parse(url.split('?')[1]);

//   // 设置返回格式为 JSON
//   res.setHeader('Content-type', 'application/json'); //..

//   // 返回的数据
//   const resData = {
//     method,
//     url,
//     path, 
//     query
//   };

//   // 返回
//   if(method === 'GET') {
//     res.end(
//       JSON.stringify(resData) //text.html
//     )
//   }

//   if(method === 'POST') {
//     let postData  = '';
//     req.on('data', chunk => {
//       postData += chunk.toString();
//     })

//     req.on('end', () => {
//       resData.postData = postData;

//       // 返回
//       res.end(
//         JSON.stringify(resData)
//       )
//     })
//   }

// })

// server.listen(3000);
// console.log('OK');


const http = require('http');
const querystring = require('querystring');

const server = http.createServer((req, res) => {
  const method = req.method;
  const url = req.url;
  const path = url.split('?')[0];
  const query = querystring.parse(url.split('?')[1]);

  // 设置返回数据格式为 json
  res.setHeader('Content-type', 'application/json');

  // 返回的数据
  const resData = {
    method,
    url,
    path,
    query
  }

  // 返回
  if (method === 'GET') {
    res.end(
      JSON.stringify(resData)
    )
  }

  if (method === 'POST') {
    let postData = ''

    req.on('data', chunk => {
      postData += chunk.toString();
    })

    req.on('end', () => {
      resData.postData = postData;
      // 返回
      res.end(
        JSON.stringify(resData)
      )
    })
  }
});

server.listen(8000);
console.log('ojbk');