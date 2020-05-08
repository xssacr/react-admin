import React, { Component } from "react";
import { Table, Button, Input } from "antd";
import "./category.style.scss";

const data = [
  {
    key: "1",
    name: "川菜",
    desc:
      "川菜即四川菜肴，是中国特色传统的四大菜系之一、中国八大菜系之一、中华料理集大成者。",
    create_date: new Date().toLocaleString(),
  },
];

export default class Category extends Component {
  render() {
    return (
      <div className="cate-container">
        <div className="cate-search">
          <Button type="primary">添加</Button>
          <Input.Search
            placeholder="请输入分类名称"
            onSearch={(value) => console.log(value)}
            style={{ width: 250 }}
          />
        </div>
        <Table dataSource={data}>
          <Table.Column title="编号" dataIndex="key" key="id" />
          <Table.Column title="分类名称" dataIndex="name" key="name" />
          <Table.Column title="描述" dataIndex="desc" key="desc" />
          <Table.Column
            title="创建时间"
            dataIndex="create_date"
            key="create_date"
          />
          <Table.Column
            title="操作"
            dataIndex="handler"
            key="handler"
            render={() => {
              return (
                <>
                  <Button type="primary">编辑</Button> &nbsp;
                  <Button type="primary" danger>
                    删除
                  </Button>
                </>
              );
            }}
          />
        </Table>
      </div>
    );
  }
}
