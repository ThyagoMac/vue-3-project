<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->
  <div>
    <div v-show="isLoading" class="loading-box">
      <LoaderSpin />
    </div>
    <MyNav />
    <router-view v-show="!isLoading" />
  </div>
</template>

<script>
import LoaderSpin from "@/components/icons/LoaderSpin.vue";
import MyNav from "@/components/nav/MyNav.vue";
import { mapState } from "vuex";
import { AUTO_LOGIN_ACTION } from "./store/storeconstants";
export default {
  name: "App",
  components: {
    LoaderSpin,
    MyNav,
  },
  created() {
    this.$store.dispatch(`auth/${AUTO_LOGIN_ACTION}`);
  },
  computed: {
    ...mapState({
      isLoading: (state) => state.isLoading,
      autoLogout: (state) => state.auth.autoLogout,
    }),
  },
  watch: {
    autoLogout(newVal) {
      if (newVal) {
        this.$router.replace("/login");
      }
    },
  },
};
</script>

<style>
.loading-box {
  position: fixed;
  top: 35%;
  left: 0px;
  right: 0px;
  width: 10%;
  margin: auto;
  text-align: center;
}
</style>
