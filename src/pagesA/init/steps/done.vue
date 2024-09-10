<route lang="yaml">
style:
  navigationBarTitleText:  完成基础设置
</route>

<script lang="ts" setup>
function toDashboard() {
  uni.reLaunch({ url: '/pagesA/tabs/tab-business-dashboard' })
}
</script>

<template>
  <view h-300rpx />
  <view tc>
    <wd-img
      width="100rpx"
      mode="widthFix"
      :src="`${IMG_BASE}/done.png`"
    />
  </view>
  <view tc f18 fb mt-20rpx>
    已完成基础设置
  </view>
  <view tc mt-16rpx f12 color-666>
    可以正常营业了
  </view>
  <view h-300rpx />
  <view mx-40rpx mt-64rpx color-white @click="toDashboard()">
    <wd-button size="large" custom-class="theme-bg" block>
      <view flex flex-cc>
        <text>进入工作台</text>
      </view>
    </wd-button>
  </view>
</template>
