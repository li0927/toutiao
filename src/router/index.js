import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login')
  },
  {
    path: '/search',
    name: 'SearchPage',
    component: () => import('@/views/search')
  },
  {
    path: '/',
    // name: 'layout',设置了默认子路由就不需要起名字
    component: () => import('@/views/layout'),
    children: [
      // 默认子路由，path属性为空，只有一个
      { path: '', name: 'Homepage', component: () => import('@/views/home') },
      { path: '/qa', name: 'Qapage', component: () => import('@/views/qa') },
      {
        path: '/video',
        name: 'Videopage',
        component: () => import('@/views/video')
      },
      {
        path: '/my',
        name: 'Mypage',
        component: () => import('@/views/personal')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

// router.beforeEach((to,from,next)=>{
//   if(to.path!=='/login'&&)
// })

export default router
