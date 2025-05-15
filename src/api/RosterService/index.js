import { request } from "../request";

// 门户右侧，获取当月详情列表数据
export function getDutyDetailList(params) {
  return request({
    url: "/api/rosterFlight/selectPortalCalendarDetailAll",
    method: "GET",
    params,
  });
}

// 门户右侧，点击某天获取右侧详情数据
export function getDutyDetail(data) {
  return request({
    url: "/api/rosterFlight/selectPortalCalendarDetail",
    method: "post",
    data,
  });
}

// 门户右侧，获取机组人员资质信息
export function getCrewQualInfo(params) {
  return request({
    url: "/api/rosterFlight/getCrewQualInfo",
    method: "GET",
    params,
  });
}
