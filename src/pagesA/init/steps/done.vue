<route lang="yaml">
style:
  navigationBarTitleText:  完成基础设置
</route>

<script lang="ts" setup>
const userInfo = useUserStore().userInfo
const isCompleteSettings = computed(() => {
  if (userInfo.productSkip !== 1
    && userInfo.serviceSkip !== 1
    && userInfo.staffSkip !== 1
  ) {
    return false
  }
  return true
})

function toDashboard() {
  uni.reLaunch({ url: '/pagesA/tabs/tab-business-dashboard' })
}
</script>

<template>
  <view h-300rpx />
  <template v-if="isCompleteSettings">
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
    <view mt-30px f12 color-666 tc>
      其他基础信息可在【工作台->店务管理】中添加维护
    </view>
  </template>

  <template v-if="!isCompleteSettings">
    <view tc f18 fb mt-20rpx>
      <view>请进入【工作台->店务管理】中</view>
      <view>添加基础信息</view>
    </view>
    <view tc mt-18px f12 color-666>
      完善基础信息后即可正常使用了
    </view>
  </template>

  <view h-300rpx />
  <view mx-40rpx mt-64rpx color-white @click="toDashboard()">
    <wd-button size="large" custom-class="theme-bg" block>
      <view flex flex-cc>
        <text>进入工作台</text>
      </view>
    </wd-button>
  </view>
</template>
