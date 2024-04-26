<route lang="yaml">
  layout: default
  style:
    navigationBarTitleText: 添加店铺信息
    navigationStyle: custom
  </route>

<script lang="ts" setup>
</script>

<template>
  <StepNav :step="1" />
  <view fs-40 mt-10px tc>
    请填写您的门店信息
  </view>
  <view mt-8px tc>
    方便客户找到您的门店
  </view>
</template>
