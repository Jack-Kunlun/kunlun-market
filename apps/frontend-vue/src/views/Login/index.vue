<script setup lang="ts">
import { useRouter } from "vue-router";
import { useStore } from "@/stores";

const { counter } = useStore();
const count = ref(0);

const router = useRouter();

const goHome = () => {
  router.push("/home");
};
</script>

<template>
  <div class="full p-lg">
    Login

    <div class="text-grey">{{ count }}</div>

    <div>pinia count: {{ counter.count }}</div>

    <a-space>
      <a-button type="primary" @click="goHome">go Home</a-button>
      <a-button danger type="primary" @click="count++">count++</a-button>
      <a-button danger type="primary" @click="counter.increment">pinia count++</a-button>
    </a-space>
  </div>
</template>
