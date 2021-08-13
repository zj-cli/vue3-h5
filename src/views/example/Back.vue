<template>
  <div class="flex-column align-center justify-center" style="height: 100%">
    <van-button type="primary" @click="bind.back">返回</van-button>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
import { Dialog } from 'vant'
import pageBack from '@/use/pageBack'
export default {
  name: 'Back',
  setup() {
    const router = useRouter()
    const bind = {
      back: () => back()
    }

    const { back } = pageBack(push => {
      Dialog.confirm({ message: '确定要退出当前页面吗？' })
        .then(() => {
          router.push('/')
        })
        .catch(() => push())
    })

    return {
      bind
    }
  }
}
</script>
<style lang="less" scoped></style>
