import Vue from 'vue'
import VueRx from 'vue-rx'
import Rx from 'rx'
import rxPlugin from './plugin'

Vue.use(VueRx, Rx)
Vue.use(rxPlugin)