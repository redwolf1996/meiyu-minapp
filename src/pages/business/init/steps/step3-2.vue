<route lang="yaml">
style:
  navigationBarTitleText: 添加折扣卡
  navigationStyle: custom
</route>

<script lang="ts" setup>

</script>

<template>
  <StepNav :step="3" />
  <view mt-10px tc fs-40>
    您可以尝试添加第一个会员卡项
  </view>
  <view mt-8px tc>
    也可跳过稍后在【工作台-产品管理】中添加
  </view>

  <view m-32rpx bg-white px-32rpx py-60rpx>
    <view h-44rpx flex>
      <view hp100 style="width: 8rpx;background: #CABDFF;border-radius: 8rpx;" />
      <view f18 fb style="padding-left: 8px;line-height: 44rpx;">
        选择要填写的卡项类型
      </view>
    </view>
    <view h-30px />
    <view flex flex-bt>
      <wd-img
        :width="80"
        :height="80"
        :src="`${IMG_BASE}/cika1.png`"
      />
      <wd-img
        :width="80"
        :height="80"
        :src="`${IMG_BASE}/cika2.png`"
      />
      <wd-img
        :width="80"
        :height="80"
        :src="`${IMG_BASE}/cika3.png`"
      />
    </view>
  </view>

  <view mx-40rpx mt-64rpx color-white>
    <wd-button size="large" custom-class="theme-bg" block>
      <view flex flex-cc>
        <text>下一步</text>
      </view>
    </wd-button>
  </view>

  <view mx-40rpx color-white>
    <wd-button size="large" type="text" block>
      <view flex flex-cc color-333>
        <text>跳过</text>
      </view>
    </wd-button>
  </view>
  <view h-60rpx />
</template>

<style lang='scss' scoped>
</style>
