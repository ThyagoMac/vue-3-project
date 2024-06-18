<template>
  <div>
    <h1>Login Page</h1>
    <hr />
    <div v-if="pageError" class="alert-error">{{ pageError }}</div>
    <form @submit.prevent="goLogin()">
      <div>
        <label for="email">Email</label>
        <input id="email" type="text" v-model.trim="user.email" />
        <div class="error" v-if="errors?.email">{{ errors?.email }}</div>
      </div>
      <div>
        <label for="pass">Password</label>
        <input id="pass" type="password" v-model.trim="user.password" />
        <div class="error" v-if="errors?.password">{{ errors?.password }}</div>
      </div>
      <button type="submit">Login</button>
    </form>
    <div></div>
    {{ name }}
  </div>
</template>
<script>
import LoginService from "@/services/LoginService";
import { IS_LOADING_SHOW, LOGIN_ACTION } from "@/store/storeconstants";
import { mapActions, mapMutations, mapState } from "vuex";

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
      login: LOGIN_ACTION,
    }),
    ...mapMutations({ isLoading: IS_LOADING_SHOW }),

    async goLogin() {
      this.errors = {};
      this.pageError = "";
      const loginService = new LoginService(this.user);
      this.errors = loginService.checkValidations();

      if ("email" in this.errors || "password" in this.errors) {
        return false;
      }

      //loading
      this.isLoading(true);

      //login attempt
      await this.login(this.user)
        .then(() => {
          this.isLoading(false);
          this.$router.replace("/posts");
        })
        .catch((error) => {
          const errorMessage = error?.response?.data?.error?.errors[0]?.message;

          this.isLoading(false);
          if (errorMessage) {
            if (
              !errorMessage.toLowerCase().includes("password") &&
              !errorMessage.toLowerCase().includes("email")
            ) {
              this.pageError = error;
              return;
            }

            if (errorMessage.toLowerCase().includes("email")) {
              this.errors.email = error;
            }
            if (errorMessage.toLowerCase().includes("password")) {
              this.errors.password = error;
            }
          }
        });
    },
  },
  computed: {
    ...mapState("auth", {
      name: (state) => state.name,
    }),
  },
};
</script>
<style></style>
