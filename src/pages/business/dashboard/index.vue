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

  <view class="conitaner" mt-20rpx>
    <view
      p-40rpx color-white pr
      style="background-size: cover;"
      :style="{ backgroundImage: `url(${IMG_BASE}/bg-dashboard.png)` }"
    >
      <view f14>
        本月收入(元)
      </view>
      <view fb font-size-64rpx mt-12px>
        26237.23
      </view>
      <view flex mt-20px gap-40px>
        <view wp-33.3333>
          <view f12 style="opacity: .6;">
            今日收入
          </view>
          <view f16 mt-12rpx>
            777
          </view>
        </view>
        <view wp-33.3333>
          <view f12 style="opacity: .6;">
            本月消耗金额
          </view>
          <view f16 mt-12rpx>
            123
          </view>
        </view>
        <view wp-33.3333>
          <view f12 style="opacity: .6;">
            本月开卡充值
          </view>
          <view f16 mt-12rpx>
            3233
          </view>
        </view>
      </view>
      <view
        class="wallet"
        px-12px py-10px color-white pa flex flex-ac right-0 top-20px
        style="background-color: rgba(255,255,255,0.2);border-radius: 31px 0px 0px 31px;"
      >
        <wd-img
          :width="25"
          :height="22"
          :src="`${IMG_BASE}/icon-wallet.png`"
        />
        <text f14 pl-8px>
          我的钱包
        </text>
      </view>
    </view>
    <view>222</view>
  </view>
</template>

<style>
page {
  background-color: #fff;
}
</style>

<style scoped>
.bg {
  position: absolute;
  width: 100%;
  left: 0;
  right: 0;
}
</style>
