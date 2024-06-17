import Axios from "axios";
import {
  LOGIN_ACTION,
  IS_LOADING_SHOW,
  SET_USER_TOKEN_DATA_MUTATION,
  SIGNUP_ACTION,
} from "@/store/storeconstants";
import SignupValidations from "@/services/SignupValidations";

export default {
  async [LOGIN_ACTION](context, payload) {
    const data = {
      email: payload.email,
      password: payload.password,
      returnSecureToken: true,
    };

    /* OBS: LOGIN_ACTION func is controlling the loading system on the page */
    let response = "";
    try {
      response = await Axios.post(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCEhNP2W95lYturJG4pttBp6UYetEkOuow",
        data
      );
    } catch (error) {
      const errorMessage = SignupValidations.getErrorsMessage(
        error.response.data.error.errors[0].message
      );

      throw errorMessage;
    }

    if (response.status === 200) {
      context.commit(SET_USER_TOKEN_DATA_MUTATION, {
        token: response.data.token,
        email: response.data.email,
        userId: response.data.userId,
        refreshToken: response.data.refreshToken,
        expiresIn: response.data.expiresIn,
      });
    }
  },

  async [SIGNUP_ACTION](context, payload) {
    const data = {
      email: payload.email,
      password: payload.password,
      returnSecureToken: true,
    };

    /* OBS: SIGNUP_ACTION func is controlling the loading system on the actions.js (here) */
    context.commit(IS_LOADING_SHOW, true, { root: true });

    let response = "";
    try {
      response = await Axios.post(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCEhNP2W95lYturJG4pttBp6UYetEkOuow",
        data
      );
    } catch (error) {
      const errorMessage = SignupValidations.getErrorsMessage(
        error.response.data.error.errors[0].message
      );

      throw errorMessage;
    } finally {
      context.commit(IS_LOADING_SHOW, false, { root: true });
    }
    if (response.status === 200) {
      context.commit(SET_USER_TOKEN_DATA_MUTATION, {
        token: response.data.token,
        email: response.data.email,
        userId: response.data.userId,
        refreshToken: response.data.refreshToken,
        expiresIn: response.data.expiresIn,
      });
    }
  },
};
