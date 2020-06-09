import Vue from 'vue'
import App from './App'
import { request } from './http/index.js'
Vue.config.productionTip = false

Vue.prototype.$request = request
Vue.prototype.$qiniuUrl='http://test.cdn.psycloud.com.cn/'
App.mpType = 'app'


const app = new Vue({
    ...App
})
app.$mount()
