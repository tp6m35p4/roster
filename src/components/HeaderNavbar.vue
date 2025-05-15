<template>
  <header class="sticky-top">
    <nav class="navbar navbar-expand-lg" style="background-color: #f8ca6f">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">Roster</a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#headerLink"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
          @click="isNavbarVisable = !isNavbarVisable"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div
          class="navbar-collapse"
          :class="isNavbarVisable ? '' : 'collapse'"
          id="headerLink"
        >
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <!-- <a class="nav-link active" aria-current="page" href="#">Home</a> -->
              <header-router-link to="/">Home</header-router-link>
            </li>
            <!-- <li class="nav-item">
              <header-router-link to="/flightlog"
                >Flight Log</header-router-link
              >
            </li> -->
            <li class="nav-item">
              <header-router-link to="/about">About</header-router-link>
            </li>
            <!-- <li class="nav-item">
              <a class="nav-link" href="#">Link</a>
            </li> -->
            <!-- <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Dropdown
              </a>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="#">Action</a></li>
                <li><a class="dropdown-item" href="#">Another action</a></li>
                <li><hr class="dropdown-divider" /></li>
                <li>
                  <a class="dropdown-item" href="#">Something else here</a>
                </li>
              </ul>
            </li> -->
            <!-- <li class="nav-item">
              <a class="nav-link disabled" aria-disabled="true">Disabled</a>
            </li> -->
          </ul>
          <div class="d-flex">
            <span class="navbar-text me-2">
              {{ authStore.user.userName }}
            </span>
            <button
              type="button"
              class="btn btn-outline-secondary"
              @click="authStore.logout()"
            >
              Logout
            </button>
          </div>
          <!-- <form class="d-flex" role="search">
            <input
              class="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button class="btn btn-outline-success" type="submit">
              Search
            </button>
          </form> -->
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { ref } from "vue";
import HeaderRouterLink from "./HeaderRouterLink.vue";
import { useAuthStore } from "../store/auth";
let isNavbarVisable = ref(false);
const authStore = useAuthStore();
</script>

<style lang="scss" scoped></style>
