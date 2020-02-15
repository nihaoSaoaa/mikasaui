# 接口设计

## Form组件props

- model：object 表单控件绑定的数据对象，校验或重置时会访问该数据对象下对应的表单数据

- rules：object 表单验证规则

## FormItem组件props

- label：string 单个表单组件的标签文本

- prop: 对应表单域 Form 组件 model 里的字段