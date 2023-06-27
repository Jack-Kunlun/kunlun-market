<script setup lang="ts">
import { useRouter } from "vue-router";

const count = ref(0);

const router = useRouter();

const goHome = () => {
  router.push("/home");
};
</script>

<template>
  <div class="full">
    Login

    <div class="text-grey">{{ count }}</div>

    <a-button type="primary" @click="goHome">go Home</a-button>
    <a-button danger type="primary" @click="count++">go Home</a-button>
  </div>
</template>
