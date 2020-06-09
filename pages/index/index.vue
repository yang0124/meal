<template>
	<view class="home">
		<!-- 做选项卡的部分 -->
		<view class="ul">
			<view class="li" v-for="(item,index) in seasonList" :key="index" :class="TabCur==index+1? 'active':''"  @tap='getCookList(item.id)'>
				{{item.name}}
			</view>
		</view>
		<!-- 这是做列表的展示部分 -->
		<view class="proShow">
			<view class="prolist" v-for="(item,index) in cookList" :key='index' @tap='toIndexDetail(item.id)'>
				<view class="proimg">
					<image :src="'http://test.cdn.psycloud.com.cn/'+item.url+'?v'+urlV" :lazy-load="lazyLoad"></image>
				</view>
				<view class="proword">
					{{item.name}}
				</view>
			</view>
		</view>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				seasonList:'',
				cookList:"",
				TabCur: '',
				page:1,
				lazyLoad:true,
				urlV:''+new Date().getTime()
			}
		},	
		onLoad(){
			//这是对季节的请求
			this.getSeasonList()
		},
		methods:{
			getSeasonList(){
				this.$request({
					url:"/front/food/querySeasonList"
				}).then(res=>{
					if(res.data.code==0){
						this.seasonList=res.data.data;
						this.TabCur=res.data.data[0].id
						this.getCookList(this.TabCur)
					}
				})
			},
			//这是做季节下面的列表请求
			getCookList(id){
				this.TabCur=id
				this.$request({
					url:"/front/food/queryCookList",
					data:{
						page:this.page,
						limit:10,
						seasonId:id
					}
				}).then(res => {
					if(res.data.code==0){
						this.cookList=res.data.data
					}
				})
			},

			toIndexDetail(id){
				uni.navigateTo({
					url:`/pages/indexDetail/indexDetail?id=${id}`
				})
			},
		}
		
	}
</script>

<style scoped lang="scss">
	.home{
		padding: 0 30upx;
		.ul{
			display: flex;
			justify-content: space-between;
			font-size: 32upx;
			.li{
				line-height: 70upx;
				box-sizing: border-box;
				margin:30upx 0;
			}
			.li.active{
				border-bottom: 4upx solid #f5cc38;
				border-radius: 1px;
			}
		}
		.proShow{
			margin-top: 30upx;
			display: flex;
			// justify-content: space-between;
			flex-wrap: wrap;
			.prolist{
				.proimg{
					width: 200upx;
					height: 200upx;
					image{
						width: 100%;
						height: 100%;
						border-radius: 20upx;
					}
				}
				.proword{
					line-height:74upx;
					text-align: center;
					font-size: 26upx;
				}
				&:nth-of-type(3n+2){
					margin:0 45upx
				}
			}
		}
	}
</style>
