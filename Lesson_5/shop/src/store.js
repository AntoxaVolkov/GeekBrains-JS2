import Vue from "vue";
import Vuex from "vuex";
import cart from "./store/Cart";
import user from "./store/User";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    cart,
    user
  },
  state: {},
  mutations: {},
  actions: {}
});
