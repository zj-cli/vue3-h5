<template>
  <!-- 容器 -->
  <wrapper
    v-if="type === 'wrapper'"
    :is-tip="state.isTip"
    :tip-text="state.tipText"
    :tip-type="state.tipType"
    @confirm="bind.errConfirm"
  ></wrapper>
  <!-- 结果页 -->
  <base-result
    v-else-if="type === 'result'"
    image="ok"
    title="支付成功"
    description="稍后去订单页面查看支付信息"
    @confirm="bind.confirm"
  ></base-result>
  <!-- 上传图片 -->
  <base-upload
    v-else-if="type === 'upload'"
    ref="upload"
    :model-value="state.idcardImg"
    class="margin-20"
    @upload="bind.upload"
  ></base-upload>
</template>

<script>
import { ref, reactive } from 'vue'
import { Wrapper } from '@/components/wrapper'
import { BaseResult, BaseUpload } from '@/components/base'
import { useRoute, useRouter } from 'vue-router'
import { setTitle } from '@/utils/utils'
export default {
  name: '',
  components: {
    Wrapper,
    BaseResult,
    BaseUpload
  },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const type = route.query.type || ''
    // 页面title枚举
    const enums = {
      wrapper: { name: '加载容器' },
      upload: { name: '图片上传' },
      result: { name: '结果页' }
    }

    const upload = ref()

    const state = reactive({
      isTip: true,
      tipType: 'default',
      tipText: '加载中...',
      idcardImg: ''
    })

    if (type === 'wrapper') {
      setTimeout(() => {
        state.isTip = true
        state.tipType = 'error'
        state.tipText = '数据加载失败'
      }, 1500)
    }

    const bind = reactive({
      // 回到首页
      confirm: () => {
        router.push('/')
      },
      // 重新加载
      errConfirm: () => {
        router.go(0)
      },
      // 上传图片
      upload: data => {
        if (!data) return
        setTimeout(() => {
          upload.value.complete({ status: 'success' })
        }, 2000)
      }
    })

    // 设置页面title
    setTitle(enums[type].name)

    return {
      type,
      state,
      bind,
      upload
    }
  }
}
</script>
<style lang="less" scoped></style>
