import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vant from 'vant';
import { Toast } from 'vant';
import 'vant/lib/index.css';


Vue.config.productionTip = false
// vant组件
Vue.use(Vant);
Vue.use(Toast);
Toast.setDefaultOptions({duration:800});

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
