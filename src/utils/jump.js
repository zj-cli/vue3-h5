/* eslint-disable prettier/prettier */

import '@/libs/bridge';
//原生app h5跳转h5
export function appH5JumpH5(pageUrl, callback) {
  window.h5_native.execNative('startNativePage', {
    code: '998',
    url: pageUrl,
    args: { pageUrl, URL: pageUrl }
  }, callback);
}

//原生app内部 h5跳转原生页面
export function appH5JumpNative(data) {
  let { code, args } = data;
  window.h5_native.execNative('startNativePage', {
    'code': code,
    'args': args
  });
}

//原生app内部 h5跳转用户中心sdk H5
export function appH5JumpUcH5(data, callback) {
  let { args: { pageNum } } = data;
  window.h5_native.execNative('startNativePage', {
    'code': '906',
    'args': { pageNum }
  }, callback);
}

// 吊起原生app视频播放器
export function appNativePlayVideo(vurl, vid) {
  window.h5_native.execNative('startNativePage', { 'code': '119', 'args': { 'videoId': vid, 'videoUrl': vurl } }, function () { });
}
