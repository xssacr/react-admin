const defaultState = {
  isLogin: false, // 登录的状态,默认 没有登录
}

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case '__user_login_state__':
      return {
        isLogin: action.data
      }
    default:
      return state;
  }
}

export default reducer;