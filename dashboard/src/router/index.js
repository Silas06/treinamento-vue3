import { createRouter, createWebHistory } from 'vue-router'

const Feedbacks = () => import('@/views/Feedbacks')
const Credencials = () => import('@/views/Credencials')
const Home = () => import('@/views/Home')

export const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/credencials',
    name: 'Credencials',
    component: Credencials,
    meta: {
      hasAuth: true
    }
  },
  {
    path: '/feedbacks',
    name: 'Feedbacks',
    component: Feedbacks,
    meta: {
      hasAuth: true
    }
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: { name: 'Home' }
  }
]

const router = createRouter({
  history: createWebHistory(''),
  routes
})

export default router
