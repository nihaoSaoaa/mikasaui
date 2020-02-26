# 接口设计

## Form组件props

- model：object 表单控件绑定的数据对象，校验或重置时会访问该数据对象下对应的表单数据

- rules：object 表单验证规则

## FormItem组件props

- label：string 单个表单组件的标签文本

- prop: 对应表单域 Form 组件 model 里的字段

## input组件props

- 双向绑定value：通过组件v-model绑定的input框的文本

- placeholder

- type：input 框的类型

# 流程

1. 在form中缓存 formItem 实例

在formItem 在 mounted 时派发自定义事件，将 this 作为参数，form 在 created 周期通过 $on 监听，用数据 items 收集 this。

2. 触发校验

@change 和 @blur 触发校验，发送自定义事件到 item，在 mounted/created 周期监听事件。

3. 依赖注入

通过 provide/inject 将form 本身注入每个formItem ，这样就可以拿到数据和校验规则，通过每个input发送的自定义事件，就可以完成核心的校验逻辑。

4. 校验规则

- getRules(): [object]
- getFilteredRule(trigger: string): [object]
- validate：(trigger:string, callback?:function = () => {}):void

5. 重置

6. 公开方法 

- 全部重置数据： resetFields 
- 全部校验数据，支持 Promise：validate(callback)

