<route lang="yaml">
layout: home
style:
  navigationBarTitleText: 预约看板
  navigationStyle: "custom"
</route>

<script lang="ts" setup>
const { restHeight, barHeight, barTop, windowHeight } = getMenuButtonInfo()

function handleClickList() {

}
</script>

<template>
  <!-- <view :style="{ height: `${barTop}px` }" bd>
    asdads
  </view>
  <view :style="{ height: `${barHeight}px` }" bd>
    asdads
  </view> -->
  <view :style="{ height: `${windowHeight}px` }" bd>
    <wd-navbar title="标题" :safeAreaInsetTop="true" @click-left="handleClickList">
      <template #left>
        <wd-icon name="list" size="22px" color="#8EA0B6" />
      </template>
      <template #title>
        预约看板
      </template>
    </wd-navbar>
  </view>
</template>

<style lang='scss' scoped></style>
