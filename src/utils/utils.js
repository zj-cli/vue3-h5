/**
 * 公共业务逻辑方法
 * hejiang by 2020/10/21
 */
import base64 from '@/libs/base64'
import md5 from '@/libs/md5'

/**
 * base64加密
 * @param {str}要加密的字符串
 *  @returns 加密结果
 */
export const base64Enc = str => {
  return base64.base64encode(base64.utf16to8(str))
}

/**
 * base64解密
 * @param {str}要解密的编码
 * @returns 解密结果
 */
export const base64Dec = str => {
  return base64.utf8to16(base64.base64decode(str))
}

/**
 * md5
 * @param {str} 加密字段
 * @returns 加密结果
 */
export const md5Enc = str => {
  return md5(str)
}

/**
 * url转base64
 * @param {url}图片url
 * @returns 图片base64
 */
export const urlToBase64 = url => {
  return new Promise(async resolve => {
    const img = new Image()
    img.src = await getImageBlob(url)
    img.crossOrigin = 'anonymous'
    img.onload = () => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      canvas.width = img.width
      canvas.height = img.height
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
      const base64 = canvas.toDataURL('image/jpeg')
      resolve(base64)
    }
    img.onerror = resolve
  })
}

/**
 * 根据blob获取url
 * @param {*} 图片url
 * @returns blob url
 */
// 兼容ie10及以下image跨域问题 (需后台支持)
export const getImageBlob = url => {
  return new Promise(resolve => {
    var xhr = new XMLHttpRequest()
    xhr.open('get', url, true)
    xhr.responseType = 'blob'
    xhr.onload = function () {
      resolve(this.status === 200 && this.response && URL.createObjectURL(this.response))
      // let reader = new FileReader();
      // reader.readAsDataURL(this.response)
      // reader.onload = function (e) {
      // 	resolve(reader.result)
      // }
    }
    xhr.send()
  })
}

/**
 * file转base64
 * @param {file} 文件流
 * @returns base64
 */
export const fileToBase64 = file => {
  return new Promise(resolve => {
    const reader = new FileReader()
    reader.onload = e => {
      resolve(e.target.result)
    }
    reader.onerror = resolve
    reader.readAsDataURL(file)
  })
}

/**
 * 格式化尺寸单位
 * @param {*} url
 */
export const formatPx = val => {
  return val + (Number(val) ? 'px' : '')
}

/**
 * 跳转首页
 */
export const jumpHome = () => {
  const loc = window.location
  window.location.href = loc.origin + loc.pathname + loc.search
}

/**
 * url参数解析
 * @param {url} 地址
 */
export const ParseUrlParams = function (url = window.location.search) {
  this.url = url.substr(1)
}

/**
 * 获取url参数值
 * @param {key} 参数键名
 * @returns 参数值
 */
ParseUrlParams.prototype.get = function (key) {
  const reg = new RegExp('(^|&)' + key + '=([^&]*)(&|$)')
  const r = this.url.match(reg)
  return r ? r[2] : ''
}

/**
 * 获取url参数值
 * @param {key} 参数键名
 * @param {val} 替换的参数值
 * @returns url
 */
ParseUrlParams.prototype.replace = function (key, val) {
  const reg = new RegExp('(^|&)' + key + '=([^&]*)(&|$)')
  return this.url.replace(reg, `$1${key}=${val}$3`)
}

/**
 * 将对象转为键值对格式
 * @param obj
 * @returns 键值对
 */
export const objToPair = obj => {
  if (!(obj instanceof Object)) return ''
  return Object.keys(obj)
    .map(key => `${key}=${obj[key]}`)
    .join('&')
}

/**
 * 获取当前系统类型
 * @returns 系统类型
 */
export const getSysType = () => {
  var _sys = null
  var u = navigator.userAgent
  if (u.indexOf('Android') > -1 || u.indexOf('Adr') > -1) {
    _sys = 'ANDROID'
  } else if (u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
    _sys = 'IOS'
  } else {
    _sys = 'OTHER'
  }
  return _sys
}

/**
 * 深克隆
 * @param {*} target 目标对象
 * @returns 深克隆对象
 */
