实现数据的双向绑定
	1、实现一个监听器Observer, 用来劫持并监听所有属性, 如果有变动, 就通知订阅者.

	2、实现一个订阅者Watcher, 每一个Watcher都绑定一个更新函数, Watcher可以接收到属性的变化通知并执行相应的函数, 从而更新视图.
	
	3、实现一个解析器Compile, 可以扫描和解析每个节点的相关指令, 如果节点存在v-model、v-on等指令, 解析器Compile初始化这类节点的模版数据,
	可以显示在视图上, 然后初始化相应的订阅者Watcher.


理解MVVM模式
	model代表数据模型, 数据和业务逻辑都在model层
	
	view代表ui视图, 负责数据的展示
	
	viewModel负责监听model中数据的改变并且控制视图的更新, 处理用户交互操作
	
	model和view无直接关联, 通过viewModel进行联系的, model和viewModel直接有着双向数据绑定的关系.
	
	当model中的数据改变时会触发view层的刷新, view由于用户交互操作而改变的数据也会在Model中同步.


vue响应式原理
	通过数据劫持结合订阅与发布者模式的方式，通过Object.defineProperty劫持各个属性的setter、getter，
	在数据变动时发布消息给订阅者，触发相应的回调函数。

	(创建vue实例会遍历data选项的属性, 用Object.defineProperty将他们转化为getter/setter并在内部追踪相关依赖, 在属性被访问和修改时通知变化.
	每个组件实例都有相应的watcher程序实例, 它会在组件渲染的过程中把属性记录为依赖, 之后当依赖项的setter被调用时, 
	会通知watcher重新计算, 从而致使它关联的组件更新.)
	

如何实现双向数据绑定
	根据不同的元素与元素类型添加不同的元素监听事件。
	如：input框使用addEventListener添加input事件，radio元素添加changge事件，select元素添加change事件。


事件修饰符 
	阻止事件冒泡  `@click.stop="..."`
	阻止默认事件  `@click.prevent="..."`
	```
	...
	v-module.trim=""
	v-module.number=""
	v-module.lazy=""
	...
  ```
事件绑定
	```
	{{value}}
	<input v-bind:value="value" v-on:input="input" />
	methods:{
		input: function(event) {
			this.value = event.target.value;
		}
	}
	```
	`v-bind` 控制界面数据层 `v-on`控制数据层
	综合: `v-module` 结合了`v-bind`, `v-on`
  
输出代码为字符串 --> 防止xss攻击; 防止修改DOM

v-for注意点：
	Vue.set(要修改的数组, 要修改的下表, 改变后的结果); --> `Vue.set(this.[], 1, 10)`;
	观察者模式 修改了数组push方法
	//数组倒序
	```
	<div v-for="item in arr" v-bind:key="...">
	{{item}} <input type="text" />
	</div>
	<button v-click="reverse">click me</button>
	methods:{
		reverse: function(){
			this.[].reverse();
		}
	}
	```
//计算属性及监听 computed, watch
	`computed` 必须有`return`; 必须是同步操作
	```
	computed: {
		moves: function() {
			return this.moves.map(function() {
				return moves.name + '('+ mive.year +')';
			})
		}
	}
	```
	`watch` 没有`return`; 可以是同步操作, 也可以是异步操作

filters过滤器
	```
	{{ msg | upperCase(true) }}
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
//vue-cli
	//查看github --> https://github.com/vuejs/vue-cli
	基于render 
	
//组件
	```
	data: function() {
		return { ... } //返回一个新的对象, 不这样写影响相同的组件数据
	}
	```
	//父向子传值 props
	//子向父传值 $emit('自定义事件名', { 其他参数... })触发;  自定义事件名接受: @自定义事件名="fn($event, '18')"
	//父向子传DOM节点  slot 插槽
	//组件间传值 $emit $on结合
	
router
	路由模式 hash模式、history模式

	1、hash模式不需要后端配置, hash发生变化的url都会被浏览器记录下来，从而你会发现浏览器的前进后退都可以用, 

	浏览器后退页面字体颜色发生变化,  没有请求服务器, 但是页面状态和url关联起来.
	
	2、history模式需要后端配置路径, 刷新没有响应, 有可能出现404界面
	
	```
	Vue.component('login', {
		template:'<div>login----{{$route.query.id}}',
		//template:'<div>{{$route.params.id}}</div></div>',
		created() {
			console.log(this.$route.query.id);
			//console.log(this.$route.params.id);
		}
	})
	//在new路由对象的时候, 可以为构造函数 传递一个配置对象
	var routerObj = new VueRouter({
		//route表示路由匹配规则
		routes: [
			//每个路由规则 都是一个对象 有两个必须的属性
			//属性1 是path表示监听每个路由链接地址
			//属性2是component表示如果路由是前面匹配到的path, 则表示component属性对应的组件
			//{path:'/login/:id', component:login},
			{path:'/login', component:login},
			{
				path:'/login',
				component: login,
				children: {
					{ path:'login1', component:login1 }
				}
			},	
			{path:'/', redirect: '/login'}  //重定向使用; 和Node中的redirect不同
		],
		linkActiveClass:'active'
	});
	new Vue({
		...
		router: routerObj
	})
	
	<a href="#/login"></a>  -->	<router-link to="/login?id=1">登录</router-link>  <router-view></router-view>
				-->	//<router-link to="/login/2">登录</router-link>  <router-view></router-view>
	//路由嵌套
	<router-link to="/login/login1">登录</router-link>
	
	<router-view></router-view>
	```

vuex 组件之间共享数据
	//组件中访问store中的数据 使用 this.$store.state.xxx = ***访问;

	//挂载了vue上就能全局访问使用, 任何组件都能使用store存储数据

	//如果操作store中的数据, 只能通过使用mutations提供的方法操作, 防止导致数据的紊乱

	//不能快速定位错误, 因为每个组件都有可能使用操作数据的方法

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
			//和computed类似, 只有state中的数据发生变化, 如果gettes正好也使用了该数据, 那么就会立即触发getters重新求值
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