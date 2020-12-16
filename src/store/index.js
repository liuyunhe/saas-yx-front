import Vue from 'vue'
import Vuex from 'vuex'
// import vuexAlong from 'vuex-along'
import LandingPage from './modules/LandingPage'
import createLogger from 'vuex/dist/logger'
import state from './state'
Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    LandingPage,
  },
  strict: debug,
  plugins: debug ? [createLogger()] : [],
  state: state,
  // plugins: [vuexAlong],
  mutations: {
    setMenu(state, data) {
      state.menu = data
    },
    setCluser(state, data) {
      state.cluser = data
    },
    setRoleOptList(state, data) {
      state.roleOptList = data
    }
    // getMenu: (state) => state.menu
  },
  getters: {
    getMenu: (state) => state.menu,
    getRoleOptList: (state) => state.roleOptList
  }
})
