import { createRouter, createWebHistory } from "vue-router";
import UserLogin from "@/views/auth/UserLogin.vue";
import UserSignup from "@/views/auth/UserSignup.vue";
import Home from "@/views/Home.vue";
import Posts from "@/views/posts/Posts.vue";
import store from "./store/store";

const routes = [
  {
    path: "/login",
    component: UserLogin,
  },
  {
    path: "/signup",
    component: UserSignup,
  },
  { path: "/", component: Home },
  { path: "/posts", component: Posts },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(() => {
  console.log("router.js: ", store);
});

export default router;
