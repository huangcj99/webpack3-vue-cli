import Vue from 'vue'
import Router from 'vue-router'

// 互动活动个子页面
import List from './components/list.vue'
const A = () => import(/* webpackChunkName: "a" */ './components/a/a.vue')
const B = () => import(/* webpackChunkName: "b" */ './components/b/b.vue')

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'list',
      component: List
    },
    {
      path: '/a',
      name: 'a',
      component: A
    },
    {
      path: '/b',
      name: 'b',
      component: B
    }
  ]
})

export default router
