<route lang="yaml">
layout: home
style:
  navigationBarTitleText: 工作台
  navigationStyle: custom
</route>

<script lang="ts" setup></script>

<template>
  <wd-navbar :safeAreaInsetTop="true" :bordered="false">
    <template #title>
      <view text-left w-full>
        asd
      </view>
    </template>
  </wd-navbar>
</template>

<style>
page {
  background-color: #fff;
}
</style>
