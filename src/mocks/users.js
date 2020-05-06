const Mock = require('mockjs');

Mock.mock('/api/user/login', 'post', params => {
  let { username, password } = JSON.parse(params.body);

  if (username === 'admin' && password === '123456') {
    // 登录成功
    return {
      code: 1,
      message: '登录成功!'
    }
  } else {
    return {
      code: -1,
      message: '登录失败,请确保用户名密码正确!'
    }
  }
})
