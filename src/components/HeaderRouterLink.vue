<template>
  <router-link v-bind="$props" custom v-slot="{ isActive, href, navigate }">
    <a
      v-bind="$attrs"
      class="nav-link"
      aria-current="page"
      :href="href"
      @click="navigate"
      :class="isActive ? 'active' : ''"
      ><slot></slot>
    </a>
  </router-link>
</template>

<script setup>
import { RouterLink } from "vue-router";
const props = defineProps({
  // add @ts-ignore if using TypeScript
  ...RouterLink.props,
});
</script>

<style lang="scss" scoped></style>
