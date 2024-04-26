<script lang="ts" setup>

</script>

<template>
  <view tc>
    <view mt-100rpx font-size-36rpx font-bold>
      欢迎来到美预预约
    </view>
    <view mt-80rpx>
      <view h-144rpx w-144rpx bg-blue ma />
    </view>
    <view mt-80rpx>
      走近千家万户，共享轻松生活
    </view>
    <view mx-40rpx mt-112rpx color-white>
      <wd-button size="large" custom-class="theme-bg" block>
        <view flex flex-cc>
          <span i-tdesign-logo-wechat font-size-36rpx />
          <span>&nbsp;微信一键登录</span>
        </view>
      </wd-button>
    </view>
    <view mt120rpx>
      切换为用户端登录
    </view>
  </view>
</template>

<route lang="yaml">
  layout: default
  style:
    navigationBarTitleText: 登录-商家端
</route>
