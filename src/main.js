import Vue from 'vue'
import App from './App.vue'
// 引入elementui组件库
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
// 引入router
import router from '@/router'
Vue.use(router)
// 注册全局API属性
import API from '@/api'
// 任意组件可以使用api接口
Vue.prototype.$API = API
// 引入懒加载
import loading from "@/assets/image/3132508627578625.jpg"
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {loading})
// 引入vuex
import store from "@/store";
// 引入Cookie
import Cookie from 'js-cookie'
Vue.config.productionTip = false
// 引入vue-aplayer
import aplayer from '@moefe/vue-aplayer';
Vue.use(aplayer, {
  defaultCover: 'https://s4.music.126.net/style/web2/img/default/default_album.jpg', // 设置播放器默认封面图片
  productionTip: true, // 是否在控制台输出版本信息
});
// 阿里图标库
Vue.use('//at.alicdn.com/t/font_3346479_fnm0s1lnkw.css')
new Vue({
  render: h => h(App),
  router,
  store,
  beforeCreate(){
    Vue.prototype.$bus = this
    Vue.prototype.$Cookie = this
  },
}).$mount('#app')
