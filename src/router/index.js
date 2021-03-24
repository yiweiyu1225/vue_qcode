import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '@/components/login'
import reg from '@/components/reg'
import all from '@/components/all'
import ok from '@/components/ok'
import text from '@/components/text'
import third from '@/components/third'
import one from '@/components/one'
import logistics from '@/components/logistics'
import wel from '@/components/wel'
import ema from '@/components/ema'
import agent from '@/components/agent'
import good from '@/components/good'
import allgood from '@/components/allgood'
import near from '@/components/near'
import addpage from '@/components/addpage'
// import ok from '@/components/ok'
import '@/assets/css/global.css'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: login
  },
  {
    path: '/register',
    component: reg
  },
  {
    path: '/home',
    component: all,
    redirect: '/welcome',
    children: [
      { path: '/one', component: one },
      { path: '/two', component: ok },
      { path: '/third', component: third },
      { path: '/logistics', component: logistics },
      { path: '/welcome', component: wel },
      { path: '/agent', component: agent },
      { path: '/allgood', component: allgood },
      { path: '/near', component: near },
      { path: '/add', component: addpage },
      { path: '/text', component: text }
    ]
  },
  {
    path: '/text',
    component: text
  },
  {
    path: '/email',
    component: ema
  },
  {
    name: good,
    path: '/good/:id',
    component: good
  }
]

const router = new VueRouter({
  routes
})

// router.beforeEach((to, from, next) => {
//   if (to.path === '/login') return next()
//   if (to.path === '/register') return next()
//   if (to.path === '/email') return next()
//   const stoken = window.sessionStorage.getItem('token')
//   if (!stoken) return next('/login')
//   next()
// })

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}
export default router
