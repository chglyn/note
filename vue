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










