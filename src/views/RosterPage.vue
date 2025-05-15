<template>
  <div class="d-flex mb-2">
    <roster-switch-button
      @click="isCalender = !isCalender"
    ></roster-switch-button>
  </div>
  <roster-calender :calender="rosterStore.roster" v-if="isCalender">
    <!-- <template #switch-button>
      <roster-switch-button
        @click="isCalender = !isCalender"
      ></roster-switch-button> </template> -->
  </roster-calender>
  <roster-card-group :calender="rosterStore.roster" v-else>
    <template #switch-button>
      <roster-switch-button
        @click="isCalender = !isCalender"
      ></roster-switch-button>
    </template>
  </roster-card-group>
</template>

<script setup>
import RosterCalender from "../components/RosterCalender.vue";
import RosterCardGroup from "../components/RosterCardGroup.vue";

import { ref, onMounted, onBeforeMount } from "vue";
import { useWindowSize } from "@vueuse/core";
import RosterSwitchButton from "../components/RosterSwitchButton.vue";
import { useRosterStore } from "../store/roster";

const rosterStore = useRosterStore();

let isCalender = ref(true);
const { width, height } = useWindowSize();

onBeforeMount(async () => {
  if (width.value < 768) {
    isCalender.value = false;
  } else {
    isCalender.value = true;
  }
});
onMounted(async () => {
  await rosterStore.initRoster();
});
</script>

<style lang="scss" scoped></style>
