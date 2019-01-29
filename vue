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
vuex 组件之间共享数据
	//组件中访问store中的数据 使用 this.$store.state.xxx = ***访问;
	//挂载了vue上就能全局访问使用, 任何组件都能使用store存储数据
	//如果操作store中的数据, 只能通过使用mutations提供的方法操作, 防止导致数据的紊乱
	//不能快速定位错误, 因为每个组件都有可能使用操作数据的方法
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
