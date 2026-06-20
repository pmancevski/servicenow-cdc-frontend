import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import CreateIncident from '../views/CreateIncident.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/create',
    name: 'CreateIncident',
    component: CreateIncident
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router