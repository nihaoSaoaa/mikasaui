# 常规组件的使用方式

1. 所有的内容都在 ```#App``` 里渲染

2. 组件的模板都由事先定义好

3. 注册的组件只能在当前位置渲染

# 需要动态创建的组件

1. 服务端获取的组件模板，需要动态渲染组件；
2. 类似 ```window.alert()``` 的弹出层组件，需要js调用函数方能渲染

## extend 构造器创建组件实例

```js
import Vue from 'vue'
import Component from './component.vue'

// 创建了一个构造器，解决异步获取 template 模板的问题
const CompConstructor =  Vue.extend(Component)
// 调用了 $mount 方法对组件进行了手动渲染,现在的 comp 已经是一个标准的 Vue 组件实例
const comp = new CompConstructor().$mount()
// 此时 $el 可以被访问，挂载到节点
document.body.appendChild(comp.$el)
```

## 直接创建 vue 实例，通过 render 函数渲染

```js
import Vue from 'vue'
import Component from './component.vue'

const props = {}
const instance = new Vue({
  render: h => h(Component, { props })
})

const comp = instance.$mount();
document.body.appendChild(comp.$el);
```