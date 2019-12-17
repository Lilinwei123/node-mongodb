let REDIS_CONF;

if (1) {
// if (env === 'dev') {
  // redis
  REDIS_CONF = {
    port: 6379,
    host: '127.0.0.1'
  }
}

module.exports = {
  REDIS_CONF
}