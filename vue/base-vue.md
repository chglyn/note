### 前言一些理解
* 实现数据的双向绑定

	1、实现一个监听器Observer, 用来劫持并监听所有属性, 如果有变动, 就通知订阅者.

	2、实现一个订阅者Watcher, 每一个Watcher都绑定一个更新函数, 
	
	Watcher可以接收到属性的变化通知并执行相应的函数, 从而更新视图.
	
	3、实现一个解析器Compile, 可以扫描和解析每个节点的相关指令, 如果节点存在v-model、v-on等指令, 
	
	解析器Compile初始化这类节点的模版数据,可以显示在视图上, 然后初始化相应的订阅者Watcher.

* 理解MVVM模式

	`model`代表数据模型, 数据和业务逻辑都在`model`层
	
	`view`代表`ui`视图, 负责数据的展示
	
	`viewModel`负责监听`model`中数据的改变并且控制视图的更新, 处理用户交互操作
	
	`model`和`view`无直接关联, 通过`viewModel`进行联系的, `model`和`viewModel`直接有着双向数据绑定的关系.
	
	当`model`中的数据改变时会触发view层的刷新, `view`由于用户交互操作而改变的数据也会在Model中同步.

* vue双向数据绑定

	通过数据劫持结合订阅与发布者模式的方式，通过`Object.defineProperty`劫持各个属性的`setter`、`getter`，
	
	在数据变动时发布消息给订阅者，触发相应的回调函数。

	
* 如何实现双向数据绑定

	根据不同的元素与元素类型添加不同的元素监听事件。

	如：`input`框使用`addEventListener`添加`input`事件，`radio`元素添加`changge`事件，`select`元素添加`change`事件。


### 生命周期

