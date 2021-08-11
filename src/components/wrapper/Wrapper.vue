<template>
  <div class="wrapper" :style="{ background: isTip ? '#fff' : '' }">
    <van-empty v-if="isTip" :image="tipType" :description="tipText" class="padding-top-100">
      <slot name="btn">
        <van-button v-if="tipType === 'error'" round type="primary" @click="$router.go(0)">
          重新加载
        </van-button>
      </slot>
    </van-empty>
    <slot v-else />
    <div v-if="bottomLine" class="bottom-line">我们是有底线的</div>
  </div>
</template>
<script>
export default {
  name: 'Wrapper',
  props: {
    isTip: {
      type: Boolean,
      default: false
    },
    tipType: {
      type: String,
      default: 'default'
    },
    tipText: {
      type: String,
      default: '努力加载中...'
    },
    bottomLine: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    return {}
  }
}
</script>
<style lang="less" scoped>
.van-button {
  padding: 0 50px;
  margin-top: 10px;
}
</style>
