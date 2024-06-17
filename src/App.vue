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
export default {
  name: "App",
  components: {
    LoaderSpin,
    MyNav,
  },
  computed: {
    ...mapState({
      isLoading: (state) => state.isLoading,
    }),
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
