<script setup lang="ts">
import type { MenuProps } from "ant-design-vue";
import { ref } from "vue";
import { RouterView, useRouter } from "vue-router";
import LogoSvg from "@/assets/svg/logo.svg";
import { useStore } from "@/stores";

const {
  userStore: { userInfo },
  resetStore,
} = useStore();
const router = useRouter();

const selectedKeys = ref<string[]>(["2"]);

const clickMenu: MenuProps["onClick"] = ({ key }) => {
  switch (key) {
    case "0":
      break;
    case "1":
      localStorage.removeItem("token");
      resetStore();
      router.push("/login");
      break;
    default:
      break;
  }
};
</script>

<template>
  <a-layout class="full">
    <a-layout-header class="!bg-gradientPink flex items-center px-lg">
      <img class="flex" w="100px" :src="LogoSvg" alt="加载中" />

      <a-menu
        v-model:selectedKeys="selectedKeys"
        class="flex-1 mx-lg border-b-none bg-transparent"
        mode="horizontal"
        h-64
      >
        <a-menu-item key="1">nav 1</a-menu-item>
        <a-menu-item key="2">nav 2</a-menu-item>
        <a-menu-item key="3">nav 3</a-menu-item>
      </a-menu>

      <a-dropdown :trigger="['click']">
        <a-avatar class="bg-green cursor-pointer" :size="48">{{ userInfo.realName }}</a-avatar>
        <template #overlay>
          <a-menu @click="clickMenu">
            <a-menu-item key="0">用户设置</a-menu-item>
            <a-menu-divider />
            <a-menu-item key="1">退出登录</a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </a-layout-header>

    <a-layout-content class="px-lg py-sm flex">
      <div class="flex-1">
        <RouterView />
      </div>
    </a-layout-content>

    <a-layout-footer class="text-center"> Kunlun Market </a-layout-footer>
  </a-layout>
</template>

<style scoped></style>
