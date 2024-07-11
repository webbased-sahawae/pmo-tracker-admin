import useICookie from "./cookie";

export default class pmoAPI {
  static async getWithAccess() {
    try {
      const result = await useFetch(
        useRuntimeConfig().public.BASE_URL + "/user/google",
        {
          headers: {
            access_token: useICookie.get("access_token"),
            UserLevelId: useRuntimeConfig().public.SYSTEM_PRIVILEGE,
          },
        }
      );
      // console.log(data);
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async login(token) {
    try {
      // console.log("asdsad");
      // console.log(useRuntimeConfig().public.BASE_URL + url);
      // console.log(useICookie.get("access_token"));
      const result = await useFetch(
        useRuntimeConfig().public.BASE_URL + "/user/login",
        {
          headers: {
            access_token: token,
            UserLevelId: useRuntimeConfig().public.SYSTEM_PRIVILEGE,
          },
        }
      );
      // console.log(data);
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async assignment() {
    try {
      // console.log("asdsad");
      // console.log(useRuntimeConfig().public.BASE_URL + url);
      // console.log(useICookie.get("access_token"));
      const result = await useFetch(
        useRuntimeConfig().public.BASE_URL + "/assignment/partner",
        {
          headers: {
            access_token: useICookie.get("access_token"),
            UserLevelId: useRuntimeConfig().public.SYSTEM_PRIVILEGE,
          },
        }
      );
      // console.log(data);
      return result;
    } catch (error) {
      throw error;
    }
  }
}
