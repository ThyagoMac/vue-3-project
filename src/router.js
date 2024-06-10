import { createRouter, createWebHistory } from "vue-router";
import UserLogin from "@/views/auth/UserLogin.vue";
import UserSignup from "@/views/auth/UserSignup.vue";

const routes = [
  {
    path: "/login",
    component: UserLogin,
  },
  {
    path: "/signup",
    component: UserSignup,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
