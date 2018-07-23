// style import
import 'assets/css/reset.css'
import 'assets/css/global.css'
import './test.scss'
// components import
import Vue from 'vue'
import App from './test.vue'
// plugin import
import 'plugin/http'
import 'plugin/format/date-format'
import 'plugin/storage'
import 'plugin/url-utils'
import 'plugin/detect-agent'
 
Vue.config.productionTip = false

/* eslint no-new: "off" */
new Vue({
  el: '#app',
  render: h => h(App)
})
