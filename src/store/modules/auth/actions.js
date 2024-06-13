import Axios from "axios";
import {
  SET_USER_TOKEN_DATA_MUTATION,
  SIGNUP_ACTION,
} from "@/store/storeconstants";

export default {
  async [SIGNUP_ACTION](context, payload) {
    const data = {
      email: payload.email,
      password: payload.password,
      returnSecureToken: true,
    };
    //data.returnSecureToken = true;

    const response = await Axios.post(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCEhNP2W95lYturJG4pttBp6UYetEkOuow",
      data
    );

    if (response.status === 200) {
      console.log(response);
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

//https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]
