<template>
  <div
    class="row row-cols-1 g-4 mb-3"
    v-for="(roster, key) in calender"
    :ref="key"
    :key="key"
  >
    <div class="col">
      <roster-duty-card-item
        v-for="(duty, index) in roster.duties"
        :isToday="isToday(key)"
        :duty="duty"
        :meta="roster.meta"
        :key="index"
      >
        <template #missions>
          <div class="row row-cols-1 row-cols-md-2 g-2">
            <div
              class="col"
              v-for="mission in getMissionsInDuty(duty)"
              :key="mission.id"
            >
              <roster-card-item :mission="mission"></roster-card-item>
            </div>
          </div>
        </template>
      </roster-duty-card-item>
    </div>
  </div>

  <div class="d-flex position-fixed bottom-0 end-0 me-3 mb-4">
    <slot name="switch-button"></slot>
    <float-button class="btn-primary me-2 ms-2" @click="scrollTo(todayDutyRef)"
      ><template #icon
        ><svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-crosshair"
          viewBox="0 0 16 16"
        >
          <path
            d="M8.5.5a.5.5 0 0 0-1 0v.518A7 7 0 0 0 1.018 7.5H.5a.5.5 0 0 0 0 1h.518A7 7 0 0 0 7.5 14.982v.518a.5.5 0 0 0 1 0v-.518A7 7 0 0 0 14.982 8.5h.518a.5.5 0 0 0 0-1h-.518A7 7 0 0 0 8.5 1.018zm-6.48 7A6 6 0 0 1 7.5 2.02v.48a.5.5 0 0 0 1 0v-.48a6 6 0 0 1 5.48 5.48h-.48a.5.5 0 0 0 0 1h.48a6 6 0 0 1-5.48 5.48v-.48a.5.5 0 0 0-1 0v.48A6 6 0 0 1 2.02 8.5h.48a.5.5 0 0 0 0-1zM8 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4"
          />
        </svg> </template
    ></float-button>
    <float-button class="btn-primary" @click="backToTop">
      <template #icon>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-arrow-up-circle-fill"
          viewBox="0 0 16 16"
        >
          <path
            d="M16 8A8 8 0 1 0 0 8a8 8 0 0 0 16 0m-7.5 3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707z"
          />
        </svg>
      </template>
    </float-button>
  </div>
</template>

<script setup>
import { defineProps, useTemplateRef, watchEffect } from "vue";
import RosterCardItem from "./RosterCardItem.vue";
import moment from "moment";
import FloatButton from "./FloatButton.vue";
import { getMissionsInDuty, isToday } from "../utils/roster";
import RosterDutyCardItem from "./RosterDutyCardItem.vue";

const props = defineProps({
  calender: Object,
});
let now = moment();
const todayDutyRef = useTemplateRef(now.format("YYYY-MM-DD"));

watchEffect(() => {
  if (todayDutyRef.value) {
    scrollTo(todayDutyRef.value);
  }
});

function scrollTo(view) {
  view[0].scrollIntoView({ behavior: "smooth", block: "center" });
}

function backToTop() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}
</script>

<style lang="scss" scoped></style>
