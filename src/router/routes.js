import { defineAsyncComponent } from 'vue'

const routes = [
  {
    path: '/',
    name: 'home',
    redirect: '/example',
    meta: {
      title: '首页',
      showNavBar: false
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
      title: '功能',
      auth: false,
      showNavBar: true,
      showLeftArrow: false
    },
    component: () => import('@/views/example/Index.vue')
  },
  {
    path: '/navBar',
    name: 'navBar',
    meta: {
      title: '导航栏',
      auth: false,
      showNavBar: true
    },
    component: () => import('@/views/example/NavBar.vue')
  },
  {
    path: '/result',
    name: 'result',
    meta: {
      title: '结果展示',
      auth: false
    },
    component: () => import('@/views/example/Result.vue')
  },
  {
    path: '/upload',
    name: 'upload',
    meta: {
      title: '上传图片',
      auth: false
    },
    component: () => import('@/views/example/Upload.vue')
  },
  {
    path: '/back',
    name: 'back',
    meta: {
      title: '自定义返回',
      auth: false
    },
    component: () => import('@/views/example/Back.vue')
  },
  {
    path: '/wrapper',
    name: 'wrapper',
    meta: {
      title: '资源容器',
      auth: false
    },
    component: () => import('@/views/example/Wrapper.vue')
  }
]

export default routes
