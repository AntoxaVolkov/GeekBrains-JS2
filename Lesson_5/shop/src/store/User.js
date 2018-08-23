const User = {
  state: {
    id: null,
    name: null
  },
  getters: {
    userName(state) {
      return state.name;
    },
    userId(state) {
      return state.id;
    },
    hasUser(state) {
      return !!state.id;
    }
  },
  mutations: {
    setUser(state, user) {
      state.id = user.id;
      state.name = user.name;
    }
  },
  actions: {
    setUser({ commit }, { id, name = "Гость" }) {
      localStorage.setItem("user_id", id);
      localStorage.setItem("user_name", name);
      console.log(id);
      commit("setUser", { id, name });
    },

    hasUser({ dispatch, state }) {
      if (!state.id && localStorage.getItem("user_id")) {
        dispatch("setUser", { id: localStorage.getItem("user_id") });
      }

      return state.id || (!state.id && localStorage.getItem("user_id"));
    },

    getUser({ state }) {
      return { id: state.id, name: state.name };
    }
  }
};

export default User;
