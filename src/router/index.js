import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import Home from '../views/Home.vue'
import AllOrders from '../views/AllOrders.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },

  {
    path: '/menu',
    name: 'Menu',
    component: () => import(/* webpackChunkName: "menu" */ '../views/Menu.vue')
  },

  {
    path: '/allorders',
    name: AllOrders,
    component: AllOrders,
    beforeEnter: (to, from, next) => {
      if (store.getters.loggedIn) {
        next();
      } else {
        next(false);
      }
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
