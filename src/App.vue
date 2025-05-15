<script setup>
import PWABadge from "./components/PWABadge.vue";
import HeaderNavbar from "./components/HeaderNavbar.vue";
import { useRoute } from "vue-router";
const route = useRoute();
</script>

<template>
  <HeaderNavbar v-if="route.name != 'Login'" />
  <div class="container-lg pt-md-4 pt-2 pb-4 px-3 overflow-auto">
    <RouterView />
    <PWABadge />
  </div>

  <!-- <HelloWorld msg="roster" /> -->
</template>

<style scoped>
/* .logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
} */
</style>
