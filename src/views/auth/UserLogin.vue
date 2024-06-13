<template>
  <div>
    <h3>Login Page</h3>
    <hr />
    <form @submit.prevent="login()">
      <div>
        <label for="email">Email</label>
        <input id="email" type="text" v-model="user.email" />
        <div class="error" v-if="errors?.email">{{ errors?.email }}</div>
      </div>
      <div>
        <label for="pass">Password</label>
        <input id="pass" type="password" v-model="user.password" />
        <div class="error" v-if="errors?.password">{{ errors?.password }}</div>
      </div>
      <button type="submit">Login</button>
    </form>
    <div>
      <router-link to="/signup">go to Signup </router-link>
    </div>
    {{ name }}
  </div>
</template>
<script>
import LoginService from "@/services/LoginService";
import { mapState } from "vuex";

export default {
  data() {
    return {
      user: {
        email: "",
        password: "",
      },
      errors: [],
    };
  },
  methods: {
    login() {
      const loginService = new LoginService(this.user);
      this.errors = loginService.checkValidations();
      if (this.errors.length) {
        return false;
      }
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
