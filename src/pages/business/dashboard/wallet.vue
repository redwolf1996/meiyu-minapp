<route lang="yaml">
style:
  navigationBarTitleText: 我的钱包
</route>

<script lang="ts" setup>
const show = ref(false)
</script>

<template>
  <view
    style="background-size: cover;"
    :style="{ backgroundImage: `url(${IMG_BASE}/bg-wallet.png)` }"
  >
    <view h-24px />
    <view tc c-fff>
      总余额(元)
    </view>
    <view h-10px />
    <view flex flex-cc c-fff>
      <view v-if="show" tc>
        <text fs-64>
          23232.23
        </text>
      </view>
      <view v-else tc style="transform: translateY(10rpx);">
        <text fs-64>
          ****
        </text>
      </view>
      <view w-10px />
      <wd-icon v-if="show" name="eye-close" color="white" size="24px" @click="show = false" />
      <wd-icon v-else name="view" color="white" size="24px" @click="show = true" />
    </view>
    <view h-40px />
    <view class="btn">
      <text>全部提现到零钱</text>
    </view>
    <view h-44px />
    <view class="cash" c-fff flex flex-cc tc p-10px>
      <view wp-33.3333>
        <view f12 style="opacity: 0.5;">
          累计收入(元)
        </view>
        <view f14 mt10rpx>
          1232131
        </view>
      </view>
      <view wp-33.3333>
        <view f12 style="opacity: 0.5;">
          提现中收入(元)
        </view>
        <view f14 mt10rpx>
          1232131
        </view>
      </view>
      <view wp-33.3333>
        <view f12 style="opacity: 0.5;">
          已提现收入(元)
        </view>
        <view f14 mt10rpx>
          1232131
        </view>
      </view>
    </view>
  </view>
</template>

<style lang='scss' scoped>
.cash {
  background: rgba(255, 255, 255, 0.1);
}
.btn {
  text-align: center;
  color: #fff;
  padding: 10px 20px;
  border: 2px solid #fff;
  text-wrap: nowrap;
  width: 50%;
  margin: 0 auto;
}
</style>
