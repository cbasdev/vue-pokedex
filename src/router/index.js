import Vue from 'vue'
import Store from '@/store'
import Router from 'vue-router'

import Home from '@/views/Global/Home.vue'

Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      layout: 'default',
      title: 'Home',
      logo: 'logo.png',
    },
  },
]

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
