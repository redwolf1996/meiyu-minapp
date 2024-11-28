<route lang="yaml">
style:
  navigationBarTitleText: 会员到期提醒
</route>

<script lang="ts" setup>

</script>

<template>
  <view px-32rpx py-40rpx>
    <view flex flex-bt flex-ac gap-14px>
      <wd-img
        :width="32"
        :height="32"
        :src="`${IMG_BASE}/icon-ring.png`"
      />
      <view flex-grow-1>
        <view flex flex-bt flex-ac>
          <view f16 fb>
            会员到期提醒
          </view>
        </view>
        <view flex flex-bt tc flex-ac mt-10rpx>
          <view f12 color-999>
            2025.5.6 11:00:01
          </view>
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
</style>
