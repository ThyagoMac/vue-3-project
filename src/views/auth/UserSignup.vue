<template>
  <div>
    <h3>Signup Page</h3>
    <div v-if="pageError" class="alert-error">{{ pageError }}</div>
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
import { SIGNUP_ACTION } from "@/store/storeconstants";
import { mapActions } from "vuex";

export default {
  data() {
    return {
      user: {
        email: "",
        password: "",
      },
      errors: {},
      pageError: "",
    };
  },
  methods: {
    ...mapActions("auth", {
      signup: SIGNUP_ACTION,
    }),

    async goSignup() {
      this.errors = {};
      this.pageError = "";
      const loginService = new LoginService(this.user);
      this.errors = loginService.checkValidations();

      if ("email" in this.errors || "password" in this.errors) {
        return false;
      }

      //signup regist
      await this.signup(this.user).catch((error) => {
        if (
          !error.toLowerCase().includes("password") &&
          !error.toLowerCase().includes("email")
        ) {
          this.pageError = error;
          return;
        }

        if (error.toLowerCase().includes("email")) {
          this.errors.email = error;
        }
        if (error.toLowerCase().includes("password")) {
          this.errors.password = error;
        }
      });
    },
  },
};
</script>
<style></style>
