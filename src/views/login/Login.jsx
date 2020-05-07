import React, { Component } from "react";
import { Form, Input, Button, Checkbox, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import "./login.style.scss";
import { post } from "../../utils/http";
import { withRouter } from "react-router-dom";

import connect from "./redux/connect";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: "", // 用户名
      password: "", // 密码
      isChecked: true, // 是否记住密码
      isLoading: false, // loading 的状态
    };
  }

  // 文本框的双向绑定
  changeValue = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  // 修改 记住密码的状态
  changeChecked = () => {
    this.setState({
      isChecked: !this.state.isChecked,
    });
  };

  /* 登录 */
  loginHandler = async () => {
    // 改变 loading 的状态
    this.setState({ isLoading: true });

    // 发送请求
    let result = await post("/api/user/login", {
      username: this.state.username,
      password: this.state.password,
    });

    // 处理响应信息
    if (result.data.code === 1) {
      let { username, password, isChecked } = this.state;

      // 改变 store 中的数据
      this.props.changeLoginState(true);

      // 如果勾选了 记住密码
      if (isChecked) {
        // 存储用户的所有信息
        sessionStorage.setItem(
          "userInfo",
          JSON.stringify({
            username,
            password,
            isChecked,
          })
        );
        // 存储登录的状态
        sessionStorage.setItem("isLogin", this.props.isLogin);
      } else {
        // 没有勾选记住密码
        sessionStorage.setItem(
          "userInfo",
          JSON.stringify({
            username,
            isChecked,
          })
        );
        // 存储登录的状态
        sessionStorage.setItem("isLogin", this.props.isLogin);
      }

      // 在跳转之前改变 loading 的状态
      this.setState({ isLoading: false });
      // 跳转到首页
      this.props.history.push("/home");
      // 提示登录成功

      message.success(result.data.message);
    } else {
      // 改变 loading 的状态
      this.setState({ isLoading: false });
      // 提示登录失败
      message.error(result.data.message);
    }
  };

  render() {
    return (
      <div className="login-container">
        <h1>CATA-APP 后台管理系统</h1>
        <div className="form-box">
          <Form name="normal_login" className="login-form">
            <Form.Item rules={[{ required: true, message: "用户名不能为空" }]}>
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="请输入用户名"
                size="large"
                name="username"
                onChange={this.changeValue}
                value={this.state.username}
              />
            </Form.Item>
            <Form.Item rules={[{ required: true, message: "密码不能为空" }]}>
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="请输入密码"
                size="large"
                name="password"
                onChange={this.changeValue}
                value={this.state.password}
              />
            </Form.Item>
            <Form.Item>
              <Form.Item name="remember" noStyle>
                <Checkbox
                  checked={this.state.isChecked}
                  onClick={this.changeChecked}
                >
                  记住密码
                </Checkbox>
              </Form.Item>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                block
                size="large"
                onClick={this.loginHandler}
                loading={this.state.isLoading}
              >
                立即登录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.getUserInfo();
  }

  getUserInfo() {
    // 获取 sessionStorage 中的用户信息
    let sessionData = sessionStorage.getItem("userInfo");
    // 如果用户信息存在
    if (sessionData) {
      // 解构出来
      let { isChecked, username, password } = JSON.parse(sessionData);
      // 判断存储的 记住密码 的状态
      if (isChecked) {
        // 自动填写表单
        this.setState({ username, password, isChecked });
      } else {
        // 只修改 记住密码 的状态
        this.setState({ isChecked });
      }
    }
  }
}

export default withRouter(connect(Login));
