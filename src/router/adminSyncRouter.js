export default [
  {
    path: '/admin',
    icon: 'zujian',
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