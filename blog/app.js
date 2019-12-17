const querystring = require("querystring");
const handleBlogRouter = require("./src/router/blog");
const handleUserRouter = require('./src/router/user');
const { set, get } = require('./src/db/redis');
const { access } = require('./src/utils/log');

// session数据
// const SESSION_DATA = {}

const getCookieExpires = () => {
  const d = new Date();
  d.setTime(d.getTime() + (24 * 60 * 60 * 1000));

  console.log('d.toGMTString is ', d.toGMTString());
  return d.toGMTString();
}

const getPostData = req => {
  const promise = new Promise((resolve, reject) => {
    if (req.method !== "POST") {
      resolve({});
      return;
    }

    if (req.headers["content-type"] !== "application/json") {
      resolve({});
      return;
    }

    let postData = "";

    req.on("data", chunk => {
      postData += chunk.toString();
    });

    req.on("end", () => {
      if (!postData) {
        resolve({});
        return;
      }

      resolve(JSON.parse(postData));
    });
  });

  return promise;
};

const serverhandle = async (req, res) => {
  // 记录access log 
  access(`${req.method} -- ${req.url} -- ${req.headers['user-agent']} -- ${Date.now()}`);
  
  // 设置返回格式 JSON
  res.setHeader("Content-type", "application/json");

  const url = req.url;
  req.path = url.split("?")[0];

  req.query = querystring.parse(url.split("?")[1]);

  // 解析cookie
  req.cookie = {};
  const cookieStr = req.headers.cookie || '';
  cookieStr.split(';').forEach(item => {
    if (!item) return
    const arr = item.split('=');
    const key = arr[0].trim();
    const value = arr[1].trim();
    req.cookie[key] = value;
  });

  console.log('req.cookie is ', req.cookie);

  // 解析session
  // let needSetCookie = false;
  // let userId = req.cookie.userId;
  // if (userId) {
  //   if (!SESSION_DATA[userId]) {
  //     SESSION_DATA[userId] = {};
  //   } 
  // } else {
  //   needSetCookie = true;
  //   userId = `${Date.now()}_${Math.random()}`;
  //   SESSION_DATA[userId] = {};
  // }
  // req.session = SESSION_DATA[userId]; 

  // 解析session,使用redis
  let needSetCookie = false;
  let userId = req.cookie.userId;
  if (!userId) {
    needSetCookie = true;
    userId = `${Date.now()}_${Math.random()}`;
    // 初始化 redis 中的session值
    set(userId, {});
  }

  // 获取session
  req.sessionId = userId;
  get(req.sessionId).then(sessionData => {
    if (sessionData == null) {
      // 初始化 redis 中的 session 值
      set (req.sessionId, {});
      // 设置 session
      req.session = {}; 
    } else {
      req.session = sessionData;
    }
    console.log('req.session ', req.session);
  })

  const postData = await getPostData(req);
  req.body = postData;
  

  // 处理blog路由
  const blogData = await handleBlogRouter(req, res);
  if (blogData) {
    if (needSetCookie) {
      res.setHeader('Set-Cookie', `userId=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`);
    }
    res.end(JSON.stringify(blogData));
    return;
  }

  // 处理user路由
  const userData = await handleUserRouter(req, res);
  if (userData) {
    if (needSetCookie) {
      res.setHeader('Set-Cookie', `userId=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`);
    }
    res.end(JSON.stringify(userData));
    return;
  }

  // 未命中路由，返回 404
  res.writeHead(404, { "Content-type": "text/plain" });
  res.write("404 NotFound\n");
  res.end();
};

module.exports = serverhandle;
