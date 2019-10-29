import vue from 'vue'
import Router from 'vue-router'
import list from './views/list.vue'
// import detail from './views/detail.vue'
vue.use(Router)
const routes = [
  {
    path: '/goods',
    name: 'home',
    redirect:'/goods/list'
  },
  {
    path:'/goods/list',
    component: list
  },
  {
    path:'/goods/new',
    component: () => import(/* webpackChunkName: "goods-new" */ './views/newGoods.vue')
},
{
  path: '/goods/detail',
      name: 'detail',
    // component:detail
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "goods-detail" */ './views/detail.vue')
}
]

const SLH_APP = (window.SLH_APP || {});
SLH_APP.routes = (SLH_APP.routes || []).concat(routes)
export default new Router({
  routes: routes
})
