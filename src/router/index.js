import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import CreateIncident from '../views/CreateIncident.vue'
import IncidentDetail from '../views/IncidentDetail.vue'

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
  },
  {
  path: '/incident/:id',
  name: 'IncidentDetail',
  component: IncidentDetail,
  props: true  // ← Add this
}
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router