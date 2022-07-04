import { useAuthStore } from '../stores/authStore'
import { createRouter, createWebHistory } from 'vue-router'
import { validToken } from '../utils/validToken'

import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Account from '../views/Account.vue'
import Home from '../views/Home.vue'
import Store from '../views/Store.vue'
import Library from '../views/Library.vue'
import CreateGame from '../views/CreateGame.vue'
import UpdateGame from '../views/UpdateGame.vue'
import ViewGame from '../views/ViewGame.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/about',
      name: 'About',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/create',
      name: 'CreateGame',
      component: CreateGame,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/store',
      name: 'Store',
      component: Store,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/library',
      name: 'Library',
      component: Library,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/edit-game/:id',
      name: 'UpdateGame',
      component: UpdateGame,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/delete-game/:id',
      name: 'DeleteGame',
      component: () => import('../views/DeleteGame.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/account',
      name: 'Account',
      component: Account,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/edit-account',
      name: 'EditAccount',
      component: () => import('../views/EditAccount.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/delete-account',
      name: 'DeleteAccount',
      component: () => import('../views/DeleteAccount.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/game/:id',
      name: 'ViewGame',
      component: ViewGame,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/:catchAll(.*)',
      name: 'NotFound',
      component: () => import('../views/404.vue')
    }
  ]
})

router.beforeEach((to, from) => {
  // instead of having to check every route record with
  // to.matched.some(record => record.meta.requiresAuth)
  
  // to fix this
  // let logged
  // validToken().then(value => logged = value).catch(logged = false)
  // console.log(logged)
  let token = localStorage.getItem('access')
  if (to.meta.requiresAuth && !token) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    return {
      path: '/login',
      // save the location we were at to come back later
      query: { redirect: to.fullPath },
    }
  }
})

export default router
