<template>
	<view class='cookingDetail' v-if="idFoodLists.length!=0">
		<view class="cookimg">
			<image :src="'http://test.cdn.psycloud.com.cn/'+IngredientsList[0].url+'?v'+urlV"></image>
		</view>
		<view class="cook">
			<view class="h3">
					{{IngredientsList[0].name}}
			</view>
			<view class="cookList">
				<view class="cookListImg">
					<image src='./../../static/img/食材清单-标题.png'></image>
				</view>
				<view class='baseFood'>
					<view class='li' v-for="(item,index) in idFoodLists" :key="index">
						<view>
							{{item.name}}
						</view>
						<view>
							{{item.weight}}g
						</view>
					</view>
				</view>
				<view class="cookListImg">
					<image src="./../../static/img/烹饪步骤-标题.png" mode=""></image>
				</view>
				<view class="cookStep" v-html="IngredientsList[0].text">
					
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data() {
			return {
				foodId:'',
				idFoodLists:'',
				IngredientsList:'',
				urlV:""+new Date().getTime()
			}
		},
		onLoad(option){
			let { id } = option 
			this.foodId=id
			this.getFoodInfo(this.foodId)
		},
		methods:{
			getFoodInfo(foodId){
				this.$request({
					url:"/front/food/foodIngredientsList",
					data:{
						foodId:foodId,
					}
				}).then(res => {
					this.idFoodLists=res.data.data.idFoodLists
					this.IngredientsList=res.data.data.IngredientsList
				})
			}
			
		}
	}
	
</script>

<style scoped lang="scss">
	.cookingDetail{
		.cookimg{
			width:100%;
			height: 390upx;
			image{
				width: 100%;
				height: 100%;
			}
		}
		.cook{
			padding:0 30upx;
			.h3{
				font-size: 30upx;
				color: #000;
				margin:30upx 0;
				text-align: center;
				letter-spacing: 2px;
			}
			.cookList{
				.cookListImg{
					width: 100%;
					height: 50upx;
					margin:30upx 0;
					image{
						width: 100%;
						height: 100%;
					}
				}
				.baseFood{
					.li{
						display: flex;
						justify-content: space-between;
						line-height: 84upx;
						border-bottom: 1px dashed   #ccc;
					}
				}
				.cookStep{
					text-align: left;
					line-height: 40upx;
					letter-spacing: 2upx;
				}
			}
		}
		.otherMenu{
			padding: 0 30upx;
			.title{
				font-size: 36upx;
				color: #000;
				font-weight: bold;
				padding: 30upx 0;
			}
			.uni-swiper-slide-frame{
				.proimg{
					width: 300upx;
					height: 220upx;
					image{
						width: 100%;
						height: 100%;
						border-radius: 20upx;
					}
				}
				.proword{
					color: #000;
					font-weight: bold;
					line-height:74upx;
					text-align: center;
					font-size: 26upx;
				}
			}
		}
	}
	
</style>
