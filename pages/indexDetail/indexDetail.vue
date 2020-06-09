<template>
	<view class="eatplan" @tap="handleHide($event)">
		<view class="comFood">
			<view class="chooseData" id="chooseData" ref="chooseData">
				<view class="dropdown"  @tap='handleShow'>
					{{dataAll}}  <uni-text  class="lg text-gray chooseIcon" :class="isShow?'cuIcon-unfold':'cuIcon-fold'"><span></span></uni-text>
				</view>
				<view class="dropChoose"  :class="isShow?'actvie':''">
					<view class="dropDay" v-for="(item,index) in dataList" :key='index' @tap='handleChoose(item.weekname,item.id)'>
						{{item.weekname}}
					</view>
				</view>
			</view>
			<view class="choosePeo">
				<input type="number" placeholder="输入人数" class="chooseInp" v-model="person_number"> <text>人</text>
			</view>
			<view class="chooseBtn">
				<button @tap='showModal' data-target="DialogModal1">计算食材用量</button>
			</view>
		</view>
		<!-- 这是弹框部分 -->
		<view class="cu-modal" :class="modalName=='DialogModal1'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">春季食谱食材用量 <text>({{person_number}}人)</text> </view>	
				</view>
				<view class='dosageAll'>
					<view class='dosage' v-for="(item,index) in FoodConsumptionList" :key='index'>
							<view class="title">
								<image src="./../../static/img/left.png"  lazy-load="true"></image>
								<text>{{item.name}}</text>
								<image src="./../../static/img/right.png" mode="" lazy-load="true"></image>
							</view>
							<view class='list' v-for='(ite,inde) in item.items' :key='inde'>
								<view class='kind'>
									{{ite.foodName}}
								</view>
								<view class='weight'>
									{{ite.foodWeight/1000}}斤
								</view>
							</view>
					</view>
				</view>
				<view class="cu-bar bg-white justify-center">
					<view class="line-blue button" @tap="hideModal">
						确定
					</view>
				</view>
			</view>
		</view>
		<!-- //这是图片的部分 -->
		<view class="carousel">
			<image src="../../static/img/2页星星.png" mode=""></image>
		</view>
		<!-- //这是切换的部分 -->
		<view class="ul">
			<view class="li" v-for="(item,index) in dayList" :key="index" :class="dayNum==index+1?'active':''" @tap='getDataList(cookId,index+1)'>
				{{item}}
			</view>
		</view>
		<!-- //这是展示的部分 -->
		<view class='foodCard' v-for="(item,index) in foodList" :key='index'>
			<view class="name">
				{{item.name}}
			</view>
			<scroll-view class="scroll" scroll-x="true"  >
				<view class="proShow">
					<!-- 这是在遍历到每个餐下面的具体数据 -->
					<view class="prolist" v-for="(ite,inde) in item.items" :key="inde" @tap='toCookDetail(ite.id)'>
						<view class="proimg">
							<image :src="'http://test.cdn.psycloud.com.cn/'+ite.url+'?v'+urlV"  :lazy-load="true"></image>
						</view>
						<view class="proword">
							{{ite.food_id}}
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import model from '../../colorui/components/cu-custom.vue'
	export default {
		components:{
			model,
		},
		data() {
			return {
				person_number:'',
				cookId:'',
				foodList:'',
				modalName: null,
				chooseId:'',
				isShow:true,
				dayNum:'1',
				Num:'0',
				dataAll:'全部',
				TabCur: 0,
				dataList:[{"weekname":"全部","id":0},{"weekname":"周一","id":1},{"weekname":"周二","id":2},{"weekname":"周三","id":3},{"weekname":"周四","id":4},{"weekname":"周五","id":5}],
				dayList:['周一','周二','周三','周四','周五'],
				FoodConsumptionList:"",
				urlV:''+new Date().getTime(),
			}
		},
		onLoad(option){
			let { id } =option
			this.cookId=id
			this.getDataList(this.cookId,this.dayNum)
		},
		methods: {
			//这做的是请求数据
			getDataList(cookId,weekIds){
				this.dayNum=weekIds
				this.$request({
					url:"/front/food/queryFoodList",
					data:{
						 cookId:cookId,
						 weekIds:this.dayNum 
					}
				}).then(res => {
					if(res.data.code){
						this.foodList=res.data.data
						console.log(this.foodList)
					}
				})
			},
			//这是在请求计算食材用量的操作
			getFoodConsumption(cookId,weekIds,person_number){
				this.$request({
					url:"/front/food/queryFoodConsumption",
					data:{
						 cookId,
						 weekIds,
						 person_number
					}
				}).then(res => {
					if(res.data.code){
						this.FoodConsumptionList=res.data.data
					}
				})
			},
			handleShow(){
				this.isShow=false;
			},
			//这是做的是点击其他地方关闭
			handleHide(el){
				var dp =uni.createSelectorQuery().in(this).select("#chooseData")
				// console.log(dp)
				
				// console.log(document.getElementById('chooseData'))
				// var dp=query.select("#chooseData")
				// if(dp){
				// 	if(!dp.contains(event.target)){
				// 		this.isShow=true
				// 	}
				// }
			},
			//这是做的选择部分
			handleChoose(weekname,chooseId){
				this.dataAll=weekname;
				this.Num=chooseId;
				this.isShow=true;
			},
			//这是做计算食材用量的功能，并且弹出
			showModal(e) {
				var reg = /^[0-9]+.?[0-9]*$/
				if(reg.test(this.person_number)){
					this.modalName = e.currentTarget.dataset.target
					this.getFoodConsumption(this.cookId,this.Num,this.person_number)
				}else{
					uni.showToast({
						title:'请输入正确的人数',
						icon:'none'
					})
				}
				
			},
			hideModal(e) {
				this.modalName = null
			},
			//这是跳转到烹饪制作的地方
			toCookDetail(id){
				console.log(id)
				uni.navigateTo({
					url:'../../pages/cookingDetail/cookingDetail?id='+id
				})
				this.isShow=true
			}
		}
	}
