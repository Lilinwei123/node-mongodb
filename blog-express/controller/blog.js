const  {mongoPromise}  = require('../db/mongodb');
const ObjectId = require('mongodb').ObjectId;

const insertblog = async (blogdata = {}) => {
  return new Promise ((resolve, reject) => {
    var listobj = [];
    blogdata.createTime = Date.now();
    listobj.push(blogdata);
  
    mongoPromise().then((db) => {
      var dblog = db.db('blogdata');
  
      dblog.collection("Blogs").insertMany(listobj, function(err, res) {
        if (err) reject(err);
        
        db.close();
        resolve(res) ;
      });
    }).catch((err) => {
      console.log('mongodb commect error!', err);
    })
  })
}

const getList = async (author, keyword) => {
  return new Promise((resolve, reject) => {
    mongoPromise().then((db) => {
      var dblog = db.db('blogdata');
  
      if (author) {
        var whereStr = {'author': author};
      } else {
        whereStr = {};
      }
      dblog.collection("Blogs").find(whereStr).toArray(function(err, result) { 
        if (err) reject(err); 
        
        resolve(result);
        db.close();

      });
  
    }).catch((err) => {
      console.log('mongodb commect error!', err);
    })

  })
}

const getDetail = async (id) => {
  return new Promise((resolve, reject) => {
    mongoPromise().then((db) => {
      var dblog = db.db('blogdata');
  
      var whereStr = {'_id': ObjectId(id)};
      dblog.collection("Blogs").find(whereStr).toArray(function(err, result) { 
        if (err) reject(err); 
        
        db.close();
        resolve(result);
      });
  
    }).catch((err) => {
      console.log('mongodb commect error!', err);
    })

  })
}

const updateBlog = async (id, blogdata = {}) => {
  return new Promise((resolve, reject) => {
    mongoPromise().then((db) => {
      var dblog = db.db('blogdata');
    
      var whereStr = {'_id': id};
      var updateStr = {$set: blogdata};
      //                       updateMany
      dblog.collection("Blogs").updateOne(whereStr, updateStr, function(err, result) { 
        if (err) reject(err); 
        
        db.close();
        resolve(result);
      });
  
    }).catch((err) => {
      console.log('mongodb commect error!', err);
    })
  })
}

const delBlog = async (id) => {
  return new Promise((resolve, reject) => {
    mongoPromise().then((db) => {
      var dblog = db.db('blogdata');

      var whereStr = {"_id": ObjectId(id)};  // 查询条件
      dblog.collection("Blogs").deleteOne(whereStr, function(err, obj) {
        if (err) reject(err);
        console.log("文档删除成功");
        db.close();
        resolve(obj);
      });
    }).catch((err) => {
      console.log('mongodb commect error!', err);
    })
  })
}

module.exports = {
  insertblog,
  getList,
  getDetail,
  updateBlog,
  delBlog
}