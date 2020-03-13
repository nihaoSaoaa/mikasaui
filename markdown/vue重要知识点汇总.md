
# 1. v-if 和 v-show 的区别

## 区别

- `v-if`：**真正的条件渲染**，确保在切换过程中条件块内的**事件监听器和子组件适当地被销毁和重建**；也是**惰性的**，初始渲染时条件为假，则什么也不做——直到条件第一次变为真时，才会开始渲染条件块。

- `v-show`：元素总是会被渲染，基于 css 的 display 进行切换

## 应用场景

- 需要频繁操作时使用 `v-show`, 一次性渲染的使用 `v-if`

## `v-if` 性能优化体验

- 在特定条件下才渲染某部分(组件)时，先设置 `v-if="false"`, 在需要时(或异步, nextTick)设置为 `true`, 优先渲染需要的内容



# 2. Vue 中 key 的作用

key 是为 Vue 中 vnode 的唯一标记，通过这个 key，我们的 diff 操作可以更准确、更快速


# 3. vue单向数据流的理解

- 父子props之间是**单向向下绑定**，防止子组件意外改变父级组件的状态；

- 子组件要修改props，可以通过```$emit```发送自定义事件父组件接收到后，由父组件来修改(或其他通信手段让父组件来修改数据);

- v-model 实现双向绑定、.sync 的用法: `v-model` 需要用到 `props`、`data`、`watch`, `.sync` 需要用到 props，在 methods 发送 `update:[prop]` 事件

# 4. 组件的 data 为什么是 function ?

- 组件可能会被**多次复用，**在js里对象是**引用关系**，组件里的 data 的作用域没有被隔离，子组件中的 data 会互相影响；如果 data 是一个函数，那么每个实例都维护**返回对象的独立的拷贝**，data就不会互相影响;

- new Vue 的实例，data 是不会被复用的，因此不存在引用对象的问题。

# 5. computed、methods 和 watch 的相关问题

## 计算属性和监听器的区别？

- 计算属性是自动监听依赖值的变化，动态返回内容,底层是 `js` 的 **存取器函数**实现；
- 监听器是监听的值变化时，可以触发回调，本质是 **观察者模式**

## 计算属性和 methods 的区别 ？

- `computed` 可以缓存, `methods` 可以接受参数，在 `v-for` 动态绑定值时只能用 `methods` 

# 6. render 函数

# 7. vue 的生命周期

## 什么是生命周期？

Vue 实例有一个完整的生命周期，也就是从开始创建、初始化数据 -> 编译模版、挂载 Dom -> 渲染、更新 -> 渲染、卸载等一系列过程，我们称这是 Vue 的生命周期。

-  `beforeCreate`  组件创建之初，属性生效之前
-  `created`       组件实例已创建，属性已绑定，真实 `dom` 还没生成，`$el` 不可用
-  `beforeMount`   `render`函数首次被调用
-  `mounted`       el被新建的 `vm.$el` 替换，挂载到实例上后
-  `beforeUpdate`  数据更新后，页面更新前 
-  `update`        数据和页面都更新后       
-  `activited` 、 `beforeDestory`     
-  `deactivated` 、 `destoryed`

## 生命周期示意图

<img src="../src/assets/img/16ca74f183827f46.jpg" >

# 8. 父组件监听子组件的生命周期

- 自定义事件

- @hook：lifeCycle="doSomething"

# 9. keep-alive 的理解

- 结合路由和动态组件，用于缓存组件；

- 提供 include 和 exclude 属性，两者都支持字符串或正则表达式， include 表示只有名称匹配的组件会被缓存，exclude 表示任何名称匹配的组件都不会被缓存 ，其中 exclude 的优先级比 include 高；

- 对应两个钩子函数 activated 和 deactivated 


# 10. Vuex 的理解

## Vuex 是 vue.js 的状态管理模式，核心是 store。

每个 store 包括五个模块：

- state：应用状态的数据结构，在这里设置默认的初始状态；

- getter：允许组件从 store 获取数据；

- mutation：唯一更改 store 状态的方法，是**同步函数**

- action：用于提交 mutation ，不直接变更状态，可以包含**异步操作**；

- module：将单一的 store 拆分保存在同一个单一状态树下。

# 11. 组件间通信

## 父子组件通信

1. `props/$emit` 
2. `ref` 和 `$parent/$children`

## 隔代组件通信

1. `$attrs/$listeners`

- 通过 `v-bind="$attrs"` `inheritAttrs = false` 传入内部组件
- `v-on="$listeners"` 传入内部组件

2. `provide/inject`

