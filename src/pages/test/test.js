import 'assets/css/reset.css'
import './test.scss'
import 'plugin/register-hooks'
import 'plugin/rxjs'
import 'plugin/axios'
import App from './app.vue'

/* eslint no-new: "off" */
new Vue({
  el: '#app',
  render: h => h(App)
})
