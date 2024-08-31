<route lang="yaml">
style:
  navigationBarTitleText: 添加服务
  navigationStyle: custom
</route>

<script setup lang="ts">
onHide(() => {
  resetRichData()
})
</script>

<template>
  <StepNav :step="1" />
  <view mt-10px tc fs-40>
    您可以尝试添加第一个服务
  </view>
  <view mt-8px tc>
    也可跳过稍后在【工作台-服务管理】中添加
  </view>

  <view h-24rpx />
  <BaseDataService showSkip />
</template>
