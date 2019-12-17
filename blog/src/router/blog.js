const { insertblog, getList, getDetail, updateBlog, delBlog } = require('../controller/blog');
const { SuccessModel, ErrorModel} = require('../model/resModel');
const { set, get } = require('../db/redis')

// 统一的登录验证函数
const loginCheck = async (req) => {
  // if (!req.session.username) {
  //   return Promise.resolve(
  //     new ErrorModel('尚未登录')
  //   )
  // }

  var resRedis = await get(req.sessionId);

  if (!resRedis.username) {
    return Promise.resolve(
      new ErrorModel('尚未登录')
    )
  }
}

const handleBlogRouter = async (req, res) => {
  const method = req.method;

  // 新建一个博客
  if (method === 'POST' && req.path === '/api/blog/new') {
    const loginCheckResult = await loginCheck(req);

    if (loginCheckResult) {
      return loginCheckResult
    }

    req.body.author = req.session.username;

    const result = await insertblog(req.body);

    return new SuccessModel(result);
  }

  // 查询博客列表，一条数据
  if (method === 'GET' && req.path === '/api/blog/list') {
    let author = req.query.author;
    const keyword = req.query.keyword;

    if (req.query.isadmin) {
      // 管理员界面
      const loginCheckResult = await loginCheck(req);
  
      if (loginCheckResult) {
        // 未登录
        return loginCheckResult
      }
      //  强制查询自己的博客
      author = req.session.username;
    }

    // 返回promise
    const result = await getList(author, keyword);
    
    return new SuccessModel(result);
  }

  // 查询某个博客的详情
  if (method === 'GET' && req.path === '/api/blog/detail') {
    // const loginCheckResult = await loginCheck(req);

    // if (loginCheckResult) {
    //   return loginCheckResult
    // }

    const id =  parseInt(req.query.id);

    // 返回promise
    const result = await getDetail(id);
    
    return new SuccessModel(result[0]);
  }

  // 更新某条博客数据
  if (method === 'POST' && req.path === '/api/blog/update') {
    // const loginCheckResult = await loginCheck(req);

    // if (loginCheckResult) {
    //   return loginCheckResult
    // }

    const id = parseInt(req.query.id);
    const result = await updateBlog(id, req.body);

    return new SuccessModel(result);
  }

  // 删除某条博客
  if (req.method === 'POST' && req.path === '/api/blog/del') {
    // const loginCheckResult = await loginCheck(req);

    // if (loginCheckResult) {
    //   return loginCheckResult
    // }

    const id = parseInt(req.query.id);
    const result = await delBlog(id);

    return new SuccessModel(result);
  }
}

module.exports = handleBlogRouter;
