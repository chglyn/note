<template>
	<div>
		<div class="demo">{{ title }}----参数：{{ $router.currentRoute.params.id }} <a href="javascript:;" @click="addTodolist">增加</a></div>
		<ul>
			<li class="clear" v-for="(v, k) in lists">
				<div class="name c-fl">{{ v.name }}</div>
				<a href="javascript:;"  class="c-fr" @click="deleteItem(k)">删除</a>
			</li>
		</ul>
	</div>
</template>

<script>
  export default {
  	name: 'TodoList',
  	data () {
  		return {
  			title: '列表页',
  			lists: [
  				{
  					id: 1, 
  					name: 'apple'
  				},
  				{
  					id: 2,
  					name: 'banana'
  				},
  				{
  					id: 3,
  					name: 'orange'
  				},
  				{
  					id: 4,
  					name: 'cherry'
  				}
  			],
  			Id: 0
  		}
  	},
    created() {
      console.log(this.$router.currentRoute.params.id)
    },
  	methods: {
  		deleteItem: function(index) {
  			this.lists.splice(index, 1);
  		},
  		addTodolist: function() {
  			this.lists.push({
  				id:6,
  				name: 'sunny'
  			})
  		}
  	}


  }
</script>
<style scoped>
ul, li, div{ padding:0; margin:0;}
.demo{
	text-align:left;
}
.c-fl{ float:left;}
.c-fr{ float:right;}
li{ border:1px solid #c0c0c0; margin:10px 0;padding:15px;}
.clear{ clear:both}
</style>