import Vue from 'vue'
import urlUtils from './url-utils'

const urlPlugin = {
  install: function (Vue, options) {
    // 获取url key值对应的value
    Vue.prototype.$getUrlParams = urlUtils.getUrlParams
    // 给url填充对应参数
    Vue.prototype.$fillParams = urlUtils.fillParams
  }
}

Vue.use(urlPlugin)