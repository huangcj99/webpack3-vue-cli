import 'assets/css/reset.css'
import './test.scss'
import Vue from 'vue'
import App from './app.vue'

/* eslint no-new: "off" */
new Vue({
  el: '#app',
  render: h => h(App)
})

async function test () {
  let a = await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(123)
    }, 2000)
  })

  console.log(a)

  let b = await new Promise((resolve, reject) => {
    setTimeout(() => resolve(3444444444), 2000)
  })

  console.log(b)
}

test()
