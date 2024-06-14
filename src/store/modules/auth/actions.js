import Axios from "axios";
import {
  SET_USER_TOKEN_DATA_MUTATION,
  SIGNUP_ACTION,
} from "@/store/storeconstants";
import SignupValidations from "@/services/SignupValidations";

export default {
  async [SIGNUP_ACTION](context, payload) {
    const data = {
      email: payload.email,
      password: payload.password,
      returnSecureToken: true,
    };
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

    /* 
    EMAIL_EXISTS: o endereço de e-mail já está sendo usado por outra conta.
    OPERATION_NOT_ALLOWED: o login por senha está desabilitado para este projeto.
    TOO_MANY_ATTEMPTS_TRY_LATER


    login err:
    EMAIL_NOT_FOUND: Não há registro de usuário correspondente a este identificador. O usuário pode ter sido excluído.
    INVALID_PASSWORD: A senha é inválida ou o usuário não possui senha.
    USER_DISABLED:
    */
  },
};
