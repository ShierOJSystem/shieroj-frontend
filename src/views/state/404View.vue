<template>
  <div id="404page">
    <div class="title">404 错误 !</div>
    <div class="images">
      <img width="500" src="../../assets/404.svg" />
    </div>
    <a-result :status="null" title="您没有访问的资源不存在！您可以返回主页面">
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
