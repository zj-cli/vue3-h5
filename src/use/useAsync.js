import { onMounted, reactive } from 'vue'

// wrapper异步回调方案
export default function useAsync(func, _tip = {}) {
  const defaultTip = {
    isTip: true,
    tipType: 'default',
    tipText: '加载中...'
  }
  const tip = reactive(Object.assign({}, defaultTip, _tip))

  onMounted(async () => {
    try {
      const { result, msg } = await func()
      if (result) {
        tip.isTip = false
        return
      }
      errorTip(msg)
    } catch (err) {
      errorTip(err)
    }
  })

  // 错误处理
  function errorTip(msg) {
    tip.isTip = true
    tip.tipType = 'error'
    tip.tipText = msg || '数据加载失败'
  }

  return tip
}
