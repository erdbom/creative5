import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Itinerary from '../views/Itinerary.vue'
import Destinations from '../views/Destinations.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/destinations',
    name: 'Destinations',
    component: Destinations
  },
  {
    path: '/itinerary',
    name: 'Itinerary',
    component: Itinerary
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
