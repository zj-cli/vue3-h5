// 输入控件过滤指令
export default app => {
  app.directive('limit', {
    mounted: function (el, binding) {
      let type = binding.arg
      let bindValue = binding.value || 2
      el.input = ['INPUT', 'TEXTAREA'].includes(el.tagName)
        ? el
        : el.querySelector('input') || el.querySelector('textarea')
      if (!el.input) return
      el.handleKeyup = function (e) {
        let val = e.target.value
        switch (type) {
          case 'nonspace':
            val = val.replace(/\s/g, '')
            break
          case 'number':
            val = val.replace(/\D/g, '')
            break
          case 'max':
            val = val.replace(/\D/g, '')
            val = val > bindValue ? bindValue : val
            break
          case 'sNumber':
            val = val.replace(/[^(\d|\-)]/g, '') // 只能输入数字和-
            break
          case 'decNumber':
            val = val.replace(/[^(\d|.)]/g, '') // 只能输入数字和点
            val = val.replace(/(\.)/, '$1#').replace(/\./g, '').replace('#', '.') // 只能输入一个.
            val = val.replace(new RegExp('(\\.\\d{' + bindValue + '})\\d*', 'g'), '$1') // 只能输入decLength位小数
            val = val.replace(/^0(\d)/, '$1') // 整数部分第一位不能为0
            val = val.replace(/^(\.)/, '0$1') // 自动给小数加上0
            break
          default:
        }
        if (val === e.target.value) return
        e.target.value = val
        if (e.target.composing) {
          e.target.dispatchEvent(new Event('compositionend'))
        } else {
          e.target.dispatchEvent(new Event('input'))
        }
      }
      el.input.addEventListener('keyup', el.handleKeyup)
    },
    unmounted: function (el) {
      el.input.removeEventListener('keyup', el.handleKeyup)
    }
  })

  // 隐藏自带键盘，并自定义光标
  app.directive('hideKeyboard', {
    mounted: function (el) {
      el.input = ['INPUT', 'TEXTAREA'].includes(el.tagName)
        ? el
        : el.querySelector('input') || el.querySelector('textarea')
      if (!el.input) return
      // js设置脚本值，需重写__defineSetter__方法监听input值得改变
      el.input.__defineSetter__('value', function (v) {
        this.setAttribute('value', v) //注意这里，要使用setAttribute来设置value值，不能this.value=v，要不会死循环。如果注释掉这句，无法修改input的value值
        el.handleSetPosition.call(el.input)
      })
      // 获得焦点时隐藏原生键盘并设置光标
      el.handleHideKeyboard = function () {
        window.requestAnimationFrame(() => {
          // document.activeElement.blur();
          const inputs = document.querySelectorAll('input')
          ;[...inputs].map(ipt => {
            const cursor = ipt.parentNode.querySelector('.input-cursor')
            if (!cursor) return
            ipt.parentNode.removeChild(cursor)
          })
          setCursorPosition(el.input)
          el.input.setAttribute('readonly', true)
        })
      }
      // 失去焦点时并去掉光标
      el.handleHideCursor = function () {
        const cursor = el.input.parentNode.querySelector('.input-cursor')
        if (!cursor) return
        el.input.parentNode.removeChild(cursor)
      }
      // input值改变时设置光标位置
      el.handleSetPosition = function () {
        const cursor = el.input.parentNode.querySelector('.input-cursor')
        if (!cursor) return
        setCursorPosition(el.input, cursor)
      }
      el.input.addEventListener('focus', el.handleHideKeyboard)
      el.input.addEventListener('blur', el.handleHideCursor)
    },
    unmounted: function (el) {
      el.input.removeEventListener('focus', el.handleHideCursor)
      el.input.removeEventListener('blur', el.handleHideCursor)
    }
  })
}

// 设置光标位置
function setCursorPosition(input, cursor) {
  // 没有光标则创建
  if (!cursor) {
    cursor = document.createElement('span')
    cursor.className = 'input-cursor'
    input.parentNode.append(cursor)
  }
  window.requestAnimationFrame(() => {
    let span = document.createElement('span')
    let val = input.getAttribute('value')
    span.innerHTML = val
    span.style.display = 'inline-block'
    span.style.fontFamily = getComputedStyle(input).fontFamily
    span.style.fontSize = getComputedStyle(input).fontSize
    document.body.append(span)
    let w = span.offsetWidth
    cursor.style.transform = 'translateX(' + w + 'px)'
    document.body.removeChild(span)
  })
}
