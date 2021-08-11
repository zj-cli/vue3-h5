<template>
  <div class="wrapper text-center">
    <van-image :src="url"></van-image>
    <div class="title">{{ title }}</div>
    <div class="description" v-html="description"></div>
    <van-button class="shade-btn" round block size="large" @click="confirm">
      {{ btnText }}
    </van-button>
    <slot />
  </div>
</template>

<script>
import { ref, toRefs } from 'vue'
import okIcon from '@/assets/images/icons/ok-icon.png'
import failIcon from '@/assets/images/icons/fail-icon.png'
import warnIcon from '@/assets/images/icons/warning-icon.png'
export default {
  name: 'BaseResult',
  props: {
    image: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      default: ''
    },
    showBtn: {
      type: Boolean,
      default: true
    },
    btnText: {
      type: String,
      default: '完成'
    }
  },
  emits: ['confirm'],
  setup(props, { emit }) {
    let url = ref()
    const { image } = toRefs(props)
    url = image === 'fail' ? failIcon : image == 'warn' ? warnIcon : okIcon

    const confirm = () => {
      emit('confirm')
    }

    return {
      url,
      confirm
    }
  }
}
</script>
<style lang="less" scoped>
.van-image {
  width: 120px;
  margin-top: 130px;
}
.title {
  font-size: 42px;
  margin: 61px 0 50px;
}
.description {
  font-size: 30px;
  line-height: 48px;
}
.shade-btn {
  margin-top: 320px;
}
</style>
