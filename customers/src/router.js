import Vue from 'vue'
import Router from 'vue-router'
import list from './views/list.vue'
import detail from './views/detail.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/other/customers',
      name: 'home',
      component: list
    },
    {
      path: '/other/customers/detail',
      name: 'detail',
      // component:detail,
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "customers-detail" */ './views/detail.vue')
    }
  ]
})
