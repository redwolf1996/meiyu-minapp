<route lang="yaml">
style:
  navigationBarTitleText: 支付管理
</route>

<script lang="ts" setup></script>

<template>
  <view px-20px py-30px>
    <view mb-20px>
      <view mb16px flex>
        <view h-40rpx w-3.5px bg-A7C4FD rd-8rpx />
        <view f18 pl-10px lh-40rpx>
          支付方式
        </view>
      </view>
      <view class="list">
        <view>现金</view>
        <view>银行卡</view>
        <view>移动支付</view>
        <view>微信(手工)</view>
        <view>支付宝(手工)</view>
        <view>其他</view>
        <view>储值卡</view>
        <view>美团</view>
        <view>抖音</view>
        <view>线下收款</view>
      </view>
    </view>
    <view mb-20px>
      <view mb16px flex>
        <view h-40rpx w-3.5px bg-A7C4FD rd-8rpx />
        <view f18 pl-10px lh-40rpx>
          退费方式
        </view>
      </view>
      <view class="list">
        <view>原路退回</view>
        <view>现金</view>
        <view>微信</view>
        <view>支付宝</view>
      </view>
    </view>
  </view>
</template>

<style>
page {
  background-color: #fff;
}
</style>

<style lang='scss' scoped>
.list {
  display: flex;
  flex-direction: column;
  gap: 24rpx;
  > view {
    height: 80rpx;
    line-height: 80rpx;
    font-size: 28rpx;
    color: #303030;
    background: #f6f6fb;
    padding-left: 20rpx;
  }
}
</style>
