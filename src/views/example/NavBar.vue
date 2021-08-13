<template>
  <div class="flex-column align-center justify-center" style="height: 100%">
    <van-button type="primary" @click="bind.changeShowBar">
      {{ navBar.show ? '隐藏' : '显示' }}导航栏
    </van-button>
    <br />
    <van-button type="primary" :disabled="!navBar.show" @click="bind.changeBarTitle">
      改变导航栏标题
    </van-button>
    <br />
    <van-button type="primary" :disabled="!navBar.show" @click="bind.changeBarLeftText">
      显示左侧按钮
    </van-button>
    <br />
    <van-button type="primary" :disabled="!navBar.show" @click="bind.changeBarRightText">
      显示右侧按钮
    </van-button>
  </div>
</template>

<script>
import { inject, watch } from 'vue'
import { Toast } from 'vant'
import { useRouter } from 'vue-router'
export default {
  name: '',
  setup() {
    const router = useRouter()
    const navBar = inject('getNavBar')
    const setNavBar = inject('setNavBar')

    const bind = {
      changeShowBar: () => setNavBar({ show: !navBar.show }),
      changeBarTitle: () => setNavBar({ title: '标题' + Math.random().toFixed(2) }),
      changeBarLeftText: () =>
        setNavBar({
          leftText: '返回',
          showLeftArrow: false,
          onClickLeft: () => router.go(-1)
        }),
      changeBarRightText: () =>
        setNavBar({
          rightText: '分享',
          onClickRight: () => Toast('分享成功！')
        })
    }
    return {
      navBar,
      bind
    }
  }
}
</script>
<style lang="less" scoped></style>