- 祖先组件中通过 `provider` 来提供变量，然后在子孙组件中通过 `inject` 来注入变量。 
- 子组件获取上级组件的状态，跨级组件间建立了一种**主动提供与依赖注入**的关系。

## 父子、隔代、兄弟间通信

1. `EventBus （$emit / $on）`

通过创建一个 vue 实例 `Vue.prototype.bus = new Vue()`作为中央事件总线，来实现触发 `$emit`和监听事件 `$on` 

2. Vuex 状态管理



## 自定义足间通信

在属性 `name` 唯一的基础上实现

1. <a href="../src/common/emitter.js">dispatch/broadcast 跨组件精准通信

2. <a href="../src/common/findComponents.js">findComponents 函数获取组件实例


# MVVM 的理解

MVVM 是软件设计架构模式，核心是 viewModel 层，向上与视图层进行双向数据绑定，向下与 Model 层通过接口请求进行数据交互，起呈上启下作用。

1. view 层

视图层，用户界面，由 html 和 css 构建

2. model 层

数据模型，后端的业务逻辑，对前端暴露 api 接口

3. viewModel 层

- 从后端获取的 Model 数据进行转换处理，做二次封装，以生成符合 View 层使用预期的视图数据模型，包含了**视图状态和视图行为**

- 实现了双向绑定，ViewModel 的内容会实时展现在 View 层，由 ViewModel 负责与 Model 层交互；

- 解耦了 View 层和 Model 层，这个解耦是至关重要的，它是前后端分离方案实施的重要一环。


# 虚拟 DOM 的优缺点

## 优点
1. 保证性能下限：需要适配任何上层 API 可能产生的操作，但是比起粗暴的 DOM 操作性能要好很多；
2. 无需手动操作 DOM ：只需要写好 View-Model 的代码逻辑，框架会根据虚拟 DOM 和 数据双向绑定；
3. 跨平台： 虚拟 DOM 本质上是 JavaScript 对象,而 DOM 与平台强相关，相比之下虚拟 DOM 可以进行更方便地跨平台操作。

## 缺点

无法做到极致的优化。

# 虚拟 DOM 的原理

- 用 JavaScript 对象模拟真实 DOM 树，对真实 DOM 进行抽象；
- diff 算法 — 比较两棵虚拟 DOM 树的差异；
- pach 算法 — 将两个虚拟 DOM 对象的差异应用到真正的 DOM 树。


# 1. SPA的概念与优缺点

>SPA：网页仅在初始化加载相应的 `html`、`js` 和 `css`，不会因为用户的操作重新加载或跳转；利用的是路由机制实现 html 内容的变换。

## 优点：

-  用户体验好、快，不需要重新加载整个页面避免了不必要的跳转和重复渲染；
-  对服务器压力小；
- 前后端职责分离，前端负责交互逻辑，后端负责数据处理；

## 缺点：

-  初次加载耗时多；
-  前进后退路由管理；
-  SEO 难度较大；


# SSR 服务端渲染

## 优点

1. 更好的SEO：方便搜索引擎抓取

2. 更快的内容到达时间：首屏加载快，由服务端渲染后页面直接返回给客户端

## 缺点

1. 开发条件的限制：只支持 beforeCreate 和 created 两个钩子函数；需要处于 Node.js server 运行环境；

2. 服务器负载：大量占用CPU 资源，在高流量环境 ( high traffic ) 下使用，需准备相应的服务器负载，采用缓存策略。

# vue 项目的优化

1. 代码层面

- v-if 和 v-show 区分使用场景
- computed 和 watch  区分使用场景
- v-for 遍历必须为 item 添加 key，且避免同时使用 v-if
- 长列表性能优化
- 事件的销毁
- 图片资源懒加载
- 路由懒加载
- 第三方插件的按需引入
- 优化无限列表性能
- 服务端渲染 SSR or 预渲染

2. webpack 层面

- Webpack 对图片进行压缩
- 减少 ES6 转为 ES5 的冗余代码
- 提取公共代码
- 模板预编译
- 提取组件的 CSS
- 优化 SourceMap
- 构建结果输出分析
- Vue 项目的编译优化

3. 基础的 Web 技术的优化

- 开启 gzip 压缩
- 浏览器缓存
- CDN 的使用
- 使用 Chrome Performance 查找性能瓶颈

# vue3.0 的改变

1. 检测机制的改变

基于代理 Proxy 的 observer 实现，提供全语言覆盖的反应性跟踪

2. 模板

3.0 把作用域插槽改成了函数的方式，这样只会影响子组件的重新渲染，提升了渲染的性能。

