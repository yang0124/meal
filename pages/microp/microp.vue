<template>
	<view class="microp">
		<!-- 这是做的侧边栏部分 -->
		<view class="sidebar">
			<view class="li" v-for="(item,index) in FoodClassifyList" @tap='getFoodList(item.id)' :key='item.id' :class="tabCur==item.id?'active':''">
				{{item.food_classify_name}}
				<image  src="../../static/img/8页绿叶.png" mode=""></image>
			</view>
			
		</view>
		<view class="content">
			<view class="proShow">
				<view class="prolist" v-for="(item,index) in FoodList" :key='item.id' @tap='ToMicrDetail(item.id)'>
					<view class="proimg">
						<image :src="'http://test.cdn.psycloud.com.cn/'+item.url+'?v'+urlV" mode="" lazy-load="true"></image>
					</view>
					<view class="proword">
						{{item.name}}
					</view>
				</view>
			</view>
		</view>
	</view>
	
</template>

<script>
	export default {
		data() {
			return {
				FoodClassifyList: [],
				tabCur:1,
				FoodList:[],
				urlV:''+new Date().getTime()
			}
		},
		onLoad(){
			this.getFoodClassifyList()
		},
		methods:{
			getFoodClassifyList(){
				this.$request({
					url:"/front/food/queryFoodClassifyList"
				}).then(res=>{
					this.FoodClassifyList=res.data.data
				})
				this.getFoodList(this.tabCur)
			},
			getFoodList(id){
				this.tabCur=id
				this.$request({
					url:"/front/food/queryFoodListByClassifyId",
					data:{
						page:1,
						limit:10,
						classifyId:id 
					}
				}).then(res=>{
					console.log(res)
					this.FoodList=res.data.data
				})
			},
			ToMicrDetail(id){
				uni.navigateTo({
					url:'/pages/micrDetail/micrDetail?id='+id
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	page,body{
		height: 100%;
	}
	.microp{
		padding-top: 50upx;
		display: flex;
		height: 100%;
	}
	.sidebar{
		.li{
			line-height: 80upx;
			width: 184upx;
			text-align: center;
			font-size: 20upx;
			color: #000000;
			margin:10upx 0;
			box-sizing: border-box !important;
			position: relative;
			image{
				position: absolute;
				left: 0;
				top:0;
				width: 184upx;
				height: 80upx;
			}
		}
		.active{
			border-top:1px dashed #4faffc;
			border-bottom:1px dashed #4faffc;
			border-left: 6upx solid #4faffc;
			font-size: 28upx;
		}
	}
	.content{
		padding: 0 30upx;
		overflow-y: auto;
	}
	.proShow{
		margin-top: 30upx;
		display: flex;
		flex-wrap: wrap;
		.prolist{
			margin-bottom: 20upx;
			.proimg{
				width: 140upx;
				height: 140upx;
				image{
					width: 100%;
					height: 100%;
					border-radius: 20upx;
				}
			}
			.proword{
				text-align: center;
				font-size: 26upx;
				max-width: 140upx;
			}
			&:nth-of-type(3n+2){
				margin:0 40upx
			}
		}
	}
</style>