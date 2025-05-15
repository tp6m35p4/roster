import router from "../router";
import { useAuthStore } from "../store/auth";
import { toLogin } from "../utils/auth";

export const handleCode = async (code, msg) => {
  //   debugger
  switch (code) {
    case 401:
      // re-login
      try {
        const authStore = useAuthStore();
        let loginStatus = await authStore.login(
          authStore.user.userCode,
          authStore.user.passwords
        );
        if (loginStatus.status == false) {
          // login failed
          throw new Error();
        } else {
          // login successfully
          return true;
        }
      } catch (error) {
        toLogin();
        return false;
        // handle error
      }

      // toLogin();
      break;
    case 403:
      router.push({ path: "/403" }).catch((error) => {
        console.error(error);
      });
      break;
    default:
      console.error(msg || `Backend API Exception`);
      break;
  }
};
