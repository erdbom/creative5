import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

import mock from './mock.js'

let data = {
  locations: mock,
  total: 0,
}

new Vue({
  router,
  data,
  render: h => h(App)
}).$mount('#app')
