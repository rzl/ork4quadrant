import adminSyncRouter from './adminSyncRouter'
import userSyncRouter from './userSyncRouter'
import { hasPermission } from '@/utils'

export function verifyPermission(permissions, permission) {
  if (!permission) return true
  if (permission === undefined) return true
  return hasPermission(permissions, permission)
}

export function filterRouter(routers, permissions) {
  const accessRouters = routers.filter(route => {
    if (verifyPermission(permissions, route.permission)) {
      if (route.children && route.children.length) {
        route.children = filterRouter(route.children, permissions)
      }
      return true
    }
    return false
  })
  return accessRouters
}

export default function syncRouter(permissions) {
	var syncRouters = [ adminSyncRouter, userSyncRouter ]
	var routers = []
	syncRouters.forEach((syncRoutes) => {
    syncRoutes.forEach((syncRoute) => {
      routers.push(syncRoute)
    })
	})
	return filterRouter(routers, permissions)
}