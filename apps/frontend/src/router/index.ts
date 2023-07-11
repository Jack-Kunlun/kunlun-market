import { createRouter, createWebHistory } from "vue-router";
import BasicLayout from "@/layouts/BasicLayout.vue";

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "root",
      redirect: "/login",
      component: BasicLayout,
      children: [
        {
          path: "/home",
          name: "home",
          meta: {
            title: "home",
            // icon: "HomeFilled",
          },
          component: () => import("@/views/Home/index.vue"),
        },
      ],
    },
    {
      path: "/login",
      name: "login",
      meta: {
        title: "login",
      },
      component: () => import("@/views/Login/index.vue"),
    },
    {
      path: "/register",
      name: "register",
      meta: {
        title: "register",
      },
      component: () => import("@/views/Register/index.vue"),
    },
  ],
});
