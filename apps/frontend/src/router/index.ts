import { message } from "ant-design-vue";
import { createRouter, createWebHistory } from "vue-router";
import BasicLayout from "@/layouts/BasicLayout.vue";

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "root",
      redirect: "/home",
      component: BasicLayout,
      children: [
        {
          path: "/home",
          name: "home",
          meta: {
            title: "首页",
          },
          component: () => import("@/views/Home/index.vue"),
        },
      ],
    },
    {
      path: "/login",
      name: "login",
      meta: {
        title: "登录",
      },
      component: () => import("@/views/Login/index.vue"),
    },
    {
      path: "/register",
      name: "register",
      meta: {
        title: "注册",
      },
      component: () => import("@/views/Register/index.vue"),
    },
  ],
});

const whiteList = ["/login", "/register"];

/**
 * 全局前置路由守卫，每一次路由跳转前都进入这个 beforeEach 函数
 */
router.beforeEach((to, _, next) => {
  window.document.title = (to.meta.title as unknown as string) || "KunlunMarket";

  if (whiteList.includes(to.path)) {
    next();
  } else {
    const token = localStorage.getItem("token");

    if (!token) {
      message.error("您还没有登录，请先登录");
      next("/login");
    } else {
      next();
    }
  }
});
