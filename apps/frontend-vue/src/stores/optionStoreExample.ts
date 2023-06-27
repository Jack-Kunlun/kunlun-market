import { defineStore } from "pinia";

/**
 * 定义一个Option Store
 */
export const useOptionStore = defineStore("counter", {
  state: () => ({ count: 0 }),
  getters: {
    double: (state) => state.count * 2,
  },
  actions: {
    increment() {
      this.count++;
    },
  },
  persist: true,
});
