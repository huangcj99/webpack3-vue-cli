import Vue from 'vue'
import createAxios from './axios'

const axiosPlugin = {
  install: function (Vue, options) {
    Vue.prototype.$http = createAxios()
  }
}

Vue.use(axiosPlugin)