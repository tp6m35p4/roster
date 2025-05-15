import { request } from "../request";

export function getDutyDetailList(params) {
  return request({
    url: "/api/rosterFlight/selectPortalCalendarDetailAll",
    method: "GET",
    params,
  });
}

export function getDutyDetail(data) {
  return request({
    url: "/api/rosterFlight/selectPortalCalendarDetail",
    method: "post",
    data,
  });
}

export function getCrewQualInfo(params) {
  return request({
    url: "/api/rosterFlight/getCrewQualInfo",
    method: "GET",
    params,
  });
}
