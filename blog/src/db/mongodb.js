var MongoClient = require('mongodb').MongoClient;
// 连接的url
var url = "mongodb://127.0.0.1:27017";  

// 调用封装好的connect按照url建立和MongoDB之间的连接
function mongoPromise () {
  return new Promise((resolve, reject) => {
    MongoClient.connect(url, { useNewUrlParser: true }, (err, db) => {    
      if (err) {
          reject(err);
          return;
      }
  
      resolve(db);
    })
  })
}

module.exports = {
  mongoPromise
}

// mongoPromise.then((db) => {
//   var dblog = db.db('blogdata');

//   dblog.collection("site").find({}).toArray(function(err, result) { 
//     if (err) throw err;

//     console.log('result====', result);
//     db.close();
//   });
// }).catch((err) => {
//   console.log('mongodb commect error!')
// })




// MongoClient.connect(url, { useNewUrlParser: true }, (err, db) => {    
//     if (err) {
//         throw err;
//     }
//     console.log("数据库连接建立");

//     // 创建blogdata数据库
//     var dblog = db.db('blogdata');
    
//     // var listobj = [
//     //   {id: 1, title: '标题1', content: '内容1', createTime: 1546610491112, author: '作者1'},
//     //   {id: 2, title: '标题2', content: '内容2', createTime: 1546610491112, author: '作者2'}
//     // ];

//     // 插入数据
//     // dblog.collection("site").insertMany(listobj, function (err, res) {
//     //   if (err) throw err;
//     //   console.log('文档插入成功');
//     //   db.close();
//     // });

    

//     // 删除id值是1的数据
//     // var whereStr = {"id": 1}; // 查询条件
//     // dblog.collection("site").deleteOne(whereStr, function(err, obj) {
//     //     if (err) throw err;
//     //     console.log("文档删除成功");
//     //     db.close();
//     // });

//     // 返回集合中所有数据
//     const a =  new Promise((resolve, reject) => {

//       dblog.collection("site").find({}).toArray(function(err, result) { 
//         if (err) {
//           reject(err);
//           return;
//         }

//         resolve(result);
//         db.close();
//       });

//     })

//     a.then((data) => {
//       console.log('data=====', data);
//       // getDbList = data;
//     }).catch((err) => { 
//       console.log(err);
//     })
// })


