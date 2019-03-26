<template>
	<div class="box">
		<div class="lt">子组件数据</div>
		<br />
		<br />
		<div>{{ name }}</div>
		<br />
		<div v-show="isShow">是否显示</div>
		<button type="button" @click="clickMe">click me</button>
		<br />
		<br />
		<div>{{ $store.state.second }}</div>
		<button @click="toParent">向父组件传参</button>
	</div>
</template>

<script>
	export default {
		name: 'HelloChild',
		data() {
			return {
				isShow: false
			}
		},
		props: {
			name: {
				type: String,
				required: true
			}
		},
		methods: {
			clickMe() {
				this.isShow = !this.isShow;
			},
			toParent() {
				this.$emit('getParent', '收到子组件数据...')
			}
		}
	}
</script>

<style scoped>
.box{ border:1px solid #c0c0c0; padding:10px;}
*{ text-align:left;}
</style>