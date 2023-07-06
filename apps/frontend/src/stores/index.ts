import { useCounterStore } from "./counter";

export const useStore = () => {
  return { counter: useCounterStore() };
};
