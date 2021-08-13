<template>
  <base-result
    image="ok"
    title="支付成功"
    description="稍后去订单页面查看支付信息"
    @confirm="bind.confirm"
  ></base-result>
</template>

<script>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { BaseResult } from '@/components/base'

export default {
  name: 'Result',
  components: {
    BaseResult
  },
  setup() {
    const router = useRouter()
    const bind = reactive({
      // 回到首页
      confirm: () => {
        router.push('/')
      }
    })

    return {
      bind
    }
  }
}
</script>
<style lang="less" scoped></style>
