# 接口设计

## checkbox 组件 props（单独使用时）

- disabled：boolean 是否禁用

- value：number|string|boolean  绑定传入的数据，一般默认为布尔值，确定组件的默认选中状态

- trueValue ：number|string|boolean   正确的值，用来与value判断确定组件在点击后的状态

- falseValue：number|string|boolean   错误的值

## checkbox 自定义事件

- input：用于实现 v-model

- onFormChange：用于通知父父级

***

## checkbox 组件 props （与checkboxGroup 联合使用时）

- label：number|string|boolean  每个box代表的数据

## checkboxGroup 组件 props

- value：array  子组件 checkbox 选中label 的 数组集合 

## checkboxGroup 自定义事件

- onFormChange： 代替了子组件的通信功能



