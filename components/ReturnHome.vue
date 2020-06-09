<template>
	<view class="returnHome" id="returnHome">
		<view class="mianBtn" @tap="handleTap">
			<image src="../static/img/menu.png"></image>
		</view>
		<view class="backHome" v-if="homeShow">
			<view class="li">
				<image src="../static/img/nutrition.png" mode=""></image>
				<view>食谱</view>
			</view>
			<view class="li">
				<image src="../static/img/recipe.png" mode=""></image>
				<view>营养知识库</view>
			</view>
			<view class="li">
				<image src="../static/img/microp.png" mode=""></image>
				<view>小百科</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				homeShow:false,
				num:0
			};
		},
		methods:{
			handleTap(){
				this.num++
				if(this.num%2==1){
					this.isShow=true
				}else{
					this.isShow=false
				}
				
			}
		}
	}
</script>

<style scoped lang="scss">
	.returnHome{
		position: fixed;
		right:30upx ;
		bottom:200upx;
	}
	.mianBtn{
		width: 82upx;
		height: 82upx;
		border-radius: 50%;
		image{
			width: 82upx;
			height: 82upx;
			border-radius: 50%;
			z-index: 100;
		}
	}
	.backHome{
		display: flex;
		width: 410upx;
		height: 90upx;
		border-radius: 82upx;
		background: #fff;
		position: fixed;
		right:45upx ;
		bottom:200upx;
		padding:8upx 0 8upx 43upx;
		.li{
			font-size: 18upx;
			text-align: center;
			image{
				width: 38upx;
				height: 38upx;
			}
			&:nth-of-type(2){
				margin:0 20upx;
			}
		}
	}
</style>
