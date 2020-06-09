<script>
	import Vue from 'vue'
	export default {
		onLaunch: function() {
			uni.getSystemInfo({
				success: function(e) {
					// #ifndef MP
					Vue.prototype.StatusBar = e.statusBarHeight;
					if (e.platform == 'android') {
						Vue.prototype.CustomBar = e.statusBarHeight + 50;
					} else {
						Vue.prototype.CustomBar = e.statusBarHeight + 45;
					};
					// #endif
					// #ifdef MP-WEIXIN
					Vue.prototype.StatusBar = e.statusBarHeight;
					let custom = wx.getMenuButtonBoundingClientRect();
					Vue.prototype.Custom = custom;
					Vue.prototype.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
					// #endif		
					// #ifdef MP-ALIPAY
					Vue.prototype.StatusBar = e.statusBarHeight;
					Vue.prototype.CustomBar = e.statusBarHeight + e.titleBarHeight;
					// #endif
				}
			})
			let openid=uni.getStorageSync('openid');
			if(openid){
				uni.switchTab({
					url:'pages/index/index'
				})
			}else{
				uni.redirectTo({
					url:'pages/log/log'
				})
			}
		},
		onShow: function() {
			
		},
		onHide: function() {
			
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import "colorui/main.css";
	@import "colorui/icon.css";
	body{
		font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
	}
	/*每个页面公共css */
	button {
		padding: 0upx;
		margin: 0upx;
		border: none;
		border-radius: 0upx;
		box-sizing: border-box;
	}
	
	.button-hover {
		transform: translate(3upx, 3upx) !important;
		transition: .2s;
	}
	
	button::after {
	  border: none
	}
	
	/*每个页面公共css */
	@font-face {
	  font-family: 'iconfont';  /* project id 1568268 */
	  src: url('//at.alicdn.com/t/font_1568268_lj6pp5t7hf.eot');
	  src: url('//at.alicdn.com/t/font_1568268_lj6pp5t7hf.eot?#iefix') format('embedded-opentype'),
	  url('//at.alicdn.com/t/font_1568268_lj6pp5t7hf.woff2') format('woff2'),
	  url('//at.alicdn.com/t/font_1568268_lj6pp5t7hf.woff') format('woff'),
	  url('//at.alicdn.com/t/font_1568268_lj6pp5t7hf.ttf') format('truetype'),
	  url('//at.alicdn.com/t/font_1568268_lj6pp5t7hf.svg#iconfont') format('svg');
	}
	
	.iconfont {
	  font-family: "iconfont" !important;
	  font-size: 25px;
	  font-style: normal;
	  -webkit-font-smoothing: antialiased;
	  -moz-osx-font-smoothing: grayscale;
	}
	
	.iconweixin:before {
	  content: "\e66f";
	}
	
	.iconzhifubao:before {
	  content: "\e68e";
	}
	
	.iconzhifubao1:before {
	  content: "\e60f";
	}
</style>
