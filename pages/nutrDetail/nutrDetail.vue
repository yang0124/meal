<template>
	<view class='nutrDetail'>
		<view class='nutrimg'>
			<image :src="'http://test.cdn.psycloud.com.cn/'+nutrDetailList.url+'?v'+urlV"></image>
		</view>
		<view class='article'>
			<view class='title'>
				{{nutrDetailList.name}}
			</view>
			<view class='word' v-html="nutrDetailList.detail">
				
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				nutrDetailList:'',
				urlV:''+new Date().getTime()
			}
		},
		onLoad(option){
			let { id } = option
			this.$request({
				url:"/front/food/queryNutritionInfo",
				data:{
					 nutritionId:id
				}
			}).then(res=>{
				this.nutrDetailList=res.data.data
			})
			
			
			
		},
		methods: {
			
		}
	}
</script>

<style scoped lang="scss">
	.nutrDetail{
		.nutrimg{
			width:100%;
			height: 390upx;
			image{
				width: 100%;
				height: 100%;
			}
		}
		.article{
			padding: 0 30upx;
		}
		.title{
			font-family:PingFangSC;
			text-align: center;
			font-size: 32upx;
			color: #000;
			margin:33upx 0;
			letter-spacing: 4upx;
		}
		.word{
			text-indent: 2em;
			line-height: 46upx;
			font-size: 26upx;
			color: #333;
			letter-spacing: 1px;
		
		}
	}
</style>
