import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    meta: {
      title: 'Presentation',
      icon: 'home',
    },
    path: '/',
    name: 'Presentation',
    component: () => import('@/views/PresentationView.vue')
  },
  {
    meta: {
      title: 'Configuration',
      icon: 'gear',
    },
    path: '/config',
    name: 'Configuration',
    component: () => import('@/views/ConfigView.vue')
  },
  {
    meta: {
      title: 'Login'
    },
    path: '/projection',
    name: 'Projection',
    component: () => import('@/views/ProjectionView.vue')
  },
  {
    meta: {
      title: 'Error'
    },
    path: '/error',
    name: 'error',
    component: () => import('@/views/ErrorView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { top: 0 }
  }
})

export default router
