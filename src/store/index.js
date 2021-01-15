import Vue from 'vue'
import Vuex from 'vuex'
import { setItem, getItem } from '../plugins/storage.js'

Vue.use(Vuex)
const keys = 'Token_Keys'
export default new Vuex.Store({
  state: {
    user: getItem(keys)
  },
  mutations: {
    setToken(state, payload) {
      setItem(keys, payload)
      state.user = getItem(keys)
    },
    refreshToken(state, payload) {
      state.user.token = payload
    }
  },
  actions: {},
  modules: {}
})
