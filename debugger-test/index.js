const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, {'content-type': 'text/html'});
  res.end('<h1>Hello World</h1>');
});

server.listen(3000, () => {
  doIt();
});


/**
 * 传入参数 n，表示这个函数执行的时间（毫秒）
 * 执行的结果是 n + 200，这个值将用于下一步骤
 */
function takeLongTime(n) {
  return new Promise(resolve => {
      setTimeout(() => resolve(n + 200), 500);
  });
}

function step1(n) {
  console.log(`step1 with ${n}`);
  return takeLongTime(n);
}

function step2(m, n) {
  console.log(`step2 with ${m} and ${n}`);
  return takeLongTime(m + n);
}

function step3(k, m, n) {
  console.log(`step3 with ${k}, ${m} and ${n}`);
  return takeLongTime(k + m + n);
}

async function doIt() {
  console.time("doIt");
  const time1 = 300;
  const time2 = await step1(time1);
  const time3 = await step2(time1, time2);
  const result = await step3(time1, time2, time3);
  console.log(`result is ${result}`);
  console.timeEnd("doIt");
}
