const { login } = require('../controller/user');
const { SuccessModel, ErrorModel} = require('../model/resModel');
const { set, get } = require('../db/redis')

// 获取cookie过期时间
const getCookieExpires = () => {
  const d = new Date();
  d.setTime(d.getTime() + (24 * 60 * 60 * 1000));

  console.log('d.toGMTString is ', d.toGMTString());
  return d.toGMTString();
}

const handleUserRouter = async (req, res) => {
  var method = req.method;
  var path = req.path;

  if (method === 'POST' && path === '/api/user/login') {
    const { username, password } = req.body;
    // const { name, password } = req.query;
    const result = await login(username, password);

    if (result && result.name) {
      // 操作cookie
      // res.setHeader('Set-Cookie', `username=${result.name}; path=/; httpOnly; expires=${getCookieExpires()}`);
      // 设置session
      req.session.username = result.name;
      // req.session.realname = data.realName;
      
      // 同步到redis中
      set(req.sessionId, req.session);

      console.log('req.session is ', req.session);
      return new SuccessModel('登录成功！');
    } else {
      return new ErrorModel('登录失败！');
    }  
  }

  // 登录验证的测试
  // if (method === 'GET' && req.path === '/api/user/login-test') {
  //   var resRedis = await get(req.sessionId);

  //   if (resRedis.username) {
  //     return new SuccessModel({
  //       session: resRedis
  //     })
  //   }
  //   return new ErrorModel('尚未登录');
  // }
}

module.exports = handleUserRouter;


