<template>
	<div>{{ info }} {{ count }}</div>
</template>
<script>
	export default {
		name: 'CenterRt',
		data() {
			return {
				info: '',
				count: 0
			}
		},
		mounted() {
			this.$root.Bus.$on('toRight', (msg) => {
				this.info = msg;
				this.count ++;
			})
		},
		methods: {

		}
	}
</script>