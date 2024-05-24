<route lang="yaml">
layout: home
style:
  navigationBarTitleText: 工作台
  navigationStyle: custom
</route>

<script lang="ts" setup>
import { getMenuButtonInfo } from '@/utils/index'

const menuButtonWidth = ref(0)
onLoad(() => {
  const menuButtonInfo = getMenuButtonInfo()
  menuButtonWidth.value = menuButtonInfo.barWidth
})
</script>

<template>
  <wd-navbar :safeAreaInsetTop="true" :bordered="false">
    <template #title>
      <view flex flex-ac flex-bt text-left :style="{ width: `calc(100% - ${menuButtonWidth}px)` }">
        <view>美婷美甲美睫</view>
        <view flex flex-y flex-cc pr-20rpx pr>
          <wd-img
            :width="28"
            :height="28"
            :src="`${IMG_BASE}/icon-msg.png`"
          />
          <text
            style="right: 16rpx;top: -6rpx;"
            pa top-0 w-30rpx h-30rpx lh-30rpx tc bg-#FE502E
            round color-#fff font-size-20rpx
          >
            3
          </text>
        </view>
      </view>
    </template>
  </wd-navbar>
</template>

<style>
page {
  background-color: #fff;
}
</style>
