<template>
  <div id="userLoginView">
    <h1 style="margin: 32px 0">登录 猫 OJ 判题系统</h1>
    <a-form
      style="max-width: 320px; margin: 0 auto"
      label-align="left"
      auto-label-width
      :model="form"
    >
      <a-form-item
        required
        field="userAccount"
        label="账号"
        tooltip="账号不少于 4 位"
      >
        <a-input v-model="form.userAccount" placeholder="请输入账号" />
      </a-form-item>
      <a-form-item
        required
        field="userPassword"
        tooltip="密码不少于 8 位"
        label="密码"
      >
        <a-input-password
          v-model="form.userPassword"
          placeholder="请输入密码"
        />
      </a-form-item>
    </a-form>
    <a-space wrap>
      <a-button
        size="large"
        shape="round"
        type="secondary"
        status="success"
        @click="toIndex"
      >
        首 页
      </a-button>
      <a-button
        style="width: 120px; margin: 16px"
        size="large"
        shape="round"
        type="primary"
        html-type="submit"
        @click="handleSubmit"
      >
        登 录
      </a-button>
      <a-button
        size="large"
        shape="round"
        type="outline"
        status="success"
        @click="toRegister"
      >
        注 册
      </a-button>
    </a-space>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { UserControllerService, UserLoginRequest } from "../../../backapi";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

/**
 * 表单信息
 */
const form = reactive({
  userAccount: "",
  userPassword: "",
} as UserLoginRequest);

const router = useRouter();
const store = useStore();

/**
 * 提交表单
 * @param data
 */
const handleSubmit = async () => {
  const res = await UserControllerService.userLoginUsingPost(form);
  // 登录成功，跳转到主页
  if (res.code === 0) {
    await store.dispatch("user/getLoginUser");
    // 将token保存在localStorage中
    // localStorage.setItem("token", res.data.token);
    router.push({
      path: "/",
      replace: true,
    });
    message.success("登录成功！");
  } else {
    message.error("登陆失败，" + res.message);
  }
};
/**
 * 回到首页
 * @param question
 */
const toIndex = () => {
  router.push({
    path: `/`,
  });
};

const toRegister = () => {
  router.push({
    path: `/user/register`,
  });
};
</script>
