let baseUrl='https://food.psycloud.com.cn:1480/food'
// let baseUrl ='http://192.168.1.183:6080/food'
// let baseUrl ='http://232g3567n6.51mypc.cn:1480/food'
//let baseUrl ='http://192.168.1.2:1480/food/'
export function request(options){
	let { url, method ,data,header } = options;
	return new Promise((resolve,reject) => {
		//这是做加载的动画
		let timer=setTimeout(()=>{
			uni.showLoading({
				title:'正在努力为您加载中'
			})
		},1000)
		
		//做输出的请求的相关命令
		uni.request({
			url:baseUrl + url,
			method:method || 'GET' ,
			data:data || {} ,
			header:header || {} ,
			success:res => {
				resolve(res)
				clearTimeout(timer)
			},
			fail: err => {
				reject(err)
			},
			complete:() => {
				uni.hideLoading()
			}  
		})
		
	})
	
}