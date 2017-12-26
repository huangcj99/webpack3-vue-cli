import 'assets/css/reset.css'
import './test.scss'
import Vue from 'vue'
import App from './app.vue'

/* eslint no-new: "off" */
new Vue({
  el: '#app',
  render: h => h(App)
})
