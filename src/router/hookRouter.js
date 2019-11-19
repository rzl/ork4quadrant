import { getToken } from '@/utils/auth' // 验权
import store from '@/store'
import { verifyPermission } from './syncRouter'
import syncRouter from './syncRouter'

export default function hookRouter(router) {
  const whiteList = ['/login'] // 不重定向白名单
  router.beforeEach((to, from, next) => {
    console.log(to.path)
    console.log(getToken(to, from, next))
    if (getToken(to, from, next)) {
      if (to.path === '/login') {
        next({ path: '/' })
      } else {
        if (store.state.userInfo.permissions && store.state.userInfo.permissions.length === 0) { // 判断当前用户是否已拉取完user_info信息
          store.dispatch('freshUserInfo').then(res => { // 拉取user_info
            if (res.data.permissions.length === 0) { res.data.permissions.push('login') }
            const permissions = res.data.permissions // note: roles must be a array! such as: ['editor','develop']
            var routers = syncRouter(permissions)
            router.addRoutes(routers) // 动态添加可访问路由表
            next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
          }).catch((e) => {
            console.log(e)
            store.dispatch('logout').then(() => {
              next({ path: '/login' })
            })
          })
        } else {
          if (verifyPermission(store.getters.permissions, to.meta.permission, store)) {
            next()//
          } else {
            next({ path: '/401', replace: true, query: { noGoBack: true }})
          }
        }
      }
    } else {
      if (whiteList.indexOf(to.path) !== -1) {
        next()
      } else {
        next('/login')
      }
    }
  })
  router.afterEach(() => {
  })
}
