import SignupValidations from "./SignupValidations";

export default class LoginService {
  constructor(user) {
    this.user = user;
  }

  checkValidations() {
    let errors = [];
    if (!SignupValidations.checkEmail(this.user?.email)) {
      errors["email"] = "Invalid email";
    }

    if (!SignupValidations.minLength(this.user?.password, 3)) {
      errors["password"] = "Invalid password. Must be gather than 3";
    }

    return errors;
  }
}
