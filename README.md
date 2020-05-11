## 实现的功能

1. 登录，登出 (redux 管理用户登录的状态)
2. 路由权限验证(如果直接访问首页,在没有登录时会跳转到 登录页面 )
3. 记住密码功能
4. 菜谱分类管理(添加、编辑、删除、分页查询)

## 遇到的问题

#### 1. antd 表单组件双向绑定的问题

描述: 在绑定数据的时候，使用了 onChange 和 value 的这种方式，忽略了 <Form.Item> 标签的 `name` 属性,结果导致双向绑定不生效。

解决: 仔细阅读 antd 官方文档后发现，如果 <Form.Item> 指定了 `name` 属性，则不需要使用 onChange 和 vlaue 的这种方式进行数据绑定。 我是直接用第二种方式，也就是 onChange 的这种方式，然后把 name 属性去掉就解决了。

> 引用官方解释

  ```
    被设置了 name 属性的 Form.Item 包装的控件，表单控件会自动添加 value（或 valuePropName 指定的其他属性） onChange（或 trigger 指定的其他属性），数据同步将被 Form 接管，这会导致以下结果：

    1. 你不再需要也不应该用 onChange 来做数据收集同步（你可以使用 Form 的 onValuesChange），但还是可以继续监听 onChange 事件。

    2. 你不能用控件的 value 或 defaultValue 等属性来设置表单域的值，默认值可以用 Form 里的 initialValues 来设置。注意 initialValues 不能被 setState 动态更新，你需要用 setFieldsValue 来更新。

    3. 你不应该用 setState，可以使用 form.setFieldsValue 来动态改变表单值。
  ```

#### 2. 修改 store 中的数据后，刷新页面会重置

store 中的数据是不能持久化的，我是手动持久化的数据,存储到 sessionStorge 中. 看网上好像是有第三方库 redyx-presist 可以做持久化,并没有尝试.
