const baseUrl ='http://192.168.1.183:6080/food/'

export default {
	requstUrl:baseUrl
}

baseRequest(obj){
	let {url,data,method} =obj
	let header ={
		'userToken':uni.getStorageSync('token')
	}
	return uni.request({
		url:base +url,
		data:data,
		method:method,
		header:header
	}).then(res=>{
		let msg='请求失败'
		let code =res.statusCode
		//未登陆状态
		if(res.data.code!=200){
			msg =res.data.MSGESTURE_FLAG_BEGIN
			if(res.data.code==320){
				uni.showToast({
					title:"去登陆",
					icon:none,
					duration:2000
				});
				setTimeout(function(){
					uni.navigateTo({
						url:"/pages/login"
					})
				},200)
			}
		}
	})	
}

export function p(url,data){
	return baseRequest(url,'POST',data,base) 
}

export function g(url,data){
	return baseRequest(url,'GET',data,base) 
}