</script>

<style scoped lang="scss">
	.eatplan{
		padding: 0 30upx;
	}
	//这是头部计算的部分
	.comFood{
		margin: 30upx 0 40upx 0;
		position: relative;
		display: flex;
		justify-content: space-between;
		.dropdown{
			text-align: center;
			width: 140upx;
			height: 60upx;
			border-radius: 60upx;
			font-size:24upx;
			border:1px solid rgba(214,213,214,1);
			line-height: 60upx;
			.chooseIcon{
				margin-left: 10upx;
			}
		}
		.dropChoose{
			position: absolute;
			background: #fff;
			z-index: 100;
			top:80upx;
			width: 140upx;
			height: 295upx;
			border:1px solid rgba(214,213,214,1);
			text-align: center;
			.dropDay{
				font-size:24upx;
				font-family:PingFangSC;
				font-weight:400;
				color:rgba(51,51,51,1);
				line-height: 46upx;
			}
		}
		.actvie{
			display: none;
		}
		.choosePeo{
			display: flex;
			font-size: 26upx;
			.chooseInp{
				width: 240upx;
				height: 60upx;
				border:1px solid rgba(214,213,214,1);
				border-radius:30upx;
				text-align: center;
				font-size: 26upx;
			}
			text{
				margin-left:10upx ;
				line-height: 60upx;
			}
		}
		.chooseBtn{
			button{
				width: 220upx;
				height: 60upx;
				background:linear-gradient(90deg,rgba(107,164,254,1),rgba(75,134,250,1));
				border-radius:30upx;
				font-size: 26upx;
				color:rgba(255,255,255,1)
			}
			
		}
	}
	//这是做弹框部分的样式
	.cu-modal{
		.content{
			font-size:32upx;
			color: #000;
			width: 100%;
		}
		.dosageAll{
			max-height:772upx;
			overflow-y: auto;
			.dosage{
				padding:20upx 80upx ;
				.title{
					display: flex;
					justify-content: space-between;
					line-height: 60upx;
					font-size: 30upx;
					image{
						width: 152upx;
						height: 60upx;
					}
				}
				.list{
					font-size: 26upx;
					color:#999999;
					margin: 30upx 0;
					display: flex;
					justify-content: space-between;
				}	
			}
		}
		.cu-bar{
			border-top:1px solid #D2D3D5;
			line-height: 100upx;
			font-size: 36upx;
			.button{
				width: 100%;
			}
		}
		
		
	}
		
	//这是做图片的部分
	.carousel{
		width: 688upx;
		height:75upx;
		margin:30upx 0;
		image{
			width: 100%;
			height: 100%;
		}
	}
	//做选项卡部分
	.ul{
		display: flex;
		justify-content: space-between;
		font-size: 32upx;
		.li{
			line-height: 70upx;
			width:70upx;
			box-sizing: border-box;
			margin:30upx 0;
			color: #666;
		}
		.li.active{
			border-bottom: 4upx solid #f5cc38;
			border-radius: 1px;
			color:#000000;
		}
	}
	//做的卡片部分的样式
	.foodCard{
		height: 354upx;
		.name{
			margin:26upx 0 30upx 10upx;
			font-size: 26upx;
			color: #666666;
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
	
</style>
