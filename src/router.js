import { createRouter, createWebHistory } from "vue-router";
import UserLogin from "@/views/auth/UserLogin.vue";
import UserSignup from "@/views/auth/UserSignup.vue";
import Home from "@/views/Home.vue";
import Posts from "@/views/posts/Posts.vue";
import Todos from "@/views/todos/Todos.vue";
import store from "./store/store";
import { IS_USER_AUTHENTICATE_GETTER } from "./store/storeconstants";

const routes = [
  {
    path: "/login",
    name: "login",
    component: UserLogin,
    meta: { auth: false },
  },
  {
    path: "/signup",
    name: "signup",
    component: UserSignup,
    meta: { auth: false },
  },
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/posts",
    name: "posts",
    component: Posts,
    meta: { auth: true },
  },
  {
    path: "/todos",
    name: "todos",
    component: Todos,
    meta: { auth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthRequired = to.meta.auth;
  const isLogged = store.getters[`auth/${IS_USER_AUTHENTICATE_GETTER}`];

  if ("auth" in to.meta) {
    if (isAuthRequired && !isLogged) {
      next("/login");
      return;
    }
    if (!isAuthRequired && isLogged) {
      next("/posts");
      return;
    }
  }
  next();
});

export default router;
