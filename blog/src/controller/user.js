const  { mongoPromise }  = require('../db/mongodb')

const login = async (username, password) => {
  return new Promise ((resolve, reject) => {
    mongoPromise().then((db) => {
      var dbUser = db.db('blogdata');
      var whereStr = {'name': username, 'password': password}; 
  
      dbUser.collection("Users"). find(whereStr).toArray(function(err, res) { // 返回集合中所有数据
        if (err) reject(err);
        
        resolve(res[0]);
        db.close();
      });
    })

  })
}

module.exports = {
  login
}