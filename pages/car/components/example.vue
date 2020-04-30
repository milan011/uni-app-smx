<template>
	<view >
		
	</view>
</template>

<script>
	export default {
		name: 'Example',
		data(){
			return {

			}
		},
		created(){

		},
		props: {
			title: {
				type: String,
				default: ''
			}, // 标题
		},
		methods: {
			onClick() {
				this.$emit('click')
			}
		}
	}
</script>

<style lang="scss" scoped>

</style>
