import Layout from '@/views/layout'
export default [
  {
    path: '/user',
    icon: 'el-icon-menu',
    component: Layout,
    noDropdown: true,
    children: [
      { 
        path: 'home',
        name: '当月签到', 
        icon: 'el-icon-menu',
        component: () => import('@/views/Home')
      }
    ]
  }
]