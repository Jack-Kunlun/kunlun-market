<script setup lang="ts">
import { Buffer } from "buffer";
import { message } from "ant-design-vue";
import { reactive, ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { getCaptcha } from "@/apis/common";
import { userDoLogin } from "@/apis/user";
import LogoSvg from "@/assets/svg/logo.svg";

interface FormState {
  username: string;
  password: string;
  code: string;
}

const formState = reactive<FormState>({
  username: "",
  password: "",
  code: "",
});

const captcha = ref("");

const loading = ref(false);
const router = useRouter();

const fetchCaptcha = async () => {
  try {
    const res = await getCaptcha();

    if (res.code === 200) {
      captcha.value = `data:image/svg+xml;base64,${Buffer.from(res.data).toString("base64")}`;
    }
  } catch (error) {
    // throw error;
  }
};

onMounted(() => {
  fetchCaptcha();
});

const onFinish = async (values: FormState) => {
  try {
    loading.value = true;

    const res = await userDoLogin(values);

    if (res.code === 200) {
      localStorage.setItem("token", res.data.token);
      router.push("/home");
    }
  } catch (error: any) {
    message.error(error.message);
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="full flex-center bg-gradientPink">
    <div class="bg-white rounded-md px-12 w-card h-card relative">
      <div class="text-38px h-140 font-semibold text-center flex-center">Login</div>

      <img class="absolute top-12px right-24px" w="100px" :src="LogoSvg" alt="加载中" />

      <a-form :model="formState" name="login_form" @finish="onFinish">
        <a-form-item name="username" :rules="[{ required: true, message: 'Please input your username!' }]">
          <a-input v-model:value="formState.username" class="input" size="large" placeholder="用户名">
            <template #prefix>
              <UserOutlined class="site-form-item-icon" />
            </template>
          </a-input>
        </a-form-item>

        <a-form-item name="password" :rules="[{ required: true, message: 'Please input your password!' }]">
          <a-input-password
            v-model:value="formState.password"
            autocomplete="off"
            class="input"
            size="large"
            placeholder="密码"
          >
            <template #prefix>
              <LockOutlined class="site-form-item-icon" />
            </template>
          </a-input-password>
        </a-form-item>

        <a-form-item name="code" :rules="[{ required: true, message: 'Please input your code!' }]">
          <div class="w-full flex">
            <a-input v-model:value="formState.code" class="input" size="large" placeholder="验证码" />

            <img alt="loading" :src="captcha" :onClick="fetchCaptcha" />
          </div>
        </a-form-item>

        <a-form-item>
          <a-button class="!mt-12px w-full !bg-gradientViolet !text-white !rounded-smm" size="large" html-type="submit">
            登录
          </a-button>
          <div class="mt-sm flex justify-between">
            <div>
              Don't have account
              <a href="#">sign up</a>
            </div>
            <a class="login-form-forgot" href="">forgot password</a>
          </div>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<style scoped>
.input {
  --at-apply: "!border-0 !border-b !border-b-grey hover:!border-b-purple hover:!border-r-none";
}
</style>
