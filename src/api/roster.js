import request from "./request";


export async function getRosterFlights(data) {
  return request({
    url: "/api/rosterFlight/selectByCrew",
    method: "post",
    data,
  });
}

export async function selectPortalCalendar(data) {
  return request({
    url: "/api/rosterFlight/selectPortalCalendar",
    method: "get",
    data,
  });
}

export async function selectPortalCalendarDetailAll(data) {
  return request({
    url: "/api/rosterFlight/selectPortalCalendarDetailAll",
    method: "GET",
    data,
  });
}

export async function selectPortalCalendarTotal(data) {
  return request({
    url: "/api/rosterFlight/selectPortalCalendarTotal",
    method: "get",
    params: data,
  });
}

export async function selectInfo(fltId) {
  return request({
    url: `/api/portal/flightLog/selectInfo?fltId=${fltId}`,
    method: "get",
  });
}



