import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Signin from '@/components/Signin'
import Profile from '@/components/Profile'
import Members from '@/components/Members'
import store from '@/store'

Vue.use(Router)

export const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/signin',
      name: 'Signin',
      component: Signin
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile
    },
    {
      path: '/members',
      name: 'Members',
      component: Members
    }
  ]
})
router.beforeEach((to, from, next) => {
  if (to.name !== 'Signin' && !store.getters['auth/isConnected']) {
    next({name: 'Signin', query: {redirect: to.fullPath}})
  } else if (to.name === 'Signin' && store.getters['auth/isConnected']) {
    next({name: 'Home'})
  } else {
    next()
  }
})
