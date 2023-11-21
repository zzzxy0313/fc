import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueResource from 'vue-resource'
//导入ElementUI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
 
//使用ElementUI
Vue.use(ElementUI);
Vue.config.productionTip = false
new Vue({
  router,
  store,
  VueResource,
  render: h => h(App)
}).$mount('#app')
