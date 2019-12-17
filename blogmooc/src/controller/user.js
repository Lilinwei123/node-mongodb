const loginCheck = (username, password) => {
  console.log('username passwprd', username, password);
  // 先实用加数据
  if (username === 'zhangsan' && password === '123') {
    return true;
  } else {
    return false;
  }
}

module.exports = {
  loginCheck
}