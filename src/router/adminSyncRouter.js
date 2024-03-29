import Layout from '@/views/layout'
export default [
  {
    path: '/admin',
    icon: 'zujian',
    component: Layout,
    noDropdown: true,
    children: [
      { 
        path: 'index',
        name: '当月签到', 
        icon: 'zonghe',
        component: () => import('@/views/About')
      }
    ]
  }
]