import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    city: '',
    area: ''
  },
  getters: {
    city(state) {
      return state.city
    },
    area(state) {
      return state.area
    }
  },
  mutations: {
    SET_CITY(state, city) {
      state.city = city
    },
    SET_AREA(state, area) {
      state.area = area
    }
  },
  actions: {
    INIT_CITY({ commit }) {
      commit("SET_CITY", '臺北市')
    }
  },
  modules: {}
});
