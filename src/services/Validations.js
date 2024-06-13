export default class Validations {
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
}
