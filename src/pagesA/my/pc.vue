<route lang="yaml">
style:
  navigationBarTitleText: 电脑端登录
</route>

<script lang="ts" setup>
const loginUrl = 'https://app.meiyux.com/login'

function copyUrl() {
  uni.setClipboardData({
    data: loginUrl,
    success: () => {
      uni.showToast({
        title: '复制成功',
        icon: 'success',
        duration: 1500,
      })
    },
  })
}
</script>

<template>
  <view class="page">
    <view class="content">
      <view class="title">
        登录链接
      </view>
      <view class="url">
        {{ loginUrl }}
      </view>
      <view class="btn b1" @click="copyUrl">
        复制链接
      </view>
    </view>
  </view>
</template>

<style lang='scss' scoped>
.page {
  min-height: 100vh;
  background-color: #f5f5f5;
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 120px;
}

.title {
  font-size: 36rpx;
  color: #141414;
  margin-bottom: 40rpx;
}

.url {
  font-size: 28rpx;
  color: #666666;
  margin-bottom: 60rpx;
}

.btn {
  width: 270rpx;
  height: 80rpx;
  font-size: 34rpx;
  line-height: 34rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  &.b1 {
    color: #1a66ff;
    border: 2px solid #1a66ff;
    background-color: #ffffff;
  }
}
</style>
