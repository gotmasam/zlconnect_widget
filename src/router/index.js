import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import ResponseMessage from '../views/ResponseMessage.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/ResponseMessage',
    name: 'ResponseMessage',
    component: ResponseMessage
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
