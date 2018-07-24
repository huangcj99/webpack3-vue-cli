import Vue from 'vue'
import ValidateManager from './manager'

const validatePlugin = {
  install: function (Vue, options) {
    Vue.prototype.$ValidateManager = ValidateManager
  }
}

Vue.use(validatePlugin)