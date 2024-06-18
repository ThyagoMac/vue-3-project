import Axios from "axios";
import {
  /* IS_LOADING_SHOW, */
  SET_USER_TOKEN_DATA_MUTATION,
  SET_AUTO_LOGOUT_MUTATION,
  LOGIN_ACTION,
  SIGNUP_ACTION,
  LOGOUT_ACTION,
  AUTH_ACTION,
  AUTO_LOGIN_ACTION,
  AUTO_LOGOUT_ACTION,
} from "@/store/storeconstants";
import SignupValidations from "@/services/SignupValidations";

let timer = "";

export default {
  async [AUTH_ACTION](context, payload) {
    const data = {
      email: payload.email,
      password: payload.password,
      returnSecureToken: true,
    };

    /* OBS: LOGIN_ACTION func is controlling the loading system on the page */
    let response = "";
    try {
      response = await Axios.post(payload.url, data);
    } catch (error) {
      const errorMessage = SignupValidations.getErrorsMessage(
        error.response.data.error.errors[0].message
      );

      throw errorMessage;
    }

    if (response.status === 200) {
      //const expirationTime = +10 * 1000;
      const expirationTime = +response.data.expiresIn * 1000;

      timer = setTimeout(() => {
        context.dispatch(AUTO_LOGOUT_ACTION);
      }, expirationTime);

      const userData = {
        token: response.data.idToken,
        email: response.data.email,
        name: response.data.displayName,
        userId: response.data.localId,
        localId: response.data.localId,
        refreshToken: response.data.refreshToken,
        expiresIn: response.data.expiresIn,
      };

      localStorage.setItem("userData", JSON.stringify(userData));
      context.commit(SET_USER_TOKEN_DATA_MUTATION, userData);
    }
  },

  [LOGOUT_ACTION](context) {
    if (timer) {
      clearTimeout(timer);
    }
    localStorage.removeItem("userData");
    context.commit(SET_USER_TOKEN_DATA_MUTATION, {
      token: "",
      email: "",
      name: "",
      userId: "",
      localId: "",
      refreshToken: "",
      expiresIn: "",
    });
  },

  [AUTO_LOGOUT_ACTION](context) {
    context.dispatch(LOGOUT_ACTION);
    context.commit(SET_AUTO_LOGOUT_MUTATION, true);
  },

  [AUTO_LOGIN_ACTION](context) {
    const userData = JSON.parse(localStorage.getItem("userData"));

    if (userData) {
      const expirationTime = userData.expiresIn - new Date().getTime();

      if (expirationTime < 10000) {
        //get refresh token or auto logout
        context.dispatch(AUTO_LOGOUT_ACTION);
      } else {
        timer = setTimeout(() => {
          context.dispatch(AUTO_LOGOUT_ACTION);
        }, expirationTime);
      }
      context.commit(SET_USER_TOKEN_DATA_MUTATION, userData);
    }
  },

  async [LOGIN_ACTION](context, payload) {
    return context.dispatch(AUTH_ACTION, {
      ...payload,
      url: "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCEhNP2W95lYturJG4pttBp6UYetEkOuow",
    });
  },

  async [SIGNUP_ACTION](context, payload) {
    return context.dispatch(AUTH_ACTION, {
      ...payload,
      url: "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCEhNP2W95lYturJG4pttBp6UYetEkOuow",
    });

    /* 
    const data = {
      email: payload.email,
      password: payload.password,
      returnSecureToken: true,
    };

    //OBS: SIGNUP_ACTION func is controlling the loading system on the actions.js (here) 
    context.commit(IS_LOADING_SHOW, true, { root: true });

    let response = "";
    try {
      response = await Axios.post(
        ,
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
    */
  },
};
