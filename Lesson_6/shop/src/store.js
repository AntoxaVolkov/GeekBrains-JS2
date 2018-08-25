import Vue from "vue";
import Vuex from "vuex";
import cart from "./store/Cart";
import user from "./store/User";
import comments from "./store/Comments";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    cart,
    user,
    comments
  },
  state: {},
  mutations: {},
  actions: {}
});
