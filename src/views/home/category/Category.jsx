import React, { Component } from "react";
import { Table, Button, Input } from "antd";
import "./category.style.scss";
import { post } from "../../../utils/http";

export default class Category extends Component {
  constructor() {
    super();
    this.state = {
      datalist: [],
      keyword: "",
      isLoading: false,
      total: 1,
      pageno: 1,
      pagesize: 10,
    };
  }
  render() {
    this.paginationSet = {
      total: this.state.total,
      current: this.state.pageno,
      pageSize: this.state.pagesize,
      onChange: (page, pageSize) => {
        this.setState(
          {
            pageno: page,
            pagesize: pageSize,
          },
          () => {
            this.getList();
          }
        );
      },
    };

    return (
      <div className="cate-container">
        <div className="cate-search">
          <Button type="primary">添加</Button>
          <Input.Search
            placeholder="请输入分类名称"
            onSearch={this.searchHandler}
            onChange={(e) => this.setState({ keyword: e.target.value })}
            style={{ width: 250 }}
          />
        </div>
        <Table
          dataSource={this.state.datalist}
          loading={this.state.isLoading}
          pagination={this.paginationSet}
        >
          <Table.Column align="center" title="编号" dataIndex="key" key="id" />
          <Table.Column
            align="center"
            title="分类名称"
            dataIndex="name"
            key="name"
          />
          <Table.Column
            align="center"
            title="描述"
            dataIndex="desc"
            key="desc"
          />
          <Table.Column
            align="center"
            title="创建时间"
            dataIndex="create_date"
            key="create_date"
          />
          <Table.Column
            align="center"
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

  componentDidMount() {
    this.getList();
  }

  searchHandler = () => {
    this.getList();
  };

  getList = async () => {
    this.setState({ isLoading: true });
    let result = await post("/api/category/getlist", {
      pageno: this.state.pageno,
      keyword: this.state.keyword,
      pagesize: this.state.pagesize,
    });
    this.setState({
      datalist: result.data.datalist,
      isLoading: false,
      total: result.data.total,
    });
  };
}
