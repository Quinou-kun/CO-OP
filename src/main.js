// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.config with an alias.
import Vue from 'vue'
import App from './App'
import {router} from './router'
import store from './store'
import interceptors from './services/interceptor'

require('bootstrap/dist/css/bootstrap.min.css')
require('bootstrap/dist/js/bootstrap.min.js')
require('bootstrap/dist/js/bootstrap.bundle.min.js')
require('jquery/dist/jquery.min.js')
require('popper.js/dist/popper.min.js')
require('font-awesome/css/font-awesome.min.css')

Vue.config.productionTip = false

Vue.use(interceptors, {
  router
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
