import { defineStore } from "pinia";
import { ref } from "vue";

interface UserInfo {
  id: number;
  username: string;
  realName: string;
  phone: string;
  email: string;
  roleId: number;
}

export const useUserStore = defineStore(
  "user",
  () => {
    const userInfo = ref<UserInfo>({
      id: 0,
      username: "",
      realName: "",
      phone: "",
      email: "",
      roleId: 0,
    });

    const setUserInfo = (data: UserInfo) => (userInfo.value = data);

    return { userInfo, setUserInfo };
  },
  {
    persist: {},
  }
);
