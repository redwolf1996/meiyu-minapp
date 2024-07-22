<route lang="yaml">
style:
  navigationBarTitleText: 客户详情
</route>

<script lang="ts" setup></script>

<template>
  <view flex flex-ac p-40rpx gap-40rpx bg-white>
    <wd-img
      :round="true"
      :width="64"
      :height="64"
      :src="`${IMG_BASE}/cat.png`"
    />
    <view h-136rpx flex-1 flex flex-bt flex-y>
      <view f18>
        李如霞
      </view>
      <view flex flex-bt flex-ac>
        <view f12>
          18777777777
        </view>
        <wd-img
          :round="true"
          :width="16"
          :height="16"
          :src="`${IMG_BASE}/icon-call.png`"
        />
      </view>
      <view flex flex-ac gap-10rpx>
        <wd-img
          :round="true"
          :width="16"
          :height="16"
          :src="`${IMG_BASE}/icon-v.png`"
        />
        <view class="tag">
          永久有效
        </view>
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
.tag {
  color: #ff5a5f;
  background: #feddde;
  padding: 5rpx 16rpx;
  height: 32rpx;
  line-height: 32rpx;
  text-align: center;
  border-radius: 16rpx;
  font-size: 20rpx;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
