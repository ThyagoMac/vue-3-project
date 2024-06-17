<template>
  <div>
    NAV
    <router-link v-if="isUserAuth" to="/">| Home | </router-link>
    <router-link v-if="isUserAuth" to="/posts">Post | </router-link>
    <router-link v-if="!isUserAuth" to="/login"> Login | </router-link>
    <router-link v-if="!isUserAuth" to="/signup">Signup | </router-link>
    <hr />
    <br />
  </div>
</template>
<script>
import { IS_USER_AUTHENTICATE_GETTER } from "@/store/storeconstants";
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters("auth", {
      isUserAuth: IS_USER_AUTHENTICATE_GETTER,
    }),
  },
};
</script>
<style scoped></style>
