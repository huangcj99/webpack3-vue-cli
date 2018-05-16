// style import
import 'assets/css/reset.css'
import 'assets/css/global.css'
// components import
import Vue from 'vue'
import App from './test-postcss.vue'
// plugin import
import 'plugin/axios'
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
