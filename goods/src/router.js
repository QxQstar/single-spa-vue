import vue from 'vue'
import Router from 'vue-router'
import list from './views/list.vue'
import goods from './views/goods.vue';
// import detail from './views/detail.vue'
vue.use(Router)
const routes = [
  {
    path:'/',
    redirect:'/goods'
  },
  {
    path: '/goods',
    name: 'home',
    redirect:'/goods/list',
    component:goods,
    children:[
      {
        path:'list',
        component: list
      },
      {
        path:'new',
        component: () => import(/* webpackChunkName: "goods-new" */ './views/newGoods.vue')
      },
      {
        path:'detail',
        name: 'detail',
        component: () => import(/* webpackChunkName: "goods-detail" */ './views/detail.vue')

      }
    ]
  }
]

const router = new Router({
  routes: routes
})
export default router
