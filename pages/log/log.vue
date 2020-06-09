<template>
	<view class="content">
		<image src="../../static/img/shanshi.jpg" mode=""></image>
		<button  open-type="getUserInfo" @getuserinfo="wxLogin" >
			<button  class="cu-btn block bg-green margin-tb-sm lg round">微信登录</button>
		</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			wxLogin(e){
				let userInfo =e.detail.userInfo
				console.log(userInfo)
				uni.login({
					 provider:'weixin',
					 success:(res) => {
						 var code =res.code
						 this.$request({
						 	url:"/front/food/loginfood" ,
							data:{
								js_code:code,
								username:userInfo.nickName,
								userurl:userInfo.avatarUrl
							}
						 }).then(res => {
							 let openid = res.data.data[0].openid
							 uni.setStorageSync('openid',openid);
							 uni.switchTab({
							 	url:'/pages/index/index'
							 })
						 })
					 } 
				})
			},
		}
	}
</script>

<style lang="scss">
	.content{
		margin-top: 300upx;
		text-align: center;
		.title{
			
		}
	}
</style>
