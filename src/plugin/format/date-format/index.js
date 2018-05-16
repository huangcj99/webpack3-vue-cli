import Vue from 'vue'
import dateFormat from './date-format'

const dateFormatPlugin = {
  install: function (Vue, options) {
    Vue.prototype.$dateFormat = dateFormat
  }
}

Vue.use(dateFormatPlugin)