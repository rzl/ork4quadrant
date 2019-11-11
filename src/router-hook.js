import { getToken } from '@/utils/auth' // 验权

function hasPermission(permissions, permission, store) {
  if (!permission) return true
  if (permission === undefined) return true
  if (permission === 'admin') {
    return store.getters.admin
  } else if (permission === 'superAdmin') {
    return store.getters.superAdmin
  }
  return permissions.indexOf(permission) > -1
}

export function hookRouter(router, store) {
  const whiteList = ['/login'] // 不重定向白名单
  router.beforeEach((to, from, next) => {
    console.log(to.path)
    if (getToken(to, from, next)) {
      if (to.path === '/login') {
        next({ path: '/' })
      } else {
        //  console.log(store)
        if (store.state.permissions.length === 0) { // 判断当前用户是否已拉取完user_info信息
          store.dispatch('GetInfo').then(res => { // 拉取user_info
            if (res.data.permissions.length === 0) { res.data.permissions.push('login') }
            const permissions = res.data.permissions // note: roles must be a array! such as: ['editor','develop']
            store.dispatch('GenerateRoutes', { permissions, router }).then(() => { // 根据roles权限生成可访问的路由表
              router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
              next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
            })
          }).catch(() => {
            store.dispatch('FedLogOut').then(() => {
              next({ path: '/login' })
            })
          })
        } else {
          if (hasPermission(store.getters.permissions, to.meta.permission, store)) {
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
