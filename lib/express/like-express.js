const http = require('http');
const slice = Array.prototype.slice;

class LikeExpress {
  constructor() {
    // 存放中间件的列表
    this.routes = {
      all: [], //app.use(...),存放use里面的中间件
      get: [], //app.get(...)
      post: []
      // 此处可扩展
    }
  }

  register(path) {
    const info = {};
    console.log('path======', path)
    if (typeof path === 'string') {
      info.path = path;
      // 取出参数中第二个开始的参数们：app.get('/api/get-cookie', loginCheck, (req, res, next)
      // 从第二个参数开始，转换为数组，存入stack
      info.stack = slice.call(arguments, 1); //数组
    } else {
      // 根目录
      info.path = '/';
      // 从第二个参数开始，转换为数组，存入stack
      info.stack = slice.call(arguments, 0);
    }
    // console.log('info========', info);
    return info;
  }

  use () {
    // 当前函数所有参数都传入register函数中
    // const info = this.register.apply(this, arguments);
    const info = this.register(...arguments);
    this.routes.all.push(info);
    console.log('this.routes: ', this.routes.all[0].stack);
  }

  get () {
    // const info = this.register.apply(this, arguments);
    const info = this.register(...arguments);
    this.routes.get.push(info);
  }

  post() {
    const info = this.register.apply(this, arguments);
    this.routes.post.push(info);
  }

  match(method, url) {
    let stack = [];
    if (url === '/favicon.ico') {
      return stack
    }

    // 获取routes
    let curRoutes = [];
    curRoutes = curRoutes.concat(this.routes.all);
    // 需要get还是post，直接传入method
    curRoutes = curRoutes.concat(this.routes[method]);

    curRoutes.forEach(routeInfo => {
      if (url.indexOf(routeInfo.path) === 0) {
        // url === '/api/get-cookie' 且 routeInfo.path === '/'
        // url === '/api/get-cookie' 且 routeInfo.path === '/api'
        // url === '/api/get-cookie' 且 routeInfo.path === '/api/get-cookie'
        // console.log('routeInfo.stack: ', routeInfo.stack)
        stack = stack.concat(routeInfo.stack)
      }
    })
    
    return stack;
  }

  // 核心的next机制
  handle(req, res, stack) {
    const next = () => {
      // 拿到第一个匹配的中间件
      const middleware = stack.shift();

      if (middleware) {
        // 执行中间件函数
        middleware(req, res, next);
      }
    }
    next()
  }

  callback() {
    return (req, res) => {
      res.json = (data) => {
        res.setHeader('Content-type', 'application/json');
        res.end(
          JSON.stringify(data)
        )
      }
      const url = req.url;
      const method = req.method.toLowerCase();
      // 通过mehtod, url去区分哪些需要访问哪些不需要访问
      console.log('method: ', method);

      const resultList = this.match(method, url);
      // 待定
      this.handle(req, res, resultList)
    }
  }

  listen(...args) {
    const server = http.createServer(this.callback());
    server.listen(...args)
  }
}

// 工厂函数
module.exports = () => {
  return new LikeExpress
}

// $ node test.js
// this.routes:  {"all":[{"path":"/","stack":[null]}],"get":[],"post":[]}
// this.routes:  {"all":[{"path":"/","stack":[null]},{"path":"/","stack":[null]}],"get":[],"post":[]}
// this.routes:  {"all":[{"path":"/","stack":[null]},{"path":"/","stack":[null]},{"path":"/api","stack":[null]}],"get":[],"post":[]}