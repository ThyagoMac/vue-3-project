import { createStore } from "vuex";
import auth from "./modules/auth/index";
import { IS_LOADING_SHOW } from "./storeconstants";

const store = createStore({
  modules: {
    auth,
  },
  state() {
    return {
      isLoading: false,
    };
  },
  mutations: {
    [IS_LOADING_SHOW](state, payload) {
      state.isLoading = payload;
    },
  },
});

export default store;
