// style import
import 'assets/css/reset.css'
import 'assets/css/global.css'
// components import
import Vue from 'vue'
import router from './router'
import App from './test-spa.vue'
// plugin
import 'plugin/event-proxy'

Vue.config.productionTip = false

/* eslint no-new: "off" */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
