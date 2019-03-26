<template>
	<div>
		<div class="text">{{ title }} ----- 参数：{{ $route.query.id }}</div>
		<ul>
			<li>
				<input type="text" v-model="count" />
				<span>{{ count }}</span>
			</li>
			<li>
				<button type="button" @click="add">click add</button>
				<button type="button" @click="clear">click clear</button>
			</li>
		</ul>
		<h1>Vuex</h1>
		<ul>
			<li><input type="text" v-model="$store.state.second" /></li>
			<li>
				<button type="button" @click="addStore">click add</button>
			</li>
		</ul>
		<h2>$emit and $on</h2>
		<div class="center">
			<div class="center-lt">
				<CenterLt />
			</div>
			<div class="center-rt">
				<CenterRt />
			</div>
		</div>
	</div>
</template>
<script>
    import CenterRt  from '@/components/CenterRt'
    import CenterLt  from '@/components/CenterLt'

	export default {
		name: 'TodoItem',
		data() {
			return {
				title: 'TodoItem',
				count: 0
			}
		},
		created() {
			console.log(this.$route.query.id+'------------------');
		},
		methods: {
			add() {
				this.count ++;
			},
			clear() {
				this.count = 0;
			},
			addStore() {
				this.$store.commit('incrent')
			}
		},
		components: {
			CenterRt,
			CenterLt
		}
	}
</script>
<style scoped>
	*{ padding:0;margin:0;}
	.text{ text-align:left}
	li{ margin:15px 0;}
	.center{ clear:both;}
	.center-lt{ width:50%;float:left}
	.center-rt{  width:50%;float:right;}
</style>