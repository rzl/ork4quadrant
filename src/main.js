import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import * as utils from '@/utils'
import 'element-ui/lib/theme-chalk/index.css'

import { hookRouter } from '@/router-hook' // permission control
hookRouter(router, store)

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.prototype.$utils = utils
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
