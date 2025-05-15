<template>
  <div class="card" :class="{ 'border-warning border-3': isToday }">
    <div class="card-header d-flex align-items-center px-2">
      <div class="me-auto p-2">
        <span
          class="badge fs-6"
          :style="{
            backgroundColor: meta[4],
          }"
          >{{ meta[0] }}</span
        >
      </div>
      <div class="p-2">
        {{ moment(meta[1]).format("YYYY-MM-DD") }}
        {{ moment(meta[1]).format("HH:mm") }} ~
        {{ moment(meta[2]).format("HH:mm") }}
      </div>
    </div>
    <div class="card-body p-2 p-md-3">
      <slot name="missions"></slot>
    </div>
  </div>
</template>

<script setup>
import moment from "moment";
import { defineProps } from "vue";

const props = defineProps({
  duty: {
    type: Object,
    required: true,
  },
  isToday: {
    type: Boolean,
    default: false,
  },
  meta: {
    type: Array,
    default: () => [],
  },
});
</script>

<style lang="scss" scoped></style>
