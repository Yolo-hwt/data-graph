import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';
import jquery from 'jquery'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
//引入路由器
import router from './router'
Vue.prototype.$ = jquery
Vue.use(VueRouter)
    //拥有一个全新的配置项

Vue.config.productionTip = false
const vm = new Vue({
    render: h => h(App),
    router: router
}).$mount('#app')

console.log(vm);