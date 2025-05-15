import axios from "axios";
import { useAuthStore } from "../store/auth";
import { handleCode } from "./utils";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const instance = axios.create({
  baseURL: API_BASE_URL,
  timeout: import.meta.env.VITE_REQUEST_TIMEOUT,
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
  },
});

instance.interceptors.request.use(
  (config) => {
    // add jwt token
    const authStore = useAuthStore();
    config.headers["Authorization"] = `Bearer ${authStore.token}`;
    // config.headers["userId"] = store.state.vx_user.userId;

    return config;
  },
  (error) => {
    console.log("request", error.request);
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    // 2XX
    if (response.data.code !== 0) {
      // notification.warning({
      //   message: "Warning",
      //   description: response.data.message,
      // });
      return Promise.reject(response);
    }

    return response;
  },
  (error) => {
    // outside 2XX
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      const { response } = error;
      // console.log("config", error);
      if (response.status == 401) {
        handleCode(401, response.data.message).then((status) => {
          if (status == true) {
            // re-login successfully
            // console.log("re-login successfully");
            return instance.request(error.config);
          } else {
            // re-login failed
            // console.log("re-login failed");
            return Promise.reject(error);
          }
        });
      } else {
        handleCode(response.status, response.data.message);
        return Promise.reject(error);
      }
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      // console.log("request", error.request);
      return Promise.reject(error);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error", error.message);
      return Promise.reject(error);
    }
  }
);

export default async function (config) {
  let method = config.method.toLowerCase();
  let response = "";

  try {
    switch (method) {
      case "get":
        response = await instance.get(config.url, { params: config.data });
        break;
      case "post":
        response = await instance.post(config.url, config.data);
        break;
    }
    return response.data;
  } catch (error) {
    return false;
  }
}
