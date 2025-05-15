import { createRouter, createWebHistory } from "vue-router";
import { isAuthenticated } from "../utils/auth";
// import { airlineConfig } from "@/common/loginPage";
// import Layout from "@/layout/basicLayout/index.vue";

import Page403 from "../views/403.vue";
// import Page404 from "../views/404.vue";
import LoginPage from "../views/auth/LoginPage.vue";

import RosterPage from "../views/RosterPage.vue";
import FlightLogPage from "../views/FlightLogPage.vue";
import About from "../views/About.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: RosterPage,
    meta: {
      keepAlive: true,
    },
  },
  {
    path: "/flightlog",
    name: "FlightLog",
    component: FlightLogPage,
  },
  {
    path: "/login",
    name: "Login",
    meta: {
      noCache: true,
    },
    component: LoginPage,
  },
  {
    path: "/403",
    name: "403",
    meta: {
      noCache: true,
    },
    component: Page403,
  },
  {
    path: "/about",
    name: "About",
    meta: {
      noCache: true,
    },
    component: About,
  },
  //   {
  //     path: "/:catchAll(.*)",
  //     name: "404",
  //     meta: {
  //       noCache: true,
  //     },
  //     component: Page404,
  //   },
  //   {
  //     path: "/page",
  //     name: "page",
  //     component: Layout,
  //     children: [
  //   {
  //     path: "roster",
  //     name: "roster",
  //     component: Roster,
  //     meta: {
  //       keepAlive: true,
  //     },
  //   },
  //   {
  //     path: "roster-report",
  //     name: "Roster Report",
  //     component: () => import("@/views/roster/report.vue"),
  //   },
  //   {
  //     path: "flight-log",
  //     name: "Flight Log",
  //     component: FlightLog,
  //   },
  //   {
  //     path: "roster-detail",
  //     name: "Roster Details",
  //     component: () => import("@/views/roster/detail.vue"),
  //   },
  //   {
  //     path: "notification",
  //     name: "notification",
  //     component: () => import("@/views/notification/index.vue"),
  //   },
  // ],
  //   },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.name !== "Login" && !isAuthenticated()) {
    // toLogin();
    next({ name: "Login" });
  } else if (to.name == "Login" && isAuthenticated()) {
    next({ name: "Home" });
  } else {
    next();
  }

  //   } else {
  //     const urlParams = new URLSearchParams(window.location.search);
  //     const token = urlParams.get("token");
  //     const userName = urlParams.get("userName");
  //     const userCode = urlParams.get("userCode");
  //     // sso退出逻辑
  //     const logoutSuccess = urlParams.get("logoutSuccess");
  //     // 如果地址栏有清空token，则清空本地存储
  //     if (logoutSuccess) {
  //       $t.vuex("vx_user", {});
  //       $t.vuex("vx_token", "");
  //       $t.vuex("vx_username", "");
  //       localStorage.removeItem("SSO_Login_Logout");
  //       store.dispatch("tagsView/delAllViews");
  //       store.commit("getEnv/clearEnv");
  //     }
  //     // 如果地址栏有token，则为登录sso
  //     if (token) {
  //       $t.vuex("vx_user", userCode);
  //       $t.vuex("vx_token", token);
  //       $t.vuex("vx_username", userName);
  //       localStorage.setItem("SSO_Login_Logout", "SSO");
  //       router.push(
  //         airlineConfig[JSON.parse(localStorage.getItem("env"))]?.goRouter
  //       );
  //     } else {
  //       // 如果地址栏没有token，则为登录
  //       if (Object.keys(store.state.vx_user).length === 0) {
  //         next();
  //       } else {
  //         // 如果地址栏没有token，且本地有token，则跳转
  //         router.push(
  //           airlineConfig[JSON.parse(localStorage.getItem("env"))]?.goRouter
  //         );
  //       }
  //     }
});

export default router;
