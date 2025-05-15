import request from "./request";

export async function getAssignment() {
  return request({
    url: "/api/statics/assignment/list",
    method: "post",
  });
}
export async function getRosterFlights(data) {
  return request({
    url: "/api/rosterFlight/selectByCrew",
    method: "post",
    data,
  });
}
export async function getAirport() {
  return request({
    url: "/api/statics/airport/list",
    method: "get",
  });
}
export async function getRosterNotification(data) {
  return request({
    url: "/api/scenario/rosterpublish/search",
    method: "get",
    params: data,
  });
}
// export async function getLogisticsData(crewCode:string, start:any, end:any) {
//   return request2({
//     url: '/overnight/CA',
//     method: 'get',
//     params: {
//       "crewCode": crewCode,
//       "start": start,
//       "end": end
//     }
//   })
// }

export async function getCrewManday(data) {
  return request({
    url: "/api/crewManday/search",
    method: "get",
    params: data,
  });
}

export async function getDashboard() {
  return request({
    url: "/api/crewManday/dashboard",
    method: "get",
  });
}

export async function getCrewMemo(data) {
  return request({
    url: "/api/scenario/crew/crewMemo/get/crewIds",
    method: "post",
    data,
  });
}

export async function getPairingMemo(data) {
  return request({
    url: "",
    method: "post",
    data,
  });
}

export async function checkRosterPublishAdjust(data) {
  return request({
    url: "/api/scenario/rosterpublishadjust/update",
    method: "post",
    data,
  });
}

export async function getMyDutyToSwap(data) {
  return request({
    url: "/api/scenario/rosterpublish/detail",
    method: "get",
    params: data,
  });
}

export async function saveDutySwap(data) {
  return request({
    url: "/api/scenario/swap/save",
    method: "post",
    data,
  });
}

export async function publishMyRoster(data) {
  return request({
    url: "/api/scenario/swap/publish",
    method: "post",
    data,
  });
}

export async function getALOrFlightRquest(data) {
  return request({
    url: "/api/crewPortal/crewRequest/byType",
    method: "get",
    params: data,
  });
}

export async function saveRequest(data) {
  return request({
    url: "/api/crewRequest/save",
    method: "post",
    data,
  });
}

export async function deleteRequest(data) {
  return request({
    url: "/api/crewRequest/deleteById",
    method: "post",
    data,
  });
}

export async function getCrewRequestPublic(data) {
  return request({
    url: "/api/scenario/crewportal/request",
    method: "get",
    params: data,
  });
}

export async function getPairingByFltMumAndDt(data) {
  return request({
    url: "/api/scenario/pairing/list/byDtAndFltNum",
    method: "get",
    params: data,
  });
}

export async function getGroundPairingByFltMumAndDt(data) {
  return request({
    url: "/api/scenario/ground/pairing/list/byDtAndFltNum",
    method: "post",
    data,
  });
}

export async function getDutySwapRecord(data) {
  return request({
    url: "/api/scenario/crewportal/swap",
    method: "get",
    params: data,
  });
}

export async function saveDetailStatus(data) {
  return request({
    url: "/api/scenario/swap/updateStatus",
    method: "post",
    data,
  });
}

export async function getAirline() {
  return request({
    url: "/system/parameter/getAirline",
    method: "get",
  });
  // return new Promise((resolve,reject)=>{
  //   resolve({
  //     data:{
  //     code:0,
  //     data:"CX"
  //     }
  //   })
  // })
}

export async function getLoginType() {
  return request({
    url: "/system/parameter/getLoginType",
    method: "post",
  });
}

export async function getAssignmentByGroup(data) {
  return request({
    url: "/api/statics/assignment/byGroup",
    method: "get",
    params: { group: data },
  });
}

// 提交volunteer
export async function setVolunteer(data) {
  return request({
    url: "/api/rosterFlight/setVolunteer",
    method: "post",
    data,
  });
}

// 判断是否可申请volunteer
export async function getVolunteerLabel() {
  return request({
    url: "/api/rosterFlight/getVolunteerLabel",
    method: "get",
  });
}

// 新版改造

// 门户周期下拉数据
export async function selectRosterPeriodVo() {
  return request({
    url: "/api/rosterFlight/selectRosterPeriodVo",
    method: "get",
  });
}

// 新版Roster报表
export async function selectCrewRosterReport(data) {
  return request({
    url: "/api/rosterFlight/selectCrewRosterReport",
    method: "get",
    params: data,
  });
}

// 新版日历
export async function selectPortalCalendar(data) {
  return request({
    url: "/api/rosterFlight/selectPortalCalendar",
    method: "get",
    data,
  });
}

// // 门户右侧，点击日历详情
// export async function selectPortalCalendarDetail(data) {
//   return request({
//     url: '/api/rosterFlight/selectPortalCalendarDetail',
//     method: 'post',
//     data
//   });
// }

export async function selectPortalCalendarDetailAll(data) {
  return request({
    url: "/api/rosterFlight/selectPortalCalendarDetailAll",
    method: "GET",
    data,
  });
}

// 门户新版Roster总和
export async function selectPortalCalendarTotal(data) {
  return request({
    url: "/api/rosterFlight/selectPortalCalendarTotal",
    method: "get",
    params: data,
  });
}

// IT版本报告
export async function selectITVersionReport(params) {
  return request({
    url: "/api/rosterFlight/selectRosterReport",
    method: "get",
    params,
  });
}
// portal端航后数据详情 flight-log
export async function selectInfo(fltId) {
  return request({
    url: `/api/portal/flightLog/selectInfo?fltId=${fltId}`,
    method: "get",
  });
}

// 上传附件
export async function uploadFile(data) {
  return request({
    url: `/api/file/uploadFile`,
    method: "post",
    data,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

// 提交 flight-log
export async function submitFlightLog(data) {
  return request({
    url: `/api/portal/flightLog/submitPortal`,
    method: "put",
    data,
  });
}

// 批量查询附件信息
export async function getCompleteFileInfoList(data) {
  return request({
    url: "/api/file/getCompleteFileInfoList",
    method: "get",
    params: data,
  });
}

export async function getQuizresult(data) {
  {
    return request({
      url: "/api/rosterFlight/in/emquiz/quizresult",
      method: "get",
      params: data,
    });
  }
}
