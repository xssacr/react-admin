/* eslint-disable array-callback-return */
const Mock = require('mockjs');

let datalist = [];

function initData() {
  for (let i = 0; i < 5; i++) {
    datalist.push(Mock.mock({
      key: '@increment()',
      name: '@ctitle(2,4)',
      desc: '@ctitle(30,40)',
      create_date: '@date(yyyy-MM-dd HH:ss:mm)'
    }))
  }
}

initData();

Mock.mock('/api/category/getlist', "post", params => {
  let { pageno, pagesize, keyword } = JSON.parse(params.body);
  console.log(pageno)
  let startIndex = (pageno - 1) * pagesize;
  let endIndex = startIndex + pagesize;

  let reg = new RegExp(keyword, 'i');

  let result = datalist.filter(item => {
    if (reg.test(item.name)) {
      return item;
    }
  }).slice(startIndex, endIndex);

  return {
    code: 1,
    total: datalist.length,
    datalist: result
  };
})

Mock.mock('/api/category/delByKey', "post", params => {
  let { key } = JSON.parse(params.body);

  datalist.map((item,index) => {
    if (item.key === key) {
      datalist.splice(index,1)
    }
  })

  return {
    code: 1,
    message:'删除分类成功!'
  };
})