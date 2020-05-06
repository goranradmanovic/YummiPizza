import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loggedIn: false,
    currentRate: 1.65
  },
  mutations: {
    setLogginStatus(state, data) {
      state.loggedIn = data;
    },

    setCurrentRate(state, data) {
      state.currentRate = data;
    },
  },
  actions: {
    userLoggedIn({ commit }, data) {
      commit("setLogginStatus", data);
    },

    userLoggedOut({ commit }, data) {
      commit("setLogginStatus", data);
    },

    currentRateExcange({ commit }, data) {
      commit("setCurrentRate", data);
    },
  },
  getters: {
    loggedIn(state) {
      return state.loggedIn;
    },

    getCurrentRate(state) {
      return state.currentRate;
    }
  },
  modules: {
  }
})
