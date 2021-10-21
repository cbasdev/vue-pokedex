import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ApiService from '@/common/api.service.js'

import DefaultLayout from '@/layouts/Default.vue'

import './assets/styles/index.css'

/* Components Layout of Global  */
import AppInput from '@/components/ui/form/AppInput'

/* Instance of layouts */
Vue.component('default-layout', DefaultLayout)

/* Instance of components */
Vue.component('app-input', AppInput)

Vue.config.productionTip = false

const vue = new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount('#app')

ApiService.setVue(vue)
