<route lang="yaml">
  style:
    navigationBarTitleText: 添加服务
    navigationStyle: custom
</route>

<script lang="ts" setup>
</script>

<template>
  <StepNav :step="2" />
  <view mt-10px tc fs-40>
    您可以尝试添加第一个服务
  </view>
  <view mt-8px tc>
    也可跳过稍后在【工作台-服务管理】中添加
  </view>
</template>

<style scoped>
.custom-nav {
  background-color: #f6f6fd;
}
</style>
