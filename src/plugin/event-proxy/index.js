import Vue from 'vue'
import EventProxy from './event-proxy'

const eventProxyPlugin = {
  install: function (Vue, options) {
    Vue.prototype.$EventProxy = new EventProxy()
  }
}

Vue.use(eventProxyPlugin)