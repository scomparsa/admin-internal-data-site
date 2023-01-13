/* eslint-disable no-unused-expressions */
import { isLocal, isLocalDev } from './env'

const KEY = 'token'

function getToken() {
  return localStorage.getItem(KEY)
}

function isLogin() {
  if (isLocal) {
    return true
  }

  return !!getToken()
}

function logout() {
  localStorage.removeItem(KEY)

  if (isLocal || isLocalDev) {
    document?.write('登录已过期（当前处于开发模式，请设置 localStorage.token）')
  } else {
    location = `/login?title=${encodeURIComponent('智能营销平台')}&redirect=${location}`
  }
}

export { getToken, isLogin, logout }
