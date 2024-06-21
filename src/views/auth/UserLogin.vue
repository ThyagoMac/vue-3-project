<template>
  <div>
    <div
      class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8"
    >
      <div class="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2
          class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900"
        >
          Login to your account
        </h2>
      </div>

      <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <div
          v-if="pageError"
          class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50"
          role="alert"
        >
          <!-- <span class="font-medium">Danger alert!</span> -->
          {{ pageError }}
        </div>

        <form class="space-y-6" @submit.prevent="onLogin()">
          <div>
            <label
              for="email"
              class="block text-sm font-medium leading-6 text-gray-900"
            >
              Email
            </label>
            <div class="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autocomplete="email"
                required
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                v-model.trim="user.email"
              />
            </div>
            <div class="error text-red-600" v-if="errors?.email">
              {{ errors?.email }}
            </div>
          </div>

          <div>
            <div class="flex items-center justify-between mt-2">
              <label
                for="password"
                class="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
              <div class="text-sm">
                <!-- <a
                    href="#"
                    class="font-semibold text-indigo-600 hover:text-indigo-500"
                    >Forgot password?</a
                  > -->
              </div>
            </div>
            <div class="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autocomplete="current-password"
                required
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                v-model.trim="user.password"
              />
            </div>
            <div class="error text-red-600" v-if="errors?.password">
              {{ errors?.password }}
            </div>
          </div>

          <button
            type="submit"
            class="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Login
          </button>
        </form>
      </div>
    </div>
    <!-- <hr />
    <div></div>
    {{ name }} -->
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

    async onLogin() {
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

          if (error) {
            this.pageError = error;
          }

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
