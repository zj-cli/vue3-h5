const routes = [
  {
    path: '/',
    name: 'home',
    meta: {
      title: '首页'
    },
    component: () => import('@/views/Home.vue')
  },
  {
    path: '/404',
    name: '404',
    meta: {
      title: '404',
      auth: false
    },
    component: () => import('@/views/404.vue')
  },
  {
    path: '/example',
    name: 'example',
    meta: {
      title: '',
      auth: false
    },
    component: () => import('@/views/Example.vue')
  }
]

export default routes
