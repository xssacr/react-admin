import React, { Component } from "react";
import { withRouter, Link, Route, Switch, Redirect } from "react-router-dom";
import { Layout, Menu } from "antd";
import { DesktopOutlined, UserOutlined } from "@ant-design/icons";

import "./home.style.scss";
import HeaderBar from "./header/HeaderBar";
import Category from "./category/Category";
import Recommend from "./recommend/Recommend";
import connect from "../login/redux/connect";

const { Content, Footer, Sider } = Layout;
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
        {/* 左侧菜单 */}
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
        >
          <Menu
            theme="dark"
            defaultSelectedKeys={["category"]}
            openKeys={["datas"]}
            mode="inline"
          >
            <SubMenu key="datas" icon={<DesktopOutlined />} title="数据管理">
              <Menu.Item key="category">
                <Link to="/home/category">菜谱分类管理</Link>
              </Menu.Item>
              <Menu.Item key="datalist">
                <Link to="/home/datalist">推荐数据管理</Link>
              </Menu.Item>
            </SubMenu>
            <Menu.Item key="users" icon={<UserOutlined />}>
              用户管理
            </Menu.Item>
          </Menu>
        </Sider>

        {/* 右侧内容 */}
        <Layout className="site-layout">
          {/* 头部 */}
          <HeaderBar username={this.state.username}></HeaderBar>

          {/* 主要内容 */}
          <Content style={{ margin: "0 16px" }}>
            {/* 配置路由 */}
            <Switch>
              <Route path="/home/category" component={Category}></Route>
              <Route path="/home/datalist" component={Recommend}></Route>
              <Redirect exact from="/home" to="/home/category"></Redirect>
            </Switch>
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
    // 判断用户是否已经登录
    let isLogin = JSON.parse(sessionStorage.getItem("isLogin"));
    if (isLogin) {
      // 已经登录
      let { username } = JSON.parse(sessionStorage.getItem("userInfo"));
      this.setState({ username });
    } else {
      // 没有登录则跳转到登录页面
      this.props.history.push("/login");
    }
  }
}

export default withRouter(connect(Home));
