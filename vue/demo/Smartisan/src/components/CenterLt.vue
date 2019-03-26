<template>
	<div>
		<p>{{ msg }}</p>
		<button type="button" @click="toRightData">click Me</button>
	</div>
</template>
<script>
	export default {
		name: 'CenterLt',
		data() {
			return {
				msg: 'left'
			}
		},
		methods: {
			toRightData() {
				this.$root.Bus.$emit('toRight', '左侧来的数据...')
			}
		}
	}
</script>