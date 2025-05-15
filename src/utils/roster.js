import moment from "moment";
export const parseRosterCalender = function (raw) {
  //   let res = await selectPortalCalendar({
  //     crewId: authStore.user.userCode,
  //     startDateTime: startDate,
  //     endDateTime: endDate,
  //     type: "c",
  //   });

  // bind data
  let data = {};
  //   for (let i = 0; i < res.data.length; i++) {
  //     let item = res.data[i];
  //     let date = moment(item.startDateTime).format("YYYY-MM-DD");
  //     if (!data[date]) {
  //       data[date] = [];
  //     }
  //     data[date].push(item);
  //   }
  //   for (let i = 0; i < resDetail.data.length; i++) {
  //     let item = resDetail.data[i];
  //     let date = moment(item.startDateTime).format("YYYY-MM-DD");

  //     if (Array.isArray(date[date]) && data[date].length > 0) {
  //       for (let j = 0; j < data[date].length; j++) {
  //         let item2 = data[date][j];
  //         if (item2.id === item.id) {
  //           item2.detail = item;
  //           break;
  //         }
  //       }
  //     }
  //   }
  for (let i = 0; i < raw.length; i++) {
    let item = raw[i];
    let date = moment(item.startDateTime).format("YYYY-MM-DD");
    if (!data[date]) {
      data[date] = { meta: null, duties: [] };
    }

    data[date]["duties"].push(item);
  }
  for (const [key, value] of Object.entries(data)) {
    let meta = extractROISEvents(value.duties[0]);
    if (meta) {
      data[key]["meta"] = meta;
    }
  }
  return data;
};

export const getDutyPeriod = function (duties) {
  let start = "";
  let end = "";
  for (let i = 0; i < duties.length; i++) {
    let item = duties[i];
    if (start === "" || moment(item.startDateTime).isBefore(start)) {
      start = item.startDateTime;
    }
    if (end === "" || moment(item.endDateTime).isAfter(end)) {
      end = item.endDateTime;
    }
  }
  return {
    start: moment(start).format("HH:mm"),
    end: moment(end).format("HH:mm"),
  };
};

function extractROISEvents(duty) {
  const current = duty;
  let event = []; // Duty, Report Datetime, Release Datetime, Description, Color
  try {
    if (current["type"] == "F") {
      let rosInfo = current.portalCalendarDetailRosterInfoVoList[0];
      if (!rosInfo) return false;
      event[0] = `${rosInfo.assignment}`; //-${rosInfo.fltNum}-${rosInfo.dep}-${rosInfo.arp}
      event[3] = current.portalCalendarDetailRosterInfoVoList.reduce(
        (acc, curr) => {
          let crewList = curr.portalCalendarDetailCrewInfoVos.reduce((a, c) => {
            return a + `<li>${c.actingRank}: ${c.crewName} - ${c.crewId}</li>`;
          }, "");
          const description = `${curr.fltNum} ${curr.dep} ${curr.fltStartTime}L - ${curr.arp} ${curr.fltEndTime}L<br><ul>${crewList}</ul>`;
          return acc ? acc + "<br>" + description : description;
        },
        ""
      );
      event[4] = `#${rosInfo.color}`;
    } else if (current["type"] == "G") {
      let rosInfo = current?.portalCalendarDetailRosterGroundInfoVoList[0];
      if (!rosInfo) {
        return false;
      } else {
        event[0] = `${rosInfo.assignment}`; //-${rosInfo.location}-${rosInfo.courseName}
        event[4] = `#${rosInfo.color}`;
      }
    } else {
      return false;
    }
    event[1] = moment(current.startDateTime).format("YYYYMMDDTHHmmss");
    event[2] = moment(current.endDateTime).format("YYYYMMDDTHHmmss");
  } catch (e) {
    console.error(e);
    return false;
  }

  return event;
}

export const getMissionsInDuty = function (duty) {
  try {
    if (duty["type"] == "F") {
      return duty.portalCalendarDetailRosterInfoVoList;
    } else if (duty["type"] == "G") {
      return duty.portalCalendarDetailRosterGroundInfoVoList;
    } else {
      return false;
    }
  } catch (e) {
    console.error(e);
    return false;
  }
};

export const missionIsShow = function (mission) {
  let notShowList = ["DO", "NH", "OFF"];
  if (notShowList.includes(mission.assignment)) {
    return false;
  } else {
    return true;
  }
};

export const isToday = function (date) {
  return moment(date).isSame(moment(), "day");
};
