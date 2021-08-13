import '@/libs/bridge'

//原生app h5跳转h5
export function appH5JumpH5(pageUrl, callback) {
  window.h5_native.execNative(
    'startNativePage',
    {
      code: '998',
      url: pageUrl,
      args: { pageUrl, URL: pageUrl }
    },
    callback
  )
}

//原生app内部 h5跳转原生页面
export function appH5JumpNative(data) {
  let { code, args } = data
  window.h5_native.execNative('startNativePage', {
    code: code,
    args: args
  })
}

//原生app内部 h5跳转用户中心sdk H5
export function appH5JumpUcH5(data, callback) {
  let {
    args: { pageNum }
  } = data
  window.h5_native.execNative(
    'startNativePage',
    {
      code: '906',
      args: { pageNum }
    },
    callback
  )
}

// 吊起原生app视频播放器
export function appNativePlayVideo(vurl, vid, callBack) {
  window.h5_native.execNative(
    'startNativePage',
    { code: '119', args: { videoId: vid, videoUrl: vurl } },
    callBack
  )
}

// 关闭webview窗口
export function closeWindow() {
  if (!window.daka) return
  __exec__({
    a: {
      action: 'closeCurrentActivity'
    },
    i: {
      action: 'operation:quitWebView'
    }
  })
}

// 原生方法
function __exec__(_, __) {
  var _type = isAndroidOrIos()
  if (typeof _ === 'object') {
    if (_type == 0 && window.daka && window.daka.exec && _['a']) {
      window.daka.exec(_['a'].action, _['a'].args ? _['a'].args : [])
    } else if (_type == 1 && _['i']) {
      if (_['i'].args) {
        console.log('native:' + _['i'].action + ':' + _['i'].args)
        window.location = 'native:' + _['i'].action + ':' + _['i'].args
      } else {
        console.log('native:' + _['i'].action)
        window.location = 'native:' + _['i'].action
      }
    } else {
      console.log(JSON.stringify(_))
    }
  } else {
    if (_type == 0 && window.daka && window.daka.exec) {
      window.daka.exec(_, __)
    } else if (_type == 1) {
      window.location = 'native:exec:' + _ + ':' + __.join(':')
    } else {
      console.log(_, __)
    }
  }
}

// 判断设备类型
export const isAndroidOrIos = () => {
  var u = navigator.userAgent
  if (u.indexOf('Android') > -1 || u.indexOf('Adr') > -1) {
    return 0
  } else if (!!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
    return 1
  } else {
    return -1
  }
}
