<route lang="yaml">
layout: home
style:
  navigationBarTitleText: 预约
  navigationStyle: "custom"
</route>

<script lang="ts" setup>
const { restHeight } = getMenuButtonInfo()

function handleClickList() {

}
</script>

<template>
  <wd-navbar title="标题" :safeAreaInsetTop="true" @click-left="handleClickList">
    <template #left>
      <wd-icon name="list" size="22px" color="#8EA0B6" />
    </template>
    <template #title>
      <text c-#364250>
        11月10日
      </text>
    </template>
  </wd-navbar>
  <view :style="{ height: `${restHeight}px` }" bd>
    111
  </view>
</template>

<style lang='scss' scoped></style>
