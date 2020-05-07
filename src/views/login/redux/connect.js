import { connect } from 'react-redux';

const mapState = state => {
  return {
    isLogin: state.login.isLogin
  }
}

const mapDispatch = dispatch => {
  return {
    changeLoginState: (data) => {
      dispatch({ type: '__user_login_state__', data });
    }
  }
}

export default connect(mapState,mapDispatch)