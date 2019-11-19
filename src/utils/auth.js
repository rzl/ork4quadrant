import Cookies from 'js-cookie'
const TokenKey = 'Admin-Token'

export function getToken(to) {
  if (to !== undefined && to.query.token !== undefined) {
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
