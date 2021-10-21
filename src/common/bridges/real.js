import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { API_URL } from '@/common/config'

let _Store = null
let _Vue = null

const ApiService = {
  init(Store) {
    _Store = Store
    Vue.use(VueAxios, axios)
    Vue.axios.defaults.baseURL = API_URL
    this.setHeader()
  },

  setVue(vue) {
    _Vue = vue
  },

  setHeader() {
    Vue.axios.defaults.headers.common['Content-Language'] = 'es'

    const token = _Store.getters.user ? _Store.getters.user.token : ''
    if (token) {
      Vue.axios.defaults.headers.common.Authorization = `Bearer ${token}`
    }
  },

  query(resource, params) {
    if (!params) params = ''
    return Vue.axios.get(resource, params).catch((error) => {
      throw new Error(`[RWV] ApiService ${error}`)
    })
  },

  download(resource, slug = '') {
    if (!slug) slug = ''
    return Vue.axios
      .get(`${resource}/${slug}`, { responseType: 'arraybuffer' })
      .then((result) => Promise.resolve(result.data))
  },

  post(resource, params) {
    if (!params) params = {}

    return Vue.axios
      .post(`${resource}`, params)
      .then((result) => Promise.resolve(result.data))
      .catch(this._handleError)
  },

  get(resource, slug = '') {
    if (!slug) slug = ''
    // console.error(resource, slug);
    return Vue.axios
      .get(`${resource}/${slug}`)
      .then((result) => Promise.resolve(result.data))
      .catch(this._handleError)
  },

  postMultiPart(resource, params) {
    if (!params) params = {}
    return Vue.axios
      .post(`${resource}`, params, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((result) => Promise.resolve(result.data))
      .catch(this._handleError)
  },

  _handleError(error) {
    const result = error.response.data
    if (error.response.status === 401) {
      window.clearInterval(window.threadRealTime)
      _Vue.$root.$children[0].unauthorized(error.response)
      // window.location = "/";
    }
    // else if (error.response.status === 400) {
    //   _Store.commit(SET_ERRORS, error);
    // }

    return Promise.reject(result)
  },
}

export default ApiService
