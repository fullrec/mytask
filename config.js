const config = {
  // mongodb 
  db: 'mongodb://127.0.0.1/mytask_dev',

  // 端口
  port: 3000
}

if (process.env.NODE_ENV === 'test') {
  config.db = 'mongodb://127.0.0.1/mytask_test';
}

module.exports = config;