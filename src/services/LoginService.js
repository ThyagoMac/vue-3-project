import Validations from "./Validations";

export default class LoginService {
  constructor(user) {
    this.user = user;
  }

  checkValidations() {
    let errors = [];
    if (!Validations.checkEmail(this.user?.email)) {
      errors["email"] = "Invalid email";
    }

    if (!Validations.minLength(this.user?.password, 3)) {
      errors["password"] = "Invalid password. Must be gather than 3";
    }

    return errors;
  }
}
