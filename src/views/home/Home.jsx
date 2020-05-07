import React, { Component } from "react";
import { withRouter } from "react-router-dom";
class Home extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
    };
  }
  render() {
    return <div>hello, {this.state.username}</div>;
  }

  componentDidMount() {
    // 验证权限
    this.auth();
  }

  auth() {
    // 判断用户是否有权限
    let userInfo = sessionStorage.getItem("userInfo");
    if (userInfo) {
      userInfo = JSON.parse(userInfo);
      this.setState({
        username: userInfo.username,
      });
    } else {
      // 没有权限，跳转到 登录
      this.props.history.push("/login");
    }
  }
}

export default withRouter(Home);
