import request from "./request";

export async function login(data) {
  return request({
    url: "/login",
    method: "post",
    data,
  });
}

export function loginByGoogle(data) {
  return request({
    url: "/loginByGoogle",
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
export function getVersion() {
  return request({
    url: `/gitInfo/getGitBuildVersion`,
    method: "GET",
    data: "",
  });
}

export function resetPassword(data) {
  return request({
    url: "/api/user/resetPassword",
    method: "POST",
    data,
  });
}
