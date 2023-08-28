<template>
  <div id="404page">
    <div class="title">401 错误 !</div>
    <div class="images">
      <img width="500" src="../../assets/401.svg" />
    </div>
    <a-result
      :status="null"
      title="对不起，您没有访问权限，请不要进行非法操作！您可以返回主页面"
    >
      <template #extra>
        <a-space>
          <a-button class="back-404" type="primary" href="/">首页</a-button>
        </a-space>
      </template>
    </a-result>
  </div>
</template>
<script lang="ts" setup></script>
<style scoped>
#404page {
}

.title {
  color: black;
  font-size: 48px;
  font-weight: bold;
  text-align: center;
  margin-top: 50px;
}

.images {
  display: flex;
  justify-content: center;
  align-items: center;
}

.back-404 {
  border-radius: 10px;
}
</style>
