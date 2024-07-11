export default class useICookie {
  static async set(name, value) {
    try {
      //   console.log(name, value);
      useCookie(name, { secure: true }).value = value;
    } catch (error) {
      throw error;
    }
  }

  static get(name) {
    // console.log(useCookie(name)?.value);
    return useCookie(name)?.value;
  }

  static async delete(name) {
    if (useCookie(name).value) useCookie(name).value = null;
  }
}
