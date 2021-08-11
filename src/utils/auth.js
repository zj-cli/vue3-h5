import base64 from '@/libs/base64'
import { isLine } from '@/utils/env'
import { ParseUrlParams } from '@/utils/utils'

const parseUrlParams = new ParseUrlParams()

// 获取用户信息
export const getAuthInfo = () => {
  if (window.sessionStorage.getItem('USERID') && window.sessionStorage.getItem('TOKEN')) return
  let _mobile = {} // 用户信息对象
  const uaaId = parseUrlParams.get('userId') // 用户userId
  const tokenId = parseUrlParams.get('tokenId') // 用户tokenId
  const app = window.daka && window.daka.getMobileApp // 大卡内置的获取用户信息方法
  if (uaaId && tokenId) {
    // 如果url存在用户信息参数，则取其
    _mobile = { uaaId, tokenId }
  } else if (app) {
    // 再判断大卡app环境参数
    const str = window.daka.getMobileApp()
    _mobile = JSON.parse(base64.base64decode(str))
  } else if (!isLine) {
    // 本地自定义模拟参数
    const str =
      'eyJhcHBWZXJzaW9uIjoiMy4zLjEiLCJhdmF0YXIiOiJodHRwczovL3Rlc3QtYXBwaW1ncy5nZ2h5cHQubmV0L01vYmlsZUZpbGVTZXJ2ZXIvZG93bmxvYWQuZG8/cD00NjlCOTIzODlGOTAwODNGNjBGRjJBRUI2ODhBN0Y1NzM5ODhCRTcwODU2N0IxQUQ3NzBBRTYwQkY2RjNFRDgyIiwiYmFja1VybCI6IndpbmRvdy5kYWthLmV4ZWMoJ3Rva2VuSW52YWxpZGF0aW9uJyxbXSkiLCJjYWxsU291cmNlIjoiQW5kcm9pZCIsImNsaWVudElkIjoiMDAwMDAwMDAtMjQ1NC1hYTRmLWZmZmYtZmZmZjkwMzJkYTBjIiwiZGF0YVNvdXJjZSI6IjEwIiwiaXNTdXBwb3J0V2ViUGF5IjoiMSIsIm1vYmlsZUVuY3J5cHQiOiI2QTI1REM3NTQ3QzgzRDg2NEVERjAwMjM0QkJDNEEzODU5MzVEQ0FGRkY3RTYyMDhDRkM5MjQ1MzJEREE5Njk1IiwibW9iaWxlTW9kZWwiOiJNSSA0TFRFIiwibW9iaWxlTm8iOiIxODYwMDgxOTExMyIsIm5pY2tOYW1lIjoi5p2O5q2j6ZuEIiwibm90ZSI6IuWkh+azqCIsInNleCI6IjEiLCJzaWduIjoiMWMwOWYyM2Y0ZmY3ZDUwZjVkMGQ4Nzg5YTNlNzU1NmYiLCJzdXBwb3J0TmF0aXZlUGF5IjoiMSIsInN5c3RlbVZlcnNpb24iOiI0LjQuNCIsInRva2VuSWQiOiI5MUQ4OTBDNDkxRUU0MkEwQTgyRTU4NTgxNTQzMEUyRiIsInVhYUlkIjoiZGJlY2RmZTUtMzk4Ni00YzUwLTlhYTYtMTVlYzA0MzczZDIyIiwidXNlcklkIjoiMGNhNGQzNWM0NzE2NDBiMDk0MTAzZmQwOGUxNzM1OTUiLCJ1c2VyTmFtZSI6IjE4NjAwODE5MTEzIn0='
    _mobile = JSON.parse(base64.base64decode(str))
  }
  window.sessionStorage.setItem('USERID', _mobile.uaaId)
  window.sessionStorage.setItem('TOKEN', _mobile.tokenId)
  window.sessionStorage.setItem('LOGINNAME', _mobile.mobileNo)
  window.sessionStorage.setItem('PHONE', _mobile.mobileNo)
  window.sessionStorage.setItem('MERCHANTCODE', '')
}
