const http = require('http');
const querystring = require('querystring');

const server = http.createServer((req, res) => {
  console.log('...')
});

server.listen(3000);