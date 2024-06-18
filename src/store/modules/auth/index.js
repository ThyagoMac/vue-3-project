import actions from "./actions";
import getters from "./getters";
import mutations from "./mutations";

export default {
  namespaced: true,
  state() {
    return {
      token: "",
      email: "",
      name: "testando nome vuex",
      userId: "",
      localId: "",
      refreshToken: "",
      expiresIn: "",
      autoLogout: false,
    };
  },
  actions,
  getters,
  mutations,
};
