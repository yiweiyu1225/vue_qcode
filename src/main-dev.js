import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css' // import styles
import 'quill/dist/quill.snow.css' // for snow theme
import 'quill/dist/quill.bubble.css'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import axios from 'axios' // for bubble theme

Vue.use(VueQuillEditor)

axios.interceptors.request.use(config => {
  NProgress.start()
  return config
})
axios.interceptors.response.use(config => {
  NProgress.done()
  return config
})
// axios.defaults.baseURL = 'http://47.101.59.24:5000/'
Vue.prototype.$http = axios

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
