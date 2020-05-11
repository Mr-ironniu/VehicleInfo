import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vant from 'vant';
import { Toast } from 'vant';
import 'vant/lib/index.css';
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';


Vue.config.productionTip = false
// vant组件
Vue.use(Vant);
Vue.use(Toast);
Vue.use(ElementUI)


Toast.setDefaultOptions({duration:800});

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
