import { onActivated, onBeforeUnmount, onDeactivated } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { closeWindow } from '@/utils/jump'
import { ParseUrlParams } from '@/utils/utils'

// 自定义页面返回方法
export default function pageBack(cb) {
  let flag = false
  const route = useRoute()
  const router = useRouter()
  const parseUrlParams = new ParseUrlParams()

  // 自定义返回逻辑
  const back = e => {
    if (flag) return
    flag = true

    // 将外部调用back方法传参赋给cb
    e && e.type !== 'popstate' && (cb = e)

    // 有回调函数执行回调函数
    if (cb instanceof Function) {
      cb(handlePushState)
      flag = false
      return
    }

    // 如果回调函数是字符串，表示为需要跳转的路由名称
    if (typeof cb === 'string') {
      router.push({ name: cb })
      return
    }

    // 如果回调参数是对象，且有重定向参数，则直接跳转到回调参数
    const redirectUrl =
      (cb instanceof Object && cb.redirectUrl) ||
      route.query.redirectUrl ||
      parseUrlParams.get('redirectUrl')

    if (redirectUrl && +redirectUrl !== -1) {
      window.location.href = decodeURIComponent(redirectUrl)
      return
    }

    // 在大卡环境中的话，则直接关闭当前webview
    if (window.daka) {
      closeWindow()
      return
    }

    router.go(-1)
  }

  // push当前url入栈
  const handlePushState = () => {
    window.history.pushState(null, null, document.URL)
  }

  // history监听事件
  const handlePopstate = () => {
    handlePushState()
    if (window.history && window.history.pushState) {
      window.addEventListener('popstate', back, false)
    }
  }

  // 非keepAlive页面初始化监听
  if (!route.meta.keepAlive) {
    console.log('create')
    handlePopstate()
  }

  // keepAlive页面初始化监听
  onActivated(() => {
    console.log('onActivated')
    route.meta.keepAlive && handlePopstate()
  })

  onDeactivated(() => {
    console.log('onDeactivated')
    window.removeEventListener('popstate', back, false)
  })

  onBeforeUnmount(() => {
    console.log('onBeforeUnmount')
    window.removeEventListener('popstate', back, false)
  })

  return {
    back
  }
}
