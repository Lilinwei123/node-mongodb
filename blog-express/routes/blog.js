var express = require('express');
var router = express.Router();
const { insertblog, getList, getDetail, updateBlog, delBlog } = require('../controller/blog');
const { SuccessModel, ErrorModel} = require('../model/resModel');
const loginCheck = require('../middleware/loginCheck')

router.get('/list', async function(req, res, next) {
  let author = req.query.author || '';
  const keyword = req.query.keyword || '';

  if (req.query.isadmin) {
    // 管理员界面
    // const loginCheckResult = await loginCheck(req);

    // if (loginCheckResult) {
    //   // 未登录
    //   return loginCheckResult
    // }

    if (req.session.username == null) {
      // 未登录
      res.json(
        new ErrorModel('未登录')
      );
      return;
    }
    //  强制查询自己的博客
    author = req.session.username;
  }

  // 返回promise
  const result = await getList(author, keyword);
  
  res.json(
    new SuccessModel(result)
  );
});

router.get('/detail', async function(req, res, next) {
  const id = req.query.id;

  // 返回promise
  const result = await getDetail(id);
  
  res.json(new SuccessModel(result[0]));
});

router.post('/new', loginCheck, async (req, res, next) => {
  req.body.author = req.session.username;

  const result = await insertblog(req.body);

  res.json(new SuccessModel(result));
});

router.post('/update', loginCheck, async (req, res, next) => {
  // const id = parseInt(req.query.id);
  const result = await updateBlog(req.query.id, req.body);

  if (result) {
    res.json(
      new SuccessModel(result)
    );
  } else {
    res.json(
      new ErrorModel('更新博客失败！')
    );
  }
  res.json(SuccessModel(result));
})

router.post('/del', loginCheck, async (req, res, next) => {
  const id = req.query.id;
  const result = await delBlog(id);

  if (result) {
    res.json(
      new SuccessModel(result)
    )
  } else {
    res.json(
      new ErrorModel('删除博客失败')
    )
  }
})

module.exports = router;
