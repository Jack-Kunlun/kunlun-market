import { useCounterStore } from "./counter";
import { useUserStore } from "./user";

export const useStore = () => {
  const counter = useCounterStore();
  const userStore = useUserStore();

  /**
   * 重置所有的store
   */
  const resetStore = () => {
    counter.$reset();
    userStore.$reset();
  };

  return { counter, userStore, resetStore };
};
