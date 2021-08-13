import { watch, provide, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import config from '@/utils/config'
import { Toast } from 'vant'
export default function useNavBar() {
  const route = useRoute()
  const router = useRouter()

  // navbar参数
  const navBar = reactive({
    show: false,
    title: '',
    leftText: '',
    rightText: '',
    showLeftArrow: true,
    onClickLeft: () => router.go(-1),
    onClickRight: () => {}
  })

  // 是否隐藏navBar
  const isHideNavBar = () => {
    return config.hideNavBarInApp && config.inApp
  }

  // 获取当前页面navbar参数
  watch(route, val => {
    if (isHideNavBar()) return
    const meta = val.meta
    navBar.title = meta.title
    navBar.leftText = meta.navBarLeftText
    navBar.rightText = meta.navBarLeftRight
    navBar.show = typeof meta.showNavBar === 'boolean' ? meta.showNavBar : config.showNavBar
    navBar.showLeftArrow = typeof meta.showLeftArrow === 'boolean' ? meta.showLeftArrow : true
  })

  // 注入navBar
  provide('getNavBar', navBar)
  // 动态设置navbar
  provide('setNavBar', data => {
    if (isHideNavBar()) {
      Toast('已设置APP内不显示自定义navBar，如需显示请前去config.js内修改')
      return
    }
    if (!data) {
      console.log('data must a objcet')
      return
    }
    data.show !== undefined && (navBar.show = data.show)
    data.title !== undefined && (navBar.title = data.title)
    data.leftText !== undefined && (navBar.leftText = data.leftText)
    data.rightText !== undefined && (navBar.rightText = data.rightText)
    navBar.showLeftArrow = typeof data.showLeftArrow === 'boolean' ? data.showLeftArrow : true
    typeof data.onClickLeft === 'function' && (navBar.onClickLeft = data.onClickLeft)
    typeof data.onClickRight === 'function' && (navBar.onClickRight = data.onClickRight)
  })

  return navBar
}
