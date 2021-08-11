<template>
  <van-dialog
    v-model:show="modelValue"
    :title="title"
    :show-confirm-button="false"
    @open="bind.open"
  >
    <van-icon name="cross" @click="bind.cancel" />
    <div v-if="errorText" class="padding-top-30 font-26 text-center text-danger">
      {{ errorText }}
    </div>
    <!-- 密码输入框 -->
    <van-password-input
      class="margin-y-50"
      :value="password"
      :mask="hideMask"
      :focused="showKeyboard"
      @focus="showKeyboard = true"
    />
  </van-dialog>
  <!-- 数字键盘 -->
  <van-number-keyboard v-model="password" :show="showKeyboard" @blur="showKeyboard = false" />
</template>

<script>
import { computed, watch, ref, reactive } from 'vue'
export default {
  name: 'AgreementDialog',
  props: {
    modelValue: {
      type: Boolean,
      default: false
    },
    title: {
      // dialog标题
      type: String,
      default: '输入支付密码'
    },
    errorText: {
      // 错误消息提示
      type: String,
      default: ''
    },
    hideMask: {
      // 是否隐藏密码内容
      type: Boolean,
      default: true
    }
  },
  emits: ['update:modelValue', 'ok'],
  setup(props, { emit }) {
    const password = ref()
    const bind = reactive({
      open: () => open(),
      cancel: () => cancel()
    })
    // dialog显示时自动弹出键盘
    const showKeyboard = computed(() => props.modelValue)
    // 密码输入满6位时自动提交
    watch(password, val => {
      if (val.length === 6) {
        emit('update:modelValue', false)
        emit('ok', val.slice(0, 6))
      }
    })
    // 打开dialog时清空密码
    const open = () => (password.value = '')
    // 触发dialog隐藏
    const cancel = () => emit('update:modelValue', false)
    return {
      password,
      showKeyboard,
      bind
    }
  }
}
</script>
<style lang="less" scoped>
.van-icon-cross {
  position: absolute;
  top: 20px;
  right: 30px;
  font-size: 40px;
  color: #999;
}
.van-number-keyboard {
  z-index: 9999;
}
</style>
