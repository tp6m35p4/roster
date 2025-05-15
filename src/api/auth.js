import request from "./request";

export async function login(data) {
  return request({
    url: "/login",
    method: "post",
    data,
  });
}

export async function logoutUser() {
  return request({
    url: "/api/logout",
    method: "post",
  });
}

export async function getUser(data) {
  return request({
    url: "/api/users/get",
    method: "get",
    data,
  });
}
