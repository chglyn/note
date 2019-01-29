事件修饰符 
	阻止事件冒泡  @click.stop="..."
	阻止默认事件  @click.prevent="..."
	...
	v-module.trim = ""
	v-module.number = ""
	v-module.
	...
  
事件绑定
	{{value}}
	<input v-bind.value="value" v-on.input="input" />
	methods:{
		input: function(event) {
			this.value = event.target.value;
		}
	}
	v-bind 控制界面数据层 v-on控制改变数据层
	综合: v-module 结合了v-bind, v-on
  
输出代码为字符串 --> 防止xss攻击; 防止修改DOM

v-for注意点：
	Vue.set(要修改的数组, 要修改的索引, 改变后的结果); --> Vue.set(this.[], 1, 10);
	观察者模式 修改了数组push方法
	//数组倒序
	<div v-for="item in arr" v-bind:key="...">
	{{item}} <input type="text" />
	</div>
	<button v-click="reverse">click me</button>
	methods:{
		reverse: function(){
			this.[].reverse();
		}
	}

//计算属性及监听 computed, watch
	computed 必须有return; 必须是同步操作
	computed: {
		moves: function() {
			return this.moves.map(function() {
				return moves.name + '('+ mive.year +')';
			})
		}
	}
	watch 没有return; 可以是同步操作, 也可以是异步操作

//filters过滤器
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
//vue-cli
	//查看github --> https://github.com/vuejs/vue-cli
	基于render 
	
//组件
	data: function() {
		return { ... } //返回一个新的对象, 不这样写影响相同的组件数据
	}
	//父向子传值 props
	//子向父传值 $.emit('自定义事件名', { 其他参数... })触发;  自定义事件名接受: @自定义事件名="fn($event, '18')"
	//父向子传DOM节点  slot 插槽
	//组件间传值 $.emit $.on结合
	
router
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
vuex 共享数据管理
	//组件中访问store中的数据 使用 this.$store.state.xxx = ***访问;
	//挂载了vue上就能全局访问使用, 任何组件都能使用store存储数据
	
