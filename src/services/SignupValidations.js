export default class SignupValidations {
  static checkEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (regex.test(email)) {
      return true;
    }
    return false;
  }

  static minLength(name, minLength) {
    if (name.length < minLength) {
      return false;
    }
    return true;
  }

  static getErrorsMessage(error) {
    switch (error) {
      case "EMAIL_EXISTS":
        return "Email already exists try other email";

      case "OPERATION_NOT_ALLOWED":
        return "Not allowed. Try other credentials";

      case "TOO_MANY_ATTEMPTS_TRY_LATER":
        return "Many attempts. Try later.";

      case "EMAIL_NOT_FOUND":
        return "Email ot found";

      case "INVALID_LOGIN_CREDENTIALS":
        return "Invalid credentials check your informations and try again";

      case "INVALID_PASSWORD":
        return "Invalid password";

      case "USER_DISABLED":
        return "User is disabled";

      default:
        return "Unexpected error. Try again";
    }
  }
}
