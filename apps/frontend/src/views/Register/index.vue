<script setup lang="ts">
import { Buffer } from "buffer";
import { message } from "ant-design-vue";
import type { Rule } from "ant-design-vue/es/form";
import { onMounted, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { validatePass, _validatePhone, _validateEmail } from "./validate";
import { getCaptcha } from "@/apis/common";
import { userDoRegister } from "@/apis/user";
import LogoSvg from "@/assets/svg/logo.svg";

interface RegisterFormState {
  username: string;
  realName: string;
  password: string;
  confirmPassword: string;
  phone: string;
  email: string;
  code: string;
}
const registerFormState = reactive<RegisterFormState>({
  username: "",
  realName: "",
  password: "",
  confirmPassword: "",
  phone: "",
  email: "",
  code: "",
});

const captcha = ref("");

const loading = ref(false);
const router = useRouter();

const validateConfirmPass = (_rule: Rule, value: string) => {
  if (value === "") {
    return Promise.reject("Please input the password again");
  }

  if (value !== registerFormState.password) {
    return Promise.reject("Two inputs don't match!");
  }

  return Promise.resolve();
};

const rules: Record<string, Rule[]> = {
  username: [{ required: true, message: "Please input your username", trigger: "change", max: 12 }],
  realName: [{ required: true, message: "Please input your realName", trigger: "change", max: 5 }],
  password: [{ required: true, validator: validatePass, trigger: "change" }],
  confirmPassword: [{ validator: validateConfirmPass, trigger: "change" }],
  phone: [{ required: true, validator: _validatePhone, trigger: "change" }],
  email: [{ required: true, validator: _validateEmail, trigger: "change" }],
  code: [{ required: true, message: "Please input your code", trigger: "change" }],
};

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

const onFinish = async ({ confirmPassword, ...reset }: RegisterFormState) => {
  try {
    loading.value = true;

    await userDoRegister(reset);
    message.success("注册成功, 即将进入登录页面");

    setTimeout(() => {
      router.push("/login");
    }, 1000);
  } catch (error: any) {
    message.error(error.message);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchCaptcha();
});
</script>

<template>
  <div class="full flex-center bg-gradientPink">
    <div class="bg-white rounded-md px-12 w-card relative">
      <div class="text-38px h-140 font-semibold text-center flex-center">注册帐号</div>

      <img class="absolute top-12px right-24px" w="100px" :src="LogoSvg" alt="加载中" />

      <a-form :rules="rules" :model="registerFormState" name="login_form" @finish="onFinish">
        <a-form-item has-feedback name="username">
          <a-input v-model:value="registerFormState.username" class="input" size="large" placeholder="用户名">
            <template #prefix>
              <UserOutlined class="mr-sm" />
            </template>
          </a-input>
        </a-form-item>

        <a-form-item has-feedback name="realName">
          <a-input v-model:value="registerFormState.realName" class="input" size="large" placeholder="真实姓名">
            <template #prefix>
              <ContactsOutlined class="mr-sm" />
            </template>
          </a-input>
        </a-form-item>

        <a-form-item has-feedback name="password">
          <a-input-password
            v-model:value="registerFormState.password"
            autocomplete="off"
            class="input"
            size="large"
            placeholder="密码"
          >
            <template #prefix>
              <LockOutlined class="mr-sm" />
            </template>
          </a-input-password>
        </a-form-item>

        <a-form-item has-feedback name="confirmPassword">
          <a-input-password
            v-model:value="registerFormState.confirmPassword"
            autocomplete="off"
            class="input"
            size="large"
            placeholder="确认密码"
          >
            <template #prefix>
              <LockOutlined class="mr-sm" />
            </template>
          </a-input-password>
        </a-form-item>

        <a-form-item has-feedback name="phone">
          <a-input v-model:value="registerFormState.phone" class="input" size="large" placeholder="手机号">
            <template #prefix>
              <PhoneOutlined class="mr-sm" />
            </template>
          </a-input>
        </a-form-item>

        <a-form-item has-feedback name="email">
          <a-input v-model:value="registerFormState.email" class="input" size="large" placeholder="email">
            <template #prefix>
              <MailOutlined class="mr-sm" />
            </template>
          </a-input>
        </a-form-item>

        <a-form-item name="code">
          <div class="w-full flex">
            <a-input v-model:value="registerFormState.code" class="input" size="large" placeholder="验证码" />

            <img alt="loading" :src="captcha" :onClick="fetchCaptcha" />
          </div>
        </a-form-item>

        <a-form-item>
          <a-button
            :loading="loading"
            class="!mt-12px w-full !bg-gradientViolet !text-white !rounded-smm"
            size="large"
            html-type="submit"
          >
            注册
          </a-button>
          <div class="mt-sm flex justify-between">
            <div>
              Have a account?
              <a-button type="link" href="/login">login</a-button>
            </div>
            <a-button type="link">forgot password</a-button>
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
