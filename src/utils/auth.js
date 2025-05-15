import { createPinia } from "pinia";
import { useAuthStore } from "../store/auth";
import router from "../router";

export const toLogin = function () {
  const authStore = useAuthStore();

  authStore.$reset();
  router.replace({
    name: "Login",
    query: { redirect: router.currentRoute.value.path },
  });
};

export const isAuthenticated = function () {
  const authStore = useAuthStore();
  if (authStore.user !== "" && authStore.token !== "") {
    return true;
  } else {
    return false;
  }
};
