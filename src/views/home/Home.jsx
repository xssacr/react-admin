import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Layout, Menu } from "antd";
import { DesktopOutlined, UserOutlined } from "@ant-design/icons";

import "./home.style.scss";
import HeaderBar from './HeaderBar'

const {  Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

class Home extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      collapsed: false,
    };
  }
  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  render() {
    return (
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
        >
          <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
            <Menu.Item key="1" icon={<UserOutlined />}>
              用户管理
            </Menu.Item>
            <SubMenu key="sub2" icon={<DesktopOutlined />} title="数据管理">
              <Menu.Item key="6">菜谱分类管理</Menu.Item>
              <Menu.Item key="8">推荐数据管理</Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout className="site-layout">

          <HeaderBar username={this.state.username}></HeaderBar>
         
          <Content style={{ margin: "0 16px" }}>
            <div
              className="site-layout-background"
              style={{ padding: 24, minHeight: 360 }}
            >
              Bill is a cat.
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Ant Design ©2018 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    );
  }

  componentDidMount() {
    // 验证权限
    this.auth();
  }

  // 验证权限的方法
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
