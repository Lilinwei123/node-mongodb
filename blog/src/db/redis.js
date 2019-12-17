let redis = require('redis');
const REDIS_CONF = require('../../config');

// 创建客户端
const redisClient = redis.createClient(REDIS_CONF.port, REDIS_CONF.host);
redisClient.on('error', err => {
  console.log(err);
})

function set (key, value) {
  if (typeof value === 'object') {
    val = JSON.stringify(value);
  }
  
  redisClient.set(key, val, redis.print);
}

function get (key) {
  return new Promise((resolve, reject) => {
    redisClient.get(key, (err, val) => {
      if (err) {
        reject(err);
        return;
      }

      if (val ==  null) {
        resolve(null);
        return;
      }

      try {
        resolve(
          JSON.parse(val)
        )
      } catch (ex) {
        resolve(val)
      }
    })
  })
}

module.exports = {
  set, 
  get
}