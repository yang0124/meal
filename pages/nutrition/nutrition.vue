<template>
	<view class='nutr'>
		<view class="ul">
			<view class="li" v-for="(item,index) in nutrList" :key="index" :class="TabCur==item.id?'active':''" @tap='getNutrKind(item.id)'>
				{{item.name}}
			</view>
		</view>
		<view class='content'>
			<view class="chooseKind margin-tb-sm">
				<button class="cu-btn round margin-tb-sm"  
							v-for="(item,index) in nutrKind" :key='index' 
							@tap="getNutrDetail(item.id,index)"
							:class="btnNum==index?'bg-blue':'line-gray'"
							>
					{{item.name}}
				</button>
			</view>
			<view class="nutrCard" v-for="(item,index) in nutrDetailList" :key='index' @tap='nutrDetail(item.id)'>
				<view class='nutrimg'>
					<image :src="'http://test.cdn.psycloud.com.cn/'+item.url+'?v'+urlV"></image>
				</view>
				<view class="article">
					<view class='title'>
						{{item.name}}
					</view>
					<view class='word'>
						{{item.brief}}
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
				TabCur:1,
				btnNum:0,
				nutrList:[],
				nutrKind:[],
				nutrDetailList:[],
				Tab:0,
				urlV:''+new Date().getTime()
			}
		},
		onLoad(){
			this.getNutrList()
		},
		methods: {
			getNutrList(){
				this.$request({
					url:"/front/food/queryNutritionCategoryList",
					data:{
						page:1,
						limit:100,
						parentId:0,
					}
				}).then(res=>{
					this.nutrList=res.data.data.firstList,
					console.log(this.nutrList)
					this.getNutrKind(res.data.data.firstList[0].id)
				})
			},
			getNutrKind(id){
				this.TabCur=id	
				this.$request({
					url:"/front/food/queryNutritionSecond",
					data:{
						pid:id,
					}
				}).then(res=>{
					this.nutrKind=res.data.data
					this.getNutrDetail(res.data.data[0].id,0)
				})
			},
			getNutrDetail(id,index){
				this.btnNum=index
				this.$request({
					url:"/front/food/queryNutritionListByCategory",
					data:{
						page:1,
						limit:100,
						nutritionCategoryId:id,
					}
				}).then(res=>{
					this.nutrDetailList=res.data.data
				})
			},
			nutrDetail(id){
				uni.navigateTo({
				    url: '/pages/nutrDetail/nutrDetail?id='+id
				});
			}
		}
	}
</script>

<style scoped lang="scss">
	.nutr{
		padding: 0 30upx;
		.ul{
			display: flex;
			justify-content: space-between;
			font-size: 32upx;
			color: #000000;
			font-family:PingFangSC;
			.li{
				line-height: 60upx;
				box-sizing: border-box;
				margin:30upx 0;
			}
			.li.active{
				border-bottom: 4upx solid #f5cc38;
				border-radius: 1px;
			}
		}
		.content{
			.chooseKind{
				button{
					margin-right: 30upx;
				}
			}
			.nutrCard{
				width: 100%;
				height: 160upx;
				margin:40upx 0;
				display: flex;
				.nutrimg{
					width: 214upx;
					height: 160upx;
					image{
						border-radius: 10upx;
						width: 100%;
						height: 100%;
					}
				}
				.article{
					margin-left:30upx ;
					.title{
						font-size: 28upx;
						color: #000;
						margin:22upx 0 18upx 0
					}
					.word{
						font-size: 20upx;
						line-height: 36upx;
						color: #999;
						width: 393upx;
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 2;
						overflow:hidden;
						-webkit-box-orient: vertical
					}
				}
			}
		}
	}
</style>