详情查看[生命周期](https://github.com/chglyn/skills_note/blob/master/vue/vue_lifecycle.png)

* `beforeCreate` 创建之前，在实例化后，数据观测与事件配置之前被调用

* `created` 创建之后，在实例化创建完成后被调用，实例已经完成相关配置，如：数据观测属性与方法的运算、事件回调。此时挂在阶段还没开始，`$el`属性不可见。

* `beforeMount` 挂载之前，准备挂在阶段。模版在内存中编译完成，还没有真正渲染到界面，界面看不到真实的数据。

* `mounted` 挂载成功，`el`被创建的`vm.$el`替换。此时界面已经真正渲染好，可以看到真实数据。

* `beforeUpdate` 数据更新时调用；拿到最新数据，在内存中渲染一颗新的`dom`树

* `updated` 组件`dom`已经更新，组件更新完毕；界面已经完成更新，`data`中数据是最新的，界面显示数据也是最新的。

* `beforeDestroy` 实例销毁之前调用，该钩子在服务器端渲染期间不被调用；此时组件还没销毁，能正常使用，比如： `data`、`methods`还能访问。

* `destroyed` `vue`实例销毁之后；组件已完成销毁，`data`、`mathods`都不可用。


补充： 

`activated` 在`keep-alive`组件激活时调用，该钩子在服务器端渲染期间不被调用

`deactivated` 在`keep-alive`组件停用时调用，该钩子在服务器端渲染期间不被调用


### 指令

v-if与v-show

* `v-if` 根据条件为`false`时，不存在`dom`；在切换过程中需要经过销毁和重建，开销高

* `v-show` 存在`dom`中；使用`css`的`display`属性，开销小。

### 事件修饰符 

* click

自定义组件使用原生click事件

`<component @click.native="xxx"></component>`

* lazy

默认情况下，`v-model`在每一次`input`事件触发后将输入的值与数据同步。可以使用`lazy`修饰符，转变使用`change`事件同步，输入完内容后，光标离开才更新视图。

* number

输入的值转化为数值类型，如果先输入的是数字，会限制输入的只能是数字，视图上只显示数字；如果先输入的是字母，相当于没有添加`number`，输入什么视图显示什么。

* trim

过滤`input`输入内容前后空格，中间空格不会过滤


### computed与watch

* `computed` 必须有`return`；必须是同步操作；在数据不变的情况下，会直接读取缓存进行复用

* `watch` 没有`return`; 同步异步都可以操作


### data与props

* 相同点：都可以存放各种数据类型，当数据改变时，用到的数据相关视图同步更新。

* 不同点： 

`data` 称为动态数据，在各自实例中，任何情况下，都可以修改数据的类型和数据结构。

`props` 称为情态数据，在各自实例中，一旦初始化被定义好数据类型，基于`vue`是单项数据流，在数据传递时始终不能修改它的数据类型，而且在子组件不允许直接操作传递过来的`props`，可以通过其他间接方式修改。

比如： 

1.放到当前组件data中

```
	export default {
		props: {
			type: String
		},
		data() {
			return {
				currType: this.type
			}
		}
	}
```
2.利用computed

```
	export default {
		props: {
			type: String
		},
		computed: {
			currType () {
				return this.type.toUpperCase();
			}
		}
	}

```

### Vue.set

`Vue.set(要修改的数组, 要修改的下表, 改变后的结果);` --> `Vue.set(this.[], 1, 10)`

### 过滤器filters

```

	<div>{{ msg | upperCase(true) }}</div>

	...
	filters: {
		upperCase: function(val, isFirstWorld) {
			var str = val.toString();
			if(isFirstWorld) {
				return val.charAt(0).toUpperCase() + val.slice(1);
			}else{
				retrun str.toUpperCase();
			}
		}
	}

```

### vue-router
	
* 原理：`vue-router`用了单页面应用，`vue`单页面应用基于路由与组件，路由设定访问路径，并将路径与组件映射起来，在`vue`单页面应用切换路径，也是在切换组件。单页面应用程序，只有一个完整的界面；页面加载时，不会加载整个页面，而是更新某个指定容器的内容；`vue-router`在实现前端单页面路由使用了两种模式：`hash`模式与`history`模式，根据`mode`参数决定使用哪一种模式。
(为何不使用`a`标签，在打包时候会生成`dist`文件，这里是静态资源，写a标签不起作用。)

### hash模式、history模式

1、`hash`模式不需要后端配置, hash发生变化的`url`都会被浏览器记录下来，从而你会发现浏览器的前进后退都可以用, 

浏览器后退页面字体颜色发生变化,  没有请求服务器, 但是页面状态和`url`关联起来.
	
2、`history`模式需要后端配置路径, 刷新没有响应, 有可能出现404界面
	

### vue-vuex 

组件中访问store中的数据 使用`this.$store.state.xxx = ***`访问;

挂载了`vue`上就能全局访问使用, 任何组件都能使用`store`存储数据

如果操作`store`中的数据, 只能通过使用`mutations`提供的方法操作, 防止导致数据的紊乱


```

	<input tye="button" @click="add" />
	<input tye="button" @click="substr" />
	<input type="text" v-module="$store.state.count" />
	<!-- <span>{{ $store.state.count }}</span> -->
	<span>{{ $store.getters.optCount }}</span>
	new vuex.Store({
		state: {
			count: 0
		},
		mutations:{
			incrent(state){
				state.count++;
			},
			//如果组件中想使用mutations方法, 只能使用this.$store.commit('方法名')
			//mutations 最多支持两个参数 参数1 是state状态, 参数2是commit提交过来的数据
			substr(state, obj) {
				state.count -= (obj.a + obj.b)
			}
		},
		getters:{
			//和fillter类似 都没有修改元数据, 都是把原数据做包装对外提供使用
			//和computed类似, 只有state中的数据发生变化, 如果gettes正好也使用了该数据, 
			//那么就会立即触发getters重新求值
			//getters：只对外提供数据, 不负责修改数据
			optCount：function(state) { 
				return '当前最新的count值是' + state.count;
			}
		}
	})

	new Vue({
		...
		methods: {
			add() {
				this.$store.commit('incrent');
			},
			remove() {
				this.$store.commit('substr', {a:1, b:2});
			}
		}
	})

```

### 参考文章：

-----

[vuex框架原理与源码分析](https://tech.meituan.com/2017/04/27/vuex-code-analysis.html)

[从头开始学习vue-router](https://github.com/ljianshu/Blog/issues/39)
