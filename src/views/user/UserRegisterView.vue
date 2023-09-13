<template>
  <div id="userLoginView">
    <h1 style="margin: 32px 0">新手上线 猫 OJ 判题系统</h1>
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
        :rules="[
          { required: true, message: '账号不能为空' },
          { minLength: 4, message: '账号长度不能低于4位' },
        ]"
      >
        <a-input v-model="form.userAccount" placeholder="请输入账号" />
      </a-form-item>
      <a-form-item
        required
        field="userPassword"
        tooltip="密码不能小于8位"
        :rules="[
          { required: true, message: '密码不能为空' },
          { minLength: 4, message: '密码不能小于8位' },
        ]"
        label="密码"
      >
        <a-input-password
          v-model="form.userPassword"
          placeholder="请输入密码"
        />
      </a-form-item>
      <a-form-item
        required
        field="checkPassword"
        tooltip="密码不少于 8 位"
        label="确认密码"
      >
        <a-input-password
          v-model="form.checkPassword"
          placeholder="请确认密码"
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
        style="margin: 25px; width: 150px"
        size="large"
        shape="round"
        type="primary"
        html-type="submit"
        @click="handleSubmit"
      >
        新 手 注 册
      </a-button>
    </a-space>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { UserControllerService, UserRegisterRequest } from "../../../backapi";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { Message } from "@arco-design/web-vue";

const router = useRouter();
const store = useStore();

const form = reactive<UserRegisterRequest>({
  checkPassword: "",
  userAccount: "",
  userPassword: "",
});

const handleSubmit = async () => {
  if (
    form?.checkPassword?.length !== form.userPassword?.length ||
    form.checkPassword !== form.userPassword
  ) {
    Message.error("两次输入密码不一致");
    return;
  }

  // 拿到后端的响应
  const res = await UserControllerService.userRegisterUsingPost(form);
  // 登录成功跳转到主页
  if (res.code === 0) {
    // 获取到用户信息之后再跳转到主页
    await store.dispatch("user/getLoginUser");
    await router.push({
      path: "/user/login",
      replace: true,
    });
    message.success("注册成功！");
  } else {
    message.error("注册失败！" + res.message);
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
</script>
