<template>
  <div>
    <h3>Signup Page</h3>
    <div v-if="error" class="alert-error">{{ error }}</div>
    <form @submit.prevent="goSignup">
      <div>
        <label for="email">Email</label>
        <input id="email" type="text" v-model.trim="user.email" />
        <div class="error" v-if="errors?.email">{{ errors?.email }}</div>
      </div>
      <div>
        <label for="password">Password</label>
        <input id="password" type="password" v-model.trim="user.password" />
        <div class="error" v-if="errors?.password">{{ errors?.password }}</div>
      </div>
      <button type="submit">Signup</button>
    </form>
    <router-link to="/login"> go to logis </router-link>
  </div>
</template>
<script>
import LoginService from "@/services/LoginService";
import { IS_LOADING_SHOW, SIGNUP_ACTION } from "@/store/storeconstants";
import { mapActions, mapMutations } from "vuex";

export default {
  data() {
    return {
      user: {
        email: "",
        password: "",
      },
      errors: [],
      error: "",
    };
  },
  methods: {
    ...mapActions("auth", {
      signup: SIGNUP_ACTION,
    }),
    ...mapMutations({ isLoading: IS_LOADING_SHOW }),
    async goSignup() {
      const loginService = new LoginService(this.user);
      this.errors = loginService.checkValidations();

      if ("email" in this.errors || "password" in this.errors) {
        return false;
      }

      //loading
      this.isLoading(true);
      //signup regist
      await this.signup(this.user).catch((error) => {
        this.isLoading(false);
        if (
          !error.toLowerCase().includes("password") &&
          !error.toLowerCase().includes("email")
        ) {
          this.error = error;
          return;
        }

        if (error.toLowerCase().includes("email")) {
          this.errors.email = error;
        }
        if (error.toLowerCase().includes("password")) {
          this.errors.password = error;
        }
      });

      this.isLoading(false);
    },
  },
};
</script>
<style></style>
