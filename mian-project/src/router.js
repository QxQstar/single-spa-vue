import vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

vue.use(Router)

 const router = new Router({
  routes: [
    {
      path:'/account',
      component:() => import(/* webpackChunkName: "login" */ './views/login.vue')
    },
    {
      path:'/',
      component:() => import(/* webpackChunkName: "main" */ './views/main.vue'),
      children:[
        {
          path: '',
          meta:{
            // 是否显示左侧菜单
            hiddenSideNav:true
          },
          component: Home
        },
        {
          path:'/about',
          meta:{
            hiddenSideNav:true
          },
          component:() => import(/* webpackChunkName: "About" */ './views/About.vue')
        },
        {
          path:'*',
        }
      ]
    }
  ]
})

router.beforeEach((to,from ,next) => {
  if(!document.cookie && to.path !== '/account') {
    console.log('fdfd')
    next('/account')
  } else {
    next();
  }
})
export default router;
