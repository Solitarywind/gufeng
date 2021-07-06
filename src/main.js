import './mock'
import './assets/css/global.scss'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import NProgress from 'nprogress';
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
// import api from './api/index'
// import showMessage from "./utils/showMessage";

// Vue.prototype.$showMessage = showMessage;
// Vue.prototype.$Http = api;
Vue.use(ElementUI);
Vue.use(mavonEditor);
Vue.config.productionTip = false
NProgress.inc(0.2);
NProgress.configure({ easing: 'ease', speed: 500, showSpinner: false })
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
