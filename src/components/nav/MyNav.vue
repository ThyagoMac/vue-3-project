<template>
  <div>
    <nav class="bg-white border-gray-200 dark:bg-gray-900">
      <div
        class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4"
      >
        <a
          href="https://vuejs.org/guide/introduction.html"
          class="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img src="../../assets/logo.png" class="h-8" alt="Flowbite Logo" />
          <span
            class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"
          >
            Vue.js 3 project
          </span>
        </a>
        <div class="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul
            class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700"
          >
            <li>
              <router-link
                v-if="isUserAuth"
                to="/"
                class="block py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                :class="{
                  'dark:text-blue-500': currentPageName === 'home',
                  'dark:text-white': currentPageName !== 'home',
                }"
              >
                Home
              </router-link>
            </li>

            <li>
              <router-link
                v-if="isUserAuth"
                to="/posts"
                class="block py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                :class="{
                  'dark:text-blue-500': currentPageName === 'posts',
                  'dark:text-white': currentPageName !== 'posts',
                }"
              >
                Post
              </router-link>
            </li>
            <li>
              <router-link
                v-if="isUserAuth"
                to="/todos"
                class="block py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                :class="{
                  'dark:text-blue-500': currentPageName === 'todos',
                  'dark:text-white': currentPageName !== 'todos',
                }"
              >
                Todos
              </router-link>
            </li>
            <li>
              <router-link
                v-if="!isUserAuth"
                to="/login"
                class="block py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                :class="{
                  'dark:text-blue-500': currentPageName === 'login',
                  'dark:text-white': currentPageName !== 'login',
                }"
              >
                Login
              </router-link>
            </li>
            <li>
              <router-link
                v-if="!isUserAuth"
                to="/signup"
                class="block py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                :class="{
                  'dark:text-blue-500': currentPageName === 'signup',
                  'dark:text-white': currentPageName !== 'signup',
                }"
              >
                Signup
              </router-link>
            </li>
            <li>
              <button
                v-if="isUserAuth"
                class="block py-2 px-3 dark:text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                @click.prevent="goLogout()"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <hr />
    <br />
  </div>
</template>
<script>
import {
  IS_USER_AUTHENTICATE_GETTER,
  LOGOUT_ACTION,
} from "@/store/storeconstants";
import { mapActions, mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters("auth", {
      isUserAuth: IS_USER_AUTHENTICATE_GETTER,
    }),
    currentPageName() {
      return this.$route.name;
    },
  },
  methods: {
    ...mapActions("auth", {
      logout: LOGOUT_ACTION,
    }),
    goLogout() {
      this.logout();
      this.$router.replace("/login");
    },
  },
};
</script>
<style scoped></style>
