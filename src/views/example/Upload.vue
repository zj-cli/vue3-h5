<template>
  <base-upload
    ref="upload"
    :model-value="state.idcardImg"
    class="margin-20"
    @upload="bind.upload"
  ></base-upload>
</template>

<script>
import { ref, reactive } from 'vue'
import { BaseUpload } from '@/components/base'
export default {
  name: 'Upload',
  components: {
    BaseUpload
  },
  setup() {
    const upload = ref()
    const state = reactive({
      idcardImg: ''
    })

    const bind = reactive({
      // 上传图片
      upload: data => {
        if (!data) return
        setTimeout(() => {
          upload.value.complete({ status: 'success' })
        }, 2000)
      }
    })
    return {
      upload,
      state,
      bind
    }
  }
}
</script>
<style lang="less" scoped></style>
