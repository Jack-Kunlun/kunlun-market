import { defineStore } from "pinia";
import { ref, computed } from "vue";

/**
 * 定义一个Setup Store
 * 建议统一使用Setup Store
 */
export const useCounterStore = defineStore(
  "counter",
  () => {
    const count = ref(0);
    const test = ref("hello pinia");
    const doubleCount = computed(() => count.value * 2);

    function increment() {
      count.value++;
    }

    return { count, test, doubleCount, increment };
  },
  {
    /**
     * 开启数据缓存
     * 默认将数据存放在浏览器的LocalStorage中，key为store的名称，value为该store中所有的数据
     */
    persist: {
      /**
       * 用于存储状态的键。默认为store的名称。
       */
      // key: "counter-test",
      /**
       * 用于部分保留状态的点符号路径数组。[]意味着没有状态被持久化，undefined或者null意味着整个状态被持久化。
       */
      // paths: ["count", "test"],
      /**
       * 存储位置，默认值为localStorage，可以设置为sessionStorage
       */
      // storage: sessionStorage,
      /**
       * 自定义序列化程序，用于在持久化之前序列化数据，并在恢复存储之前反序列化数据。
       */
      // serializer: {
      //   deserialize: parse,
      //   serialize: stringify,
      // },
      /**
       * 调试模式
       * 当设置为 true 时，持久/水合存储时可能发生的任何错误都将记录为console.error.
       */
      // debug: true,
    },
  }
);
