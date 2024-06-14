<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->
  <div>
    <div v-if="isLoading" class="loading-box">
      <LoaderSpin />
    </div>
    <router-view v-else />
  </div>
</template>

<script>
import LoaderSpin from "@/components/icons/LoaderSpin.vue";
import { mapState } from "vuex";
export default {
  name: "App",
  components: {
    LoaderSpin,
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
