// style import
import 'assets/css/reset.css'
import 'assets/css/global.css'
import './test.scss'
// components import
import Vue from 'vue'
import App from './test.vue'
import VueRx from 'vue-rx'
// plugin import
import 'plugin/http'
import 'plugin/format/date-format'
import 'plugin/storage'
import 'plugin/url-utils'
import 'plugin/detect-agent'
import 'plugin/validate'

Vue.use(VueRx) 
 
Vue.config.productionTip = false

/* eslint no-new: "off" */
new Vue({
  el: '#app',
  render: h => h(App)
})
