// nodejs读取文件的例子
const fs = require('fs');
const path = require('path');

// function getFileContent (fileName, callback) {
//   const fullFileName = path.resolve(__dirname, 'file', fileName);
//   fs.readFile(fullFileName, (err, data) => {
//     if (err) {
//       console.error(err);
//       return;
//     }
  
//     // console.log(data.toString());
//     callback (
//       JSON.parse(data.toString())
//     )
//   })
// }

// getFileContent('a.json', aData => {
//   console.log('a data', aData);
//   getFileContent(aData.next, bData => {
//     console.log('b data', bData);
//     getFileContent(bData.next, cData => {
//       console.log('c data', cData);
//     })
//   })
// })

// 用promise获取文件内容
function getFileContent(fileName) {
  const promise = new Promise((resolve, reject) => {
    const fullFileName = path.resolve(__dirname, 'file', fileName);
  
    fs.readFile(fullFileName, (err, data) => {
      if (err) {
        reject(err)
      }
  
      resolve(
        JSON.parse(data.toString())
      )
    })
  })

  return promise;
}

getFileContent('a.json').then(aData => {
  console.log('a data', aData);
  return getFileContent(aData.next)
}).then(bData => {
  console.log('b data', bData);
  return getFileContent(bData.next);
}).then(cData => {
  console.log('c json', cData);
})