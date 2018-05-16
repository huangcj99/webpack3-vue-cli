import Vue from 'vue'
import detect from './detect'

const detectPlugin = {
  install: function (Vue, options) {
    Vue.prototype.$os = detect.os()
    Vue.prototype.$browser = detect.browser()
  }
}

Vue.use(detectPlugin)