<template>
	<view class='mictDetail' v-if="micrDetail.name">
		<view class='micrimg'>
			<image :src="'http://test.cdn.psycloud.com.cn/' + micrDetail.url +'?v'+urlV"></image>
		</view>
		<view class='article'>
			<view class='title'>
				{{micrDetail.name}}
			</view>
			<view class='word' v-html="micrDetail.text">
				<!-- <p>
					苹果具有丰富的营养，是很受大众欢迎的一款水果，俗话说:慢吃苹果快吃糖。苹果的营养很丰富，吃苹果时要细嚼慢咽，这样不仅有利于消化，还能防病抗癌。那吃苹果的禁忌有哪些？一起来看看吧！
				</p>
				<p>1、苹果核不能吃。</p> -->
			</view>
		</view>
		<view class="otherFood">
			<view class="title">
				其他推荐
			</view>
			<scroll-view class="scroll" scroll-x="true"  >
				<view class="proShow">
					<!-- 这是在遍历到每个餐下面的具体数据 -->
					<view class="prolist" v-for="(item,index) in otherFoodList" :key="index" @tap='ToMicrDetail(item.id)'>
						<view class="proimg">
							<image :src="'http://test.cdn.psycloud.com.cn/'+item.url +'?v'+urlV"  :lazy-load="true"></image>
						</view>
						<view class="proword">
							{{item.name}}
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				micrDetail:'',
				micrRecommend:'',
				otherFoodList:'',
				urlV:''+new Date().getTime()
			}
		},
		onLoad(option){
			let { id } =option
			console.log(id)
			//这是请求的详情的列表的操作
			this.$request({
				url:"/front/food/queryFoodInfo",
				data:{
					foodId:id
				}
			}).then(res =>{
				this.micrDetail=res.data.data
				console.log(this.micrDetail)
				uni.setNavigationBarTitle({
					title:res.data.data.name
				})
			})
			//这是请求相关推荐的操作
			this.$request({
				url:"/front/food/queryRelativeFoodList",
				data:{
					foodId:id,
					page:'1',
					limit:'100',
				}
			}).then(res =>{
				console.log(res)
				this.otherFoodList=res.data.data
			})
		},
		methods: {
			ToMicrDetail(id){
				uni.navigateTo({
					url:'/pages/micrDetail/micrDetail?id='+id
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.mictDetail{
		.micrimg{
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
			text-align: left;
			letter-spacing: 2px;
		
		}
		.otherFood{
			padding: 0 30upx;
			.title{
				font-size: 36upx;
				color: #000;
				font-weight: bold;
				padding: 30upx 0;
				text-align: left;
			}
			.proShow{
					display: flex;
					.prolist{
						margin-right: 24upx;
						.proimg{
							width: 200upx;
							height: 200upx;
							text-align: center;
							image{
								width: 100%;
								height: 100%;
								border-radius: 20upx;
							}
						}
						.proword{
							line-height:74upx;
							text-align: center;
							font-size: 20upx;
						}
					}
				}
		}
	}
</style>