export const deepClone = target => {
  let result
  if (typeof target === 'object') {
    if (Array.isArray(target)) {
      result = []
      for (let i in target) {
        // 递归克隆数组中的每一项
        result.push(deepClone(target[i]))
      }
      // 判断如果当前的值是null的话；直接赋值为null
    } else if (target === null) {
      result = null
      // 判断如果当前的值是一个RegExp对象的话，直接赋值
    } else if (target.constructor === RegExp) {
      result = target
    } else {
      // 否则是普通对象，直接for in循环，递归赋值对象的所有值
      result = {}
      for (let i in target) {
        result[i] = deepClone(target[i])
      }
    }
    // 如果不是对象的话，就是基本数据类型，那么直接赋值
  } else {
    result = target
  }
  // 返回最终结果
  return result
}

/**
 * 格式化空字符
 * @param {*} target 目标
 * @returns 格式化结果
 */
export const formatEmpty = (target, format) => {
  if (!target || target === 'null' || target === 'undefined') {
    return format === undefined ? '--' : format
  }
  return target
}

/**
 * 格式化数字
 * @param {*} target 目标数字
 * @param {*} length 最多保留小数位数
 * @returns 格式化后的数字
 */
export const formatNumber = (target, length = 2) => {
  if (!target || target === 'null' || target === 'undefined') {
    return '0.00'
  }
  if (!Number(target)) return target
  return Number(target).toFixed(length) + ''
}

/**
 * 限制小数位数的小数
 * @param {*} target 目标数字
 * @param {*} length 最多保留小数位数
 * @returns 格式化后的数字
 */
export const onlyNumber = (target, length = 2) => {
  let value = target.replace(/[^(\d|.)]/g, '') // 只能存在数字和点
  value = value.replace(/(\.)/, '$1#').replace(/\./g, '').replace('#', '.') // 只能存在一个.
  value = value.replace(new RegExp('(\\.\\d{' + length + '})\\d*', 'g'), '$1') // 只能存在decLength位小数
  value = value.replace(/^0(\d)/, '$1') // 整数部分第一位不能为0
  value = value.replace(/^(\.)/, '0$1') // 自动给小数加上0
  return value
}

/**
 * 分隔数字
 * @param {*} target 目标数字
 * @param {*} type （once表示只分隔一次）是否持续分隔
 * @param {*} length 分隔位数
 * @param {*} separator 分隔符
 * @returns 格式化后的数字
 */
export const splitNumber = (target, type, length = 4, separator = ' ') => {
  const _length = type === 'once' ? length : length + 1
  return String(target).replace(new RegExp('\\d{' + _length + '}', 'g'), value => {
    return value.slice(0, length) + separator + value.slice(length)
  })
}

export const delSpace = (target, type = 'all') => {
  return type === 'all' ? target.replace(/\s/g, '') : target.replace(/^\s|\s$/g, '')
}

/***
 * 格式化日期
 * @param {secs} 要格式化的日期
 * @return 格式化后的日期
 */
export const formatDate = (secs, type = 'YYYY-MM-DD hh:mm:ss') => {
  var t = new Date(secs)
  var year = t.getFullYear()
  var month = t.getMonth() + 1
  if (month < 10) {
    month = '0' + month
  }
  var date = t.getDate()
  if (date < 10) {
    date = '0' + date
  }
  var hour = t.getHours()
  if (hour < 10) {
    hour = '0' + hour
  }
  var minute = t.getMinutes()
  if (minute < 10) {
    minute = '0' + minute
  }
  var second = t.getSeconds()
  if (second < 10) {
    second = '0' + second
  }
  // return year + '年' + month + '月'
  if (type === 'YYYY-MM-DD hh:mm:ss') {
    return `${year}-${month}-${date} ${hour}:${minute}:${second}`
  } else if (type === 'YYYY-MM-DD') {
    return `${year}-${month}-${date}`
  } else if (type === 'YYYY-MM') {
    return `${year}-${month}`
  } else if (type === 'YYYY年MM月') {
    return year + '年' + month + '月'
  }
}

/***
 * 设置全局title
 * @param {t} 标题
 */
export const setTitle = t => {
  document.title = t
  let i = document.createElement('iframe')
  i.onload = function () {
    setTimeout(function () {
      i.remove()
    }, 10)
  }
  document.body.appendChild(i)
}
