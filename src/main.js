import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ApiService from '@/common/api.service.js'

import VModal from 'vue-js-modal'

import DefaultLayout from '@/layouts/Default.vue'

import './assets/styles/index.css'
import './assets/styles/animations.css'

/* Components Layout of Global  */
import AppInput from '@/components/ui/form/AppInput'
import AppLoader from '@/components/ui/general/AppLoader'
import AppButton from '@/components/ui/general/AppButton'
import AppModal from '@/components/ui/general/AppModal'

/* Instance of layouts */
Vue.component('default-layout', DefaultLayout)

/* Instance of components */
Vue.component('app-input', AppInput)
Vue.component('app-loader', AppLoader)
Vue.component('app-button', AppButton)
Vue.component('app-modal', AppModal)

/* Configuration v-modal */
Vue.use(VModal, { dynamicDefault: { draggable: true, resizable: true } })

Vue.config.productionTip = false

ApiService.init(store)

const vue = new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount('#app')

ApiService.setVue(vue)
