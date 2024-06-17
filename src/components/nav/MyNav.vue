<template>
  <div>
    NAV
    <router-link v-if="isUserAuth" to="/">| Home | </router-link>
    <router-link v-if="isUserAuth" to="/posts">Post | </router-link>
    <router-link v-if="!isUserAuth" to="/login"> Login | </router-link>
    <router-link v-if="!isUserAuth" to="/signup">Signup | </router-link>

    <button v-if="isUserAuth" @click.prevent="goLogout()">Logout ></button>
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
