import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Profil from '../views/Profil.vue'
import question from '../views/Question.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  
  {
    path: '/profil',
    name: 'profil',
    component: Profil
  },
  {
    path: '/question',
    name: 'question',
    component: question
  }

]

const router = new VueRouter({
  routes
})

export default router
