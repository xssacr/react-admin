/* eslint-disable array-callback-return */
const Mock = require('mockjs');

let datalist = [];

function initData() {
  for (let i = 0; i < 5; i++) {
    datalist.push(Mock.mock({
      'key|10000-30000': 18444,
      name: '@ctitle(2,4)',
      desc: '@ctitle(30,40)',
      create_date: '@date(yyyy-MM-dd HH:mm:ss)'
    }))
  }
}

initData();

Mock.mock('/api/category/getlist', "post", params => {
  let { pageno, pagesize, keyword } = JSON.parse(params.body);
  console.log(datalist)
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

  datalist.map((item, index) => {
    if (item.key === key) {
      datalist.splice(index, 1)
    }
  })

  return {
    code: 1,
    message: '删除菜谱成功!'
  };
})

Mock.mock('/api/category/addCategory', "post", params => {
  let newCategory = JSON.parse(params.body);
  datalist.push(newCategory);

  console.log(datalist
  )
  return {
    code: 1,
    message: '添加菜谱成功!'
  }
})

Mock.mock('/api/category/editCategory', "post", params => {
  let { key, name, desc, create_date } = JSON.parse(params.body);

  // 根据key 找到对应的数据
  datalist.forEach(item => {
    if (item.key === key) {
      item.name = name
      item.desc = desc
      item.create_date = create_date
    }
  })

  return {
    code: 1,
    message: '修改菜谱成功!'
  }
})