import {
  SET_AUTO_LOGOUT_MUTATION,
  SET_USER_TOKEN_DATA_MUTATION,
} from "@/store/storeconstants";

export default {
  [SET_USER_TOKEN_DATA_MUTATION](state, payload) {
    state.token = payload.token;
    state.email = payload.email;
    state.name = payload.name;
    state.userId = payload.userId;
    state.localId = payload.localId;
    state.refreshToken = payload.refreshToken;
    state.expiresIn = payload.expiresIn;
    state.autoLogout = false;
  },

  [SET_AUTO_LOGOUT_MUTATION](state, payload) {
    state.autoLogout = payload;
  },
};
