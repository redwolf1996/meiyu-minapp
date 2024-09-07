<route lang="yaml">
style:
  navigationBarTitleText: 添加产品
  navigationStyle: custom
</route>

<script lang="ts" setup>
</script>

<template>
  <StepNav :step="2" />
  <view mt-10px tc fs-40>
    您可以尝试添加第一个产品
  </view>
  <view mt-8px tc>
    也可跳过稍后在【工作台-产品管理】中添加
  </view>

  <view h-24rpx />
  <BaseDataProduct showSkip />
</template>
