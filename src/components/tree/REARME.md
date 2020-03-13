# 递归组件

1. 为什么递归组件必须有名字 name 属性？

递归组件需要使用组件自身，而不能通过 `import、components: { xxx }`来注册

2. 递归组件为什么需要限制条件？

会抛出 `max stack size exceeded` 的错误，组件会无限递归下去，死循环。

3. 递归组件的必要条件

- name
- 结束条件


# 动态组件

`<component> 内置组件`

- 属性is      值： Object String（组件名，标签名）
- 指令v-bind  值： 对象（要绑定的属性）

# 异步组件

- 路由的异步组件

# Tree 组件设计

1. Api 设计

- props->data: `Array` data里有多个对象，对象的属性分别是：

> title:`String` 节点文本
> expand:`Boolean` 是否展开子节点 
> checked:`Boolean` 是否选中节点
> child:`Array<TreeNode>`  子节点数组

- props->showCheckBox:`Boolean` 是否显示复选框

- events->onToggleExpand  展开和收起子节点时

- events->onCheckChange   点击复选框时

2. 入口文件 Tree 组件

- 定义组件API

- clone 一份 data

3. TreeNode 组件

- props-> data: `Object`

- props0-> showCheckBox: `boolean`

4. 主要逻辑

- 展开元素的点击：通过修改当前组件的 expand 即可，并获取 tree 父组件，让 tree 触发onToggleExpand事件

- 选择框的点击：(1) 修改当前节点的所有子节点的 checked; (2) 判断同一级节点是否都选中，若都选中则父节点也选中，并递归向上判断

