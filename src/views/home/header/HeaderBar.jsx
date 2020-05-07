import React, { Component } from "react";
import { Layout, Dropdown, Row, Col, Menu, Modal,message } from "antd";
import { DownOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { withRouter } from "react-router-dom";

class HeaderBar extends Component {
  // 退出的逻辑
  logoutHandler = ({ key }) => {
    if (key === "logout") {
      // 温馨提示
      Modal.confirm({
        title: "确定要退出吗?",
        icon: <ExclamationCircleOutlined />,
        cancelText: "取消",
        okText:'确定',
        onOk: () => {
          // 清除 cookie 的数据
          sessionStorage.removeItem('isLogin')
          // 退出成功的提示
          message.success('退出成功!')
          // 跳转到 登录
          this.props.history.push("/login");
        },
        onCancel() {},
      });
    }
  };

  render() {
    return (
      <Layout.Header className="site-layout-background" style={{ padding: 0 }}>
        <Row>
          <Col span={6} offset={18}>
            <Dropdown
              overlay={
                <Menu onClick={this.logoutHandler}>
                  <Menu.Item key="logout">退出登录</Menu.Item>
                </Menu>
              }
              className="userinfo-menu"
            >
              <span
                className="ant-dropdown-link header-userinfo"
                onClick={(e) => e.preventDefault()}
              >
                hello {this.props.username} <DownOutlined />
              </span>
            </Dropdown>
          </Col>
        </Row>
      </Layout.Header>
    );
  }
}

export default withRouter(HeaderBar);
