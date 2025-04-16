import useICookie from "./cookie";

export default class pmoAPI {
  static async login(token) {
    try {
      // console.log("asdsad");
      // console.log(useRuntimeConfig().public.BASE_URL + url);
      // console.log(useICookie.get("access_token"));
      const result = await useFetch(
        useRuntimeConfig().public.BASE_URL + "/user/login",
        {
          headers: {
            credential: token,
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

  static async createUserAndLevel(email, UserLevelId) {
    try {
      const result = await useFetch(
        useRuntimeConfig().public.BASE_URL + "/user/",
        {
          headers: {
            access_token: useICookie.get("access_token"),
            UserLevelId: useRuntimeConfig().public.SYSTEM_PRIVILEGE,
          },
          method: "POST",
          body: { email, UserLevelId },
        }
      );
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async createUserAssignment(UserId, PartnerId) {
    try {
      const result = await useFetch(
        useRuntimeConfig().public.BASE_URL + "/assignment/partner",
        {
          headers: {
            access_token: useICookie.get("access_token"),
            UserLevelId: useRuntimeConfig().public.SYSTEM_PRIVILEGE,
          },
          method: "POST",
          body: { UserId, PartnerId },
        }
      );
      return result;
    } catch (error) {
      throw error;
    }
  }

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

  static async getRegisteredUsers(search, page) {
    try {
      const result = await useFetch(
        useRuntimeConfig().public.BASE_URL + "/user",
        {
          headers: {
            access_token: useICookie.get("access_token"),
            UserLevelId: useRuntimeConfig().public.SYSTEM_PRIVILEGE,
          },
          query: { search, page },
        }
      );
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async getUserLevelList() {
    try {
      const result = await useFetch(
        useRuntimeConfig().public.BASE_URL + "/user/level",
        {
          headers: {
            access_token: useICookie.get("access_token"),
            UserLevelId: useRuntimeConfig().public.SYSTEM_PRIVILEGE,
          },
        }
      );
      return result.data;
    } catch (error) {
      throw error;
    }
  }

  static async getCategoryList() {
    try {
      const result = await useFetch(
        useRuntimeConfig().public.BASE_URL + "/category",
        {
          headers: {
            access_token: useICookie.get("access_token"),
            UserLevelId: useRuntimeConfig().public.SYSTEM_PRIVILEGE,
          },
        }
      );
      console.log(result.data);

      return result;
    } catch (error) {
      throw error;
    }
  }

  static async getExceptedCategoryList(CategoryId) {
    try {
      const result = await useFetch(
        useRuntimeConfig().public.BASE_URL + "/category/" + CategoryId,
        {
          headers: {
            access_token: useICookie.get("access_token"),
            UserLevelId: useRuntimeConfig().public.SYSTEM_PRIVILEGE,
          },
        }
      );
      console.log(result.data);

      return result;
    } catch (error) {
      throw error;
    }
  }

  static async getAssignmentByUserId(UserId) {
    try {
      const result = await useFetch(
        useRuntimeConfig().public.BASE_URL + "/assignment/" + UserId,
        {
          headers: {
            access_token: useICookie.get("access_token"),
            UserLevelId: useRuntimeConfig().public.SYSTEM_PRIVILEGE,
          },
        }
      );
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async getUserLevel(UserId) {
    try {
      const result = await useFetch(
        useRuntimeConfig().public.BASE_URL + "/user/level/" + UserId,
        {
          headers: {
            access_token: useICookie.get("access_token"),
            UserLevelId: useRuntimeConfig().public.SYSTEM_PRIVILEGE,
          },
        }
      );
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async deleteUserById(UserId) {
    try {
      const result = await useFetch(
        useRuntimeConfig().public.BASE_URL + "/user/" + UserId,
        {
          method: "DELETE",
          headers: {
            access_token: useICookie.get("access_token"),
            UserLevelId: useRuntimeConfig().public.SYSTEM_PRIVILEGE,
          },
        }
      );
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async deleteUserLevel(UserLevelId) {
    try {
      const result = await useFetch(
        useRuntimeConfig().public.BASE_URL + "/user/level/" + UserLevelId,
        {
          method: "DELETE",
          headers: {
            access_token: useICookie.get("access_token"),
            UserLevelId: useRuntimeConfig().public.SYSTEM_PRIVILEGE,
          },
        }
      );
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async deleteAssignment(AssignmentId) {
    try {
      const result = await useFetch(
        useRuntimeConfig().public.BASE_URL + "/assignment/" + AssignmentId,
        {
          method: "DELETE",
          headers: {
            access_token: useICookie.get("access_token"),
            UserLevelId: useRuntimeConfig().public.SYSTEM_PRIVILEGE,
          },
        }
      );
      return result;
    } catch (error) {
      throw error;
    }
  }
  static async searchPartners(search, page) {
    try {
      const result = await useFetch(
        useRuntimeConfig().public.BASE_URL + "/partner",
        {
          headers: {
            access_token: useICookie.get("access_token"),
            UserLevelId: useRuntimeConfig().public.SYSTEM_PRIVILEGE,
          },
          query: { search, page },
        }
      );
      return result;
    } catch (error) {
      throw error;
    }
  }
}
