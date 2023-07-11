<script setup lang="ts">
import { useRouter } from "vue-router";
import HelloWorld from "@/components/HelloWorld.vue";
import { useStore } from "@/stores";

const router = useRouter();
const {
  counter,
  userStore: { userInfo },
} = useStore();
</script>

<template>
  <div class="full">
    Home

    <div>pinia count: {{ counter.count }}</div>

    <div>userInfo: {{ userInfo.realName }}</div>

    <HelloWorld msg="666" />

    <a-button type="primary" @click="router.push('/login')">go login</a-button>
  </div>
</template>
