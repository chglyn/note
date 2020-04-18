### Vue&React

Vue与React问世很久，一直在使用Vue，偶尔略看一下React及相关文档与技术文档，现在有空闲两者从以下方面做对比分析：

##### 设计模式
* vue是一个渐进式JavaScript框架，自底向上增量开发设计。
* react用于构建用户界面的JavaScript库，推荐函数编程，使用函数组件。

##### 编写语法
* vue推荐使用.vue后缀单文件模版，保留了html、css、javascript分离写法
* react推荐使用JSX模版，混合了html、css、javascript写法

##### 构建工具
* vue提供了cli，使用vue-cli脚手架，可以很容易的创建项目，易扩展。
* react使用create-react-app脚手架，存在一些局限性，扩展性差不能配置等。

##### 数据绑定
* vue借鉴了mvvm思想，使用双向数据绑定( [查看双向数据绑定](https://github.com/chglyn/skills_note/blob/master/vue/base-vue.md) )，当视图改变更新模型，当模型改变更新视图。(vue的更新是微任务)
* react是单向数据流，如果需要双向数据可以手动实现。react中属性不允许更改，状态试允许更改。不允许直接使用this.state更改组件状态。自身设置状态通过this.setState进行更改。(this.setState是异步的，导致获取内容还是之前的内容，因此在setState第二个参数添加回调函数获取更新后的内容)[为何this.setState是异步](#setState)。


##### diff算法
* vue在内存中生成一个虚拟的dom树；将虚拟的dom树渲染到真实的dom中；当有数据变化时，结合之前的虚拟dom生成一颗新的虚拟dom；此次生成的dom与之前的虚拟dom对比，对比的过程中同层对比，来更新被替换的dom；对比后的差异重新渲染。
* react首先对比dom结构，dom结构改变直接卸载重建；dom结构一样，更新变化的内容，所有的同一层节点会通过key进行对比；如果不加key会以暴力的操作卸载与重建。


#### <a id="setState">为何this.setState是异步</a>
* 保持内部一致性

state可以是同步，props不是。 因为这个状态需要被提升到父级，可以在多个组件之间共享时，this.state能同步更新，但tis.props不能在不重新渲染父级情况下立即刷新，此时性能非常低。


* 启动与更新

比如：一个导航其换到另一个导航时，导航足够快能看到闪烁导致用户体验差；如果有多个级别的组件有不同的异步依赖关系，会看到一个闪烁的级联。