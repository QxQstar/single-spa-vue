import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

 const router = new Router({
  routes: [
    {
      path:'/account',
      component:() => import('./views/login.vue')
    },
    {
      path:'/',
      component:() => import('./views/main.vue'),
      children:[
        {
          path: '',
          component: Home
        },
        {
          path:'/about',
          component:() => import('./views/About.vue')
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
    next('/account')
  } else {
    next();
  }
})
export default router;
