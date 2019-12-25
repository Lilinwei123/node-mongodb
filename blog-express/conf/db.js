const env = process.env.NODE_ENV;

// 配置
let MONGODB_CONF;
let REDIS_CONF;

if (1) {
// if (env === 'dev') {
  // 
  MONGODB_CONF = {
    host: 'localhost',
    user: 'root',
    password: 'Mysql_2018',
    port: '3306',
    database: 'mongodb'
  }

  // redis
  REDIS_CONF = {
    port: 6379,
    host: '127.0.0.1'
  }
}

if (env === 'production') {
  //  mongodb
  MONGODB_CONF = {
    host: 'localhost',
    user: 'root',
    password: 'Mysql_2018',
    port: '3306',
    database: 'myblog'
  }

  // redis
  REDIS_CONF = {
    port: 6379,
    host: '127.0.0.1'
  }
}

module.exports = {
  MONGODB_CONF,
  REDIS_CONF
}