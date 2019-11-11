import Cookies from 'js-cookie'
import store from '@/store.js'
const TokenKey = 'Admin-Token'

export function getToken(to) {
  if (to !== undefined && to.query.token !== undefined) {
    store.dispatch('SetToken', to.query.token)
    Cookies.set(TokenKey, to.query.token)
  }
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
