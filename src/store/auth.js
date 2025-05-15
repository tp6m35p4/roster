import { defineStore, acceptHMRUpdate } from "pinia";
import { ref } from "vue";
import { toLogin } from "../utils/auth";
import { login as loginAPI, getUser as getUserAPI } from "../api/auth";

export const useAuthStore = defineStore(
  "auth",
  () => {
    const user = ref("");
    const token = ref("");

    function $reset() {
      user.value = "";
      token.value = "";
    }

    function logout() {
      this.$reset();
      toLogin();
    }

    async function login(userCode, passwords) {
      if (userCode == "") {
        throw new Error("Please enter your ID");
      }
      if (passwords == "") {
        throw new Error("Please enter your Password");
      }
      let userPaylod = {
        userCode: userCode,
        passwords: passwords,
      };
      try {
        let res = await loginAPI({
          user: userPaylod,
        });
        if (res.data != "") {
          // verify token before get user
          let jwtSplit = res.data.split(".");
          if (jwtSplit.length != 3) {
            throw new Error(res.data);
          } else {
            let jwtPayload = JSON.parse(atob(jwtSplit[1]));
            if (jwtPayload.userName == userCode) {
              token.value = res.data;
              // let getUserStatus = await getUser(userCode);
              // if (getUserStatus.status == false) {
              //   return { status: false, msg: getUserStatus.msg };
              // } else {
              //   return { status: true, msg: "Login successfully" };
              // }
              return { status: true, message: "Login successfully" };
            } else {
              throw new Error("Something went wrong");
            }
          }
        } else {
          throw new Error("Something went wrong");
        }
      } catch (error) {
        return { status: false, message: error.message };
      }
    }

    async function getUser(userCode) {
      try {
        if (userCode == "") {
          return { status: false, message: "Please enter your ID" };
        }
        let userRes = await getUserAPI({ name: userCode });
        user.value = userRes.data;
        return { status: true, message: "User data fetched successfully" };
      } catch (error) {
        console.error("Error fetching user data:", error);
        return { status: false, message: "Failed to fetch user data" };
      }
    }

    return { user, token, $reset, logout, getUser, login };
  },
  {
    persist: true,
  }
);
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot));
}
