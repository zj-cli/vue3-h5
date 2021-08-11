import { createRouter, createWebHashHistory } from 'vue-router'
import routes from './routes'
import { setTitle } from '@/utils/utils'

const router = new createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  setTitle(to.meta.title || '首页')
  if (to.meta.auth === false) {
    next()
    return
  }
  // if (!token) {
  //   next('/404')
  //   Toast('缺少参数')
  //   return
  // }
  next()
})

export default router
