import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/login', component: Login },
    { path: '/', redirect: '/login' },
    { path: '/home', component: Home }
  ]
})
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    return next()
  } else {
    const tokenstr = window.sessionStorage.getItem('token')
    if (!tokenstr) {
      return next('/login')
    } else return next()
  }
})

export default router
