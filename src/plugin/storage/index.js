import Vue from 'vue'
import storage from './local-storage'

const storagePlugin = {
  install: function (Vue, options) {
    Vue.prototype.$storage = storage
  }
}

Vue.use(storagePlugin)