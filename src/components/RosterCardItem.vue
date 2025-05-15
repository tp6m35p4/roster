<template>
  <div class="card" v-if="missionIsShow(mission)">
    <div
      class="card-header d-flex align-items-center px-2"
      :class="{ rounded: !isShow }"
      @click="isShow = !isShow"
    >
      <div class="me-auto px-1">
        {{ mission.fltNum }}: {{ mission.dep }} - {{ mission.arp }}
      </div>
      <div class="px-1">
        <span class="me-1">
          {{ mission.fltStartTime }} ~
          {{ mission.fltEndTime }}
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-chevron-down"
          viewBox="0 0 16 16"
        >
          <path
            fill-rule="evenodd"
            d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"
          />
        </svg>
      </div>
    </div>
    <div class="card-body" v-show="isShow">
      <h5 class="card-title"></h5>
      <p class="card-text">
        {{ mission.register }}
      </p>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Pos</th>
            <th scope="col">Name</th>
            <th scope="col">ID</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(crew, index) in mission.portalCalendarDetailCrewInfoVos"
            :key="index"
          >
            <th scope="row">{{ crew.actingRank }}</th>
            <td>{{ crew.crewName }}</td>
            <td>{{ crew.crewId }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { defineProps, ref } from "vue";
import { missionIsShow } from "../utils/roster";
const props = defineProps({
  mission: {
    type: Object,
    required: true,
  },
});
const isShow = ref(false);
</script>

<style lang="scss" scoped></style>
