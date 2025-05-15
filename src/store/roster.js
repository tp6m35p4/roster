import { defineStore, acceptHMRUpdate } from "pinia";
import { ref } from "vue";

import { parseRosterCalender } from "../utils/roster";
import { useAuthStore } from "./auth";
import { selectPortalCalendarDetailAll } from "../api/roster";
import moment from "moment";
export const useRosterStore = defineStore(
  "roster",
  () => {
    const roster = ref({});
    async function initRoster(s = null, e = null) {
      const authStore = useAuthStore();
      // let r = await getRosterCalender();
      let startDate = s
        ? moment(s).format("YYYY-MM-DDTHH:mm:ss")
        : moment()
            .subtract(1, "months")
            .startOf("month")
            .format("YYYY-MM-DDTHH:mm:ss");
      let endDate = e
        ? moment(e).format("YYYY-MM-DDTHH:mm:ss")
        : moment()
            .add(1, "months")
            .endOf("month")
            .format("YYYY-MM-DDTHH:mm:ss");
      try {
        let resDetail = await selectPortalCalendarDetailAll({
          crewId: authStore.user.userCode,
          startDateTime: startDate,
          endDateTime: endDate,
        });
        if (resDetail) {
          roster.value = parseRosterCalender(resDetail.data);
        }
      } catch (error) {
        console.error(error);
      }
    }

    return { roster, initRoster };
  },
  {
    persist: true,
  }
);
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useRosterStore, import.meta.hot));
}
