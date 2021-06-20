import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/app/home/Home.vue'
import Admin from '@/app/admin/Admin.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/unapproved',
    component: Admin,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
