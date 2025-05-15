<template>
  <div class="mb-3">
    <div class="col text-center">
      <h2>{{ now.format("MMM") }} {{ now.format("YYYY") }}</h2>
      <button
        tpye="button"
        class="btn btn-outline-primary btn-sm me-2"
        @click="prevMonth"
      >
        Previous
      </button>
      <button tpye="button" class="btn btn-primary btn-sm" @click="nextMonth">
        Next
      </button>
    </div>
  </div>
  <div class="mb-3 d-flex flex-wrap">
    <div class="text-center day" v-for="day in daysOfWeek" :key="day">
      <strong>{{ day }}</strong>
    </div>
  </div>
  <div class="d-flex flex-wrap">
    <div
      class="card day text-center"
      v-for="(day, index) in calendarDays"
      :key="index"
      :class="{
        'bg-light': day.isCurrentMonth,
        'text-muted': !day.isCurrentMonth,
        'border-warning border-2 border-md-3':
          day.isCurrentMonth && isToday(day.date),
      }"
      @click="showModal(day.date)"
    >
      <div class="card-header p-0 p-md-2">
        {{ day.date.format("Do") }}
      </div>
      <div
        class="card-body text-center py-md-3 px-0 py-1"
        v-if="calender[day.date.format('YYYY-MM-DD')]"
      >
        <span
          class="badge mb-1 mb-md-2"
          :style="{
            backgroundColor: calender[day.date.format('YYYY-MM-DD')].meta[4],
          }"
          >{{ calender[day.date.format("YYYY-MM-DD")].meta[0] }}</span
        >
        <p class="card-text lh-1">
          {{
            moment(calender[day.date.format("YYYY-MM-DD")].meta[1]).format(
              "HH:mm"
            )
          }}
          -
          {{
            moment(calender[day.date.format("YYYY-MM-DD")].meta[2]).format(
              "HH:mm"
            )
          }}
        </p>
      </div>
    </div>
  </div>
  <div class="d-flex position-fixed bottom-0 end-0 me-3 mb-4">
    <slot name="switch-button"></slot>
  </div>
  <roster-modal :roster="modalRoster" ref="modal"></roster-modal>
</template>

<script setup>
import moment from "moment";
import { onMounted, ref, useTemplateRef } from "vue";
import RosterModal from "./RosterModal.vue";
import { isToday } from "../utils/roster";

const props = defineProps({
  calender: Object,
});
let now = moment();
const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let calendarDays = ref({});
let rosterModalRef = useTemplateRef("modal");
let modalRoster = ref({});
function updateCalendarDays() {
  const startOfMonth = now.clone().startOf("month");
  const endOfMonth = now.clone().endOf("month");
  const startDay = startOfMonth.day();
  const daysInMonth = endOfMonth.date();

  const days = [];

  // Add days from the previous month
  for (let i = startDay - 1; i >= 0; i--) {
    const date = startOfMonth.clone().subtract(i + 1, "days");
    days.push({ date, isCurrentMonth: false });
  }

  // Add days from the current month
  for (let i = 1; i <= daysInMonth; i++) {
    days.push({
      date: startOfMonth.clone().date(i),
      isCurrentMonth: true,
    });
  }

  // Add days from the next month to fill the row
  const remainingDays = 7 - (days.length % 7);
  if (remainingDays < 7) {
    for (let i = 1; i <= remainingDays; i++) {
      const date = endOfMonth.clone().add(i, "days");
      days.push({ date, isCurrentMonth: false });
    }
  }

  return days;
}

onMounted(() => {
  calendarDays.value = updateCalendarDays();
});

function prevMonth() {
  now.subtract(1, "month");
  calendarDays.value = updateCalendarDays();
}

function nextMonth() {
  now.add(1, "month");
  calendarDays.value = updateCalendarDays();
}

function showModal(date) {
  modalRoster.value = props.calender[date.format("YYYY-MM-DD")];
  rosterModalRef.value.showModal();
}
</script>

<style scoped>
.day {
  width: 14.28%;
}
</style>
