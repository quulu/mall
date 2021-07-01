import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 导入插件
import toast from 'components/common/toast'
// 安装toast插件
Vue.use(toast);

Vue.config.productionTip = false

// 添加$bus这个事件总线
Vue.prototype.$bus = new Vue();

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')

/*
mint - ui
iview
*/
