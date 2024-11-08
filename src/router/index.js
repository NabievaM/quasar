import { createRouter, createWebHistory } from "vue-router";
import { useStore } from "../stores/useStore";
import Cookies from "js-cookie";

const routes = [
  {
    path: "/",
    component: () => import("../pages/Home.vue"),
  },
  {
    path: "/login",
    component: () => import("../pages/LoginPage.vue"),
  },
  {
    path: "/admin",
    component: () => import("../pages/Admin.vue"),
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const store = useStore();
  const isAuth = Cookies.get("auth");

  if (to.meta.requiresAuth) {
    if (isAuth === "true") {
      next();
    } else {
      next({ path: "/login" });
    }
  } else {
    next();
  }
});

export default router;
