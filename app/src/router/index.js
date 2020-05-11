import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/login/Login.vue'
import Home from '../views/Home/home.vue'
import Publish from '../views/Home/message/publish/publish.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/signup',
    name: 'SignUp',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/SignUp.vue')
  },
  {
    path: '/home',
    name: 'Home',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: Home,
    children:[
      {
        path: 'mine',
        name: 'mine',
        component: () => import(/* webpackChunkName: "user" */ '../views/Home/mine/mine.vue')
      },
      {
        path: 'help',
        name: 'help',
        component: () => import(/* webpackChunkName: "user" */ '../views/Home/help/help.vue')
      },
      {
        path: 'detail',
        name: 'detail',
        component: () => import(/* webpackChunkName: "user" */ '../views/Home/help/helpDetail.vue')
      },
      {
        path: 'message',
        name: 'message',
        component: () => import(/* webpackChunkName: "user" */ '../views/Home/message/message.vue')
      },
      {
        path: 'map',
        name: 'map',
        component: () => import(/* webpackChunkName: "user" */ '../views/Home/map/map.vue')
      }
    ]
  },{
    path: '/publish',
    name: 'publish',
    component: Publish,
  },
]

const router = new VueRouter({
  routes
})

export default router
