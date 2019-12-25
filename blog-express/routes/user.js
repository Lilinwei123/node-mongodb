var express = require('express');
var router = express.Router();
const { login } = require('../controller/user');
const { SuccessModel, ErrorModel} = require('../model/resModel');

router.post('/login', async function(req, res, next) {
  const { username, password } = req.body;
  // const { name, password } = req.query;
  const result = await login(username, password);

  if (result && result.name) {
    // 操作cookie
    // res.setHeader('Set-Cookie', `username=${result.name}; path=/; httpOnly; expires=${getCookieExpires()}`);
    // 设置session
    req.session.username = result.name;
    // req.session.realname = data.realName;
    
    console.log('req.session is ', req.session);
    res.json(
      new SuccessModel('登录成功哈哈哈哈～～～！')
    ) 
  } else {
    res.json(
      new ErrorModel('登录失败呜呜呜呜呜～～～！')
    ) 
  } 
});

router.get('/login-test', (req, res, next) => {
  if (req.session.username) {
    res.json({
      errno: 0,
      msg: '已登录'
    });
    return;
  }

  res.json({
    errno: -1, 
    msg: '未登录'
  })
})

// router.get('/session-test', (req, res, next) => {
//   const session = req.session;
//   if (session.viewNum == null) {
//     session.viewNum = 0;
//   }

//   session.viewNum++;
//   res.json({
//     viewNum: session.viewNum
//   })
// })

module.exports = router;