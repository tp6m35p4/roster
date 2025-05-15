<template>
  <div class="row justify-content-center">
    <div class="col-md-4">
      <div class="card mb-3">
        <div class="card-body">
          <h5 class="card-title text-center">Login</h5>
          <form class="mb-3">
            <div class="mb-3">
              <label for="userId" class="form-label">ID</label>
              <input
                type="text"
                class="form-control"
                id="userId"
                v-model="loginInfo.userCode"
                autocomplete="username"
              />
            </div>
            <label for="password" class="form-label">Password</label>
            <input
              type="password"
              id="password"
              class="form-control"
              aria-describedby="passwordHelpBlock"
              v-model="loginInfo.passwords"
              autocomplete="current-password"
            />
          </form>
          <p class="card-text">
            This application does NOT record any personal information. NOT an
            Offical application.
          </p>
          <p class="card-text">建議加入主畫面以取得最佳使用體驗。</p>

          <div class="d-grid gap-2 d-md-flex justify-content-md-end">
            <button class="btn btn-primary" type="button" @click="goLogin">
              Login
            </button>
          </div>
        </div>
      </div>
      <div class="alert alert-danger" role="alert" v-if="message">
        {{ message }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { useAuthStore } from "../../store/auth";
import { useRoute, useRouter } from "vue-router";
import { md5 } from "js-md5";
const authStore = useAuthStore();
const loginInfo = reactive({
  userCode: "",
  passwords: "",
});
const route = useRoute();
const router = useRouter();
const message = ref("");
async function goLogin() {
  let loginStatus = await authStore.login(
    loginInfo.userCode,
    md5(loginInfo.passwords)
  );
  if (loginStatus.status) {
    message.value = "";
    // get user info
    let getUserStatus = await authStore.getUser(loginInfo.userCode);
    if (getUserStatus.status) {
      const redirectPath = route.query.redirect || "/";
      router.push(redirectPath);
      return;
    } else {
      message.value = getUserStatus.message;
    }
  } else {
    message.value = loginStatus.message;
  }
  // if (loginInfo.userCode == "") {
  //   message.value = "Please enter your ID";
  //   return;
  // }
  // if (loginInfo.passwords == "") {
  //   message.value = "Please enter your password";
  //   return;
  // }
  // let user = {
  //   userCode: loginInfo.userCode,
  //   passwords: md5(loginInfo.passwords),
  // };
  // let res = await login({
  //   user,
  // });
  // if (res.data != "") {
  //   message.value = "";
  //   authStore.token = res.data;

  //   // verify token before get user
  //   let jwtSplit = res.data.split(".");
  //   if (jwtSplit.length != 3) {
  //     message.value = res.data;
  //     return;
  //   } else {
  //     let jwtPayload = JSON.parse(atob(jwtSplit[1]));
  //     if (jwtPayload.userName == user.userCode) {
  //       let user = await getUser({ name: loginInfo.userCode });
  //       authStore.user = user.data;
  //       const redirectPath = route.query.redirect || "/";
  //       router.push(redirectPath);
  //     } else {
  //       message.value = "Something went wrong";
  //     }
  //   }
  // } else {
  //   message.value = "Something went wrong";
  // }
}
</script>

<style lang="scss" scoped></style>
