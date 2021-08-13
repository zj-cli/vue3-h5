<template>
  <wrapper
    :is-tip="tip.isTip"
    :tip-text="tip.tipText"
    :tip-type="tip.tipType"
    @confirm="bind.errConfirm"
  >
    数据加载成功
  </wrapper>
</template>

<script>
import { reactive } from 'vue'
import { Wrapper } from '@/components/wrapper'
import { useRouter } from 'vue-router'
import useAsync from '@/use/useAsync'
export default {
  name: 'ExWrapper',
  components: {
    Wrapper
  },
  setup() {
    const router = useRouter()

    // 模拟获取数据
    const tip = useAsync(() => {
      return new Promise((resolve, reject) => {
        const isOk = bind.getRandom()
        const isSucc = bind.getRandom()
        setTimeout(() => {
          isOk ? resolve({ result: isSucc ? 1 : 0, msg: !isSucc && '加载失败' }) : reject()
        }, 2000)
      })
    })

    const bind = reactive({
      getRandom: () => Math.random() >= 0.5,
      errConfirm: () => {
        router.go(0)
      }
    })

    return {
      tip,
      bind
    }
  }
}
</script>
<style lang="less" scoped></style>
