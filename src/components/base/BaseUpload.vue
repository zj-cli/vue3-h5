<template>
  <div class="upload-wrapper" :style="{ width: width + 'px', height: height + 'px' }">
    <van-image v-if="modelValue" :src="modelValue" alt="img" class="img" />
    <van-image v-else :src="phImg" alt="img" class="img" />
    <div
      :class="[
        'complete-box',
        ['uploading', 'success'].includes(bind.uploadStatus)
          ? 'show-mask'
          : bind.uploadStatus === 'uploading'
          ? 'disabled-upload'
          : ''
      ]"
    >
      <!-- 等待上传/上传失败 -->
      <div v-if="['pending', 'error'].includes(bind.uploadStatus)" class="pengding-tip">
        <slot name="description">
          <img :src="cameraIcon" alt="camera-icon" class="camera-icon" />
          <div>{{ description }}</div>
        </slot>
      </div>
      <!-- 上传中 -->
      <div v-else-if="bind.uploadStatus === 'uploading'" class="uploading-tip">
        <van-circle
          v-model:current-rate="bind.currentRate"
          :rate="bind.uploadRate"
          layer-color="#fff"
          color="#388FF1"
          size="41px"
          :speed="10"
          :text="uploadRateText"
        />
        <div class="padding-left-10">
          上传中
          <span class="my-loading"></span>
        </div>
      </div>
      <!-- 上传成功 -->
      <div v-else-if="bind.uploadStatus === 'success'" class="success-tip">
        <van-icon name="passed" />
        <div>上传成功</div>
      </div>
    </div>
    <!-- 禁止上传mask -->
    <div v-if="disabled" class="over-limit-mask" @click="handleDisabled"></div>
    <!-- h5上传 -->
    <input
      v-else
      ref="input"
      type="file"
      class="upload-input"
      :accept="accept"
      @change="bind.beforeUpload"
    />
    <slot />
  </div>
</template>
<script>
import { onActivated, reactive, ref, toRefs, computed } from 'vue'
import { Toast } from 'vant'
import { fileToBase64 } from '@/utils/utils'
import idcardFrontPreview from '@/assets/images/upload/idcard-front-preview.png'
import cameraIcon from '@/assets/images/upload/camera-icon.png'
import Compressor from 'compressorjs'
export default {
  name: 'BaseUpload',
  props: {
    modelValue: {
      // 图片地址
      type: String,
      default: ''
    },
    phImg: {
      // 占位图
      type: String,
      default: idcardFrontPreview
    },
    disabled: {
      // 是否禁用上传
      type: Boolean,
      default: false
    },
    accept: {
      // 可接受类型
      type: String,
      default: 'image/png,image/jpg,image/jpeg,image/webp'
    },
    maxSize: {
      // 最大尺寸
      type: [String, Number],
      default: 8 * 1024 * 1024
    },
    compSize: {
      // 尺寸压缩界限
      type: [String, Number],
      default: 1 * 1024 * 1024
    },
    width: {
      type: [Number, String],
      default: '100%'
    },
    height: {
      type: [Number, String],
      default: '220'
    },
    // 上传内容描述
    description: {
      type: String,
      default: '上传图片'
    },
    handleDisabled: {
      type: Function,
      default: null
    }
  },
  emits: ['upload', 'update:modelValue'],
  setup(props, { emit }) {
    let beforeUpload = null
    let { modelValue } = toRefs(props)
    let input = ref(null) // 上传 el
    let bind = reactive({
      uploadStatus: 'pending', // 上传状态
      uploadRate: 0, // 最终上传进度
      currentRate: 0, // 当前上传进度
      beforeUpload: e => beforeUpload(e) // 上传前逻辑
    })

    let uploadRateText = computed(() => bind.currentRate.toFixed(0) + '%') //显示的上传进度内容
    modelValue.value && (bind.uploadStatus = 'success')

    // 上传前置处理
    beforeUpload = e => {
      emit('update:modelValue')
      bind.currentRate = 0
      const files = e.target.files || e.dataTransfer.files
      const file = files[0]
      if (!file) return
      bind.uploadStatus = 'pending'
      if (file.size > props.maxSize) {
        Toast(`图片大小不能超过${props.maxSize / 1024 / 1024}M！`)
        return
      }
      if (!file.type) {
        Toast('未获取到文件类型')
        return
      }
      if (props.accept.indexOf(file.type) === -1) {
        Toast(`只能上传 ${props.accept.replace(/image\//g, '')} 格式图片！`)
        return
      }
      bind.uploadStatus = 'uploading'
      // 压缩尺寸范围类，直接上传
      if (props.compSize >= file.size) {
        upload({ file, name: file.name })
        return
      }
      // 超过尺寸，进行压缩
      const loading = Toast.loading({ message: '压缩中...', duration: 0 })
      new Compressor(file, {
        quality: 0.6,
        maxWidth: 1080,
        maxHeight: 780,
        success: result => {
          loading.clear()
          upload({ file: result, name: file.name })
        },
        error() {
          loading.clear()
          bind.uploadStatus = 'pending'
          Toast.error('图片获取失败')
        }
      })
    }

    // 触发上传
    const upload = async params => {
      const loading = Toast.loading({ message: '处理中...', duration: 0 })
      const url = await fileToBase64(params.file)
      loading.clear()
      if (!url) {
        bind.uploadStatus = 'pending'
        Toast.error('图片获取失败')
        return
      }
      bind.uploadRate = +(Math.random() * 20 + 75).toFixed(0)
      // bind.uploadStatus = "uploading";
      emit('update:modelValue', url)
      emit('upload', { url, name: params.name })
    }

    // 上传结果
    const complete = data => {
      bind.uploadRate =
        data.status === 'success'
          ? 100
          : data.status === 'uploading'
          ? +(Math.random() * 20 + 75).toFixed(0)
          : 0
      bind.uploadStatus = data.status
      input && (input.value.value = '')
    }

    onActivated(() => modelValue.value && (bind.uploadStatus = 'success'))

    return {
      input,
      bind,
      cameraIcon,
      uploadRateText,
      complete
    }
  }
}
</script>
<style scoped lang="less">
.upload-wrapper {
  position: relative;
  overflow: hidden;
  border-radius: 4px;
  .img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .app-box,
  .over-limit-mask,
  .upload-input {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 2;
    opacity: 0;
  }
  .camera-icon {
    width: 80px;
    height: 68px;
  }
  .complete-box {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    color: #fff;
    z-index: 1;
    border-radius: 4px;
    &.show-mask {
      background: rgba(0, 0, 0, 0.4);
    }
    &.disabled-upload {
      z-index: 3;
    }
    &.error-box {
      border: 3px solid red;
      color: red;
    }
    .pengding-tip,
    .uploading-tip,
    .error-tip,
    .success-tip {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 100%;
      font-size: 26px;
      line-height: 40px;
      transform: translate(-50%, -50%);
      text-align: center;
    }
    .uploading-tip,
    .success-tip {
      color: #fff;
    }
    /deep/ .van-circle__text {
      font-size: 26px;
      color: #fff;
    }
    .van-icon {
      font-size: 36px;
    }
    .bottom-box-tip {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 30px;
      line-height: 30px;
      color: #fff;
      text-align: center;
      background: rgba(0, 0, 0, 0.6);
    }
  }
}
</style>
