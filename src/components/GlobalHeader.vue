<template>
  <a-row id="globalHeader" align="center" :wrap="false">
    <a-col flex="auto">
      <div>
        <a-menu
          mode="horizontal"
          :selected-keys="selectedKeys"
          @menu-item-click="doMenuClick"
        >
          <a-menu-item
            key="0"
            :style="{ padding: 0, marginRight: '38px' }"
            disabled
          >
            <div class="title-bar">
              <img class="logo" src="../assets/logo.png" />
              <div class="title">猫 OJ</div>
            </div>
          </a-menu-item>
          <a-menu-item v-for="item in visibleRoutes" :key="item.path">
            {{ item.name }}
          </a-menu-item>
        </a-menu>
      </div>
    </a-col>
    <a-dropdown trigger="hover">
      <a-avatar shape="circle">
        <template
          v-if="loginUser && loginUser.userRole !== AccessEnum.NOT_LOGIN"
        >
          <template v-if="loginUser.userAvatar">
            <img alt="avatar" :src="loginUser.userAvatar" class="userAvatar" />
          </template>
          <template v-else>
            <a-avatar>
              <IconUser />
            </a-avatar>
          </template>
        </template>
        <template v-else>
          <a-avatar>未登录</a-avatar>
        </template>
      </a-avatar>
      <template #content>
        <template v-if="loginUser.userRole !== AccessEnum.NOT_LOGIN">
          <a-doption>
            <template #icon>
              <icon-idcard />
            </template>
            <template #default>
              <a-anchor-link>个人信息</a-anchor-link>
            </template>
          </a-doption>
          <a-doption>
            <template #icon>
              <icon-poweroff />
            </template>
            <template #default>
              <a-anchor-link @click="logout">退出登录</a-anchor-link>
            </template>
          </a-doption>
        </template>
        <template v-else>
          <a-doption>
            <template #icon>
              <icon-user />
            </template>
            <template #default>
              <a-anchor-link href="/user/login">登录</a-anchor-link>
            </template>
          </a-doption>
          <a-doption>
            <template #icon>
              <icon-user />
            </template>
            <template #default>
              <a-anchor-link href="/user/register">注册</a-anchor-link>
            </template>
          </a-doption>
        </template>
      </template>
    </a-dropdown>
  </a-row>
</template>

<script setup lang="ts">
import { routes } from "../router/routes";
import { useRouter } from "vue-router";
import { computed, ref } from "vue";
import { useStore } from "vuex";
import checkAccess from "@/access/checkAccess";
import AccessEnum from "@/access/accessEnum";
import { LoginUserVO, UserControllerService } from "../../backapi";

const router = useRouter();
// 获取存储用户的信息
const store = useStore();

// 获取登录用户信息
const loginUser: LoginUserVO = computed(
  () => store.state.user?.loginUser
) as LoginUserVO;

console.log("用户信息", loginUser);

// 过滤显示菜单的路由数组
const visibleRoutes = computed(() => {
  return routes.filter((item, index) => {
    if (item.meta?.hideInMenu) {
      return false;
    }
    // 根据权限过滤菜单
    if (
      !checkAccess(store.state.user.loginUser, item?.meta?.access as string)
    ) {
      return false;
    }
    return true;
  });
});

// 用户注销
const logout = () => {
  UserControllerService.userLogoutUsingPost();
  location.reload();
};

// 默认主页
const selectedKeys = ref(["/"]);

// 路由跳转后，修改选中的菜单项
router.afterEach((to, from, failure) => {
  selectedKeys.value = [to.path];
});

// 切换菜单
const doMenuClick = (key: string) => {
  router.push({
    path: key,
  });
};

// 自动登录
// setTimeout(() => {
//   store.dispatch("user/getLoginUser", {
//     userName: "十二",
//     userRole: AccessEnum.ADMIN,
//   });
// }, 3000);
</script>

<style scoped>
.title-bar {
  display: flex;
  align-items: center;
}

.title {
  color: #444;
  margin-left: 10px;
}

.logo {
  line-height: 32px;
  height: 32px;
}
</style>
