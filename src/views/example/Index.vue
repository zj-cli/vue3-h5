<template>
  <div class="flex-column align-center justify-center" style="overflow: auto">
    <div class="text-center">
      <van-image :src="state.codeUrl" width="150"></van-image>
      <div class="font-24 padding-10 text-grey">
        手机扫一扫，获取更好体验 <br />（保证手机连接同一网络，且不要用localhost访问）
      </div>
    </div>
    <br />
    <van-button type="primary" @click="bind.openWebview"> 打开webview </van-button>
    <br />
    <van-button type="primary" to="/navBar">导航栏</van-button>
    <br />
    <van-button type="primary" to="/result">结果展示</van-button>
    <br />
    <van-button type="primary" to="/upload">上传图片</van-button>
    <br />
    <van-button type="primary" to="/wrapper">资源容器</van-button>
    <br />
    <van-button type="primary" to="/back">自定义返回</van-button>
    <br />
    <van-button type="primary" @click="bind.openPassDialog">输入密码</van-button>
    <br />
  </div>
  <!-- 密码dialog -->
  <password-dialog
    v-model="state.showPasswordDialog"
    :error-text="state.passwordErrorText"
    @ok="bind.submitPassword"
  ></password-dialog>
</template>

<script>
import { appH5JumpH5 } from '@/utils/jump'
import { Toast } from 'vant'
import { PasswordDialog } from '@/components/dialog'
import { reactive } from '@vue/reactivity'
import QRCode from 'qrcode'
export default {
  name: 'Home',
  components: {
    PasswordDialog
  },
  setup() {
    const state = reactive({
      showPasswordDialog: false,
      passwordErrorText: '',
      codeUrl: '',
      submitCount: 0
    })

    const bind = {
      // 打开新的webview
      openWebview: () => openWebview(),
      // 显示密码dialog
      openPassDialog: () => (state.showPasswordDialog = true),
      // 提交密码
      submitPassword: () => {
        ++state.submitCount
        Toast.loading({ message: '密码验证中...' })
        setTimeout(() => {
          if (state.submitCount < 3) {
            state.showPasswordDialog = true
            state.passwordErrorText = '密码输入错误，请重新输入'
            return
          }
          state.submitCount = 0
          state.passwordErrorText = ''
          Toast('密码错误次数过多，请稍后再试')
        }, 2000)
      }
    }

    // 获取当前页面二维码
    QRCode.toDataURL(window.location.href, { margin: 2 }).then(url => {
      state.codeUrl = url
    })

    // 打开新的webview
    const openWebview = () => {
      if (!window.daka) {
        Toast('请用大卡APP访问')
        return
      }
      appH5JumpH5(window.location.href)
    }

    // 监听webview显示
    window.lifeCycle.init({
      onShow: () => {
        Toast('回到当前webview')
      }
    })

    return {
      state,
      bind
    }
  }
}
</script>
<style lang="less" scoped>
.van-button {
  width: 300px;
}
</style>
