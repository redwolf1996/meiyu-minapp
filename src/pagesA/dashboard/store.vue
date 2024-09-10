<route lang="yaml">
style:
  navigationBarTitleText: 店务管理
</route>

<script lang="ts" setup></script>

<template>
  <view class="container">
    <view p-30rpx bg-white rd-8px mb40rpx>
      <view mb16px flex>
        <view h-40rpx w-3.5px bg-A7C4FD rd-8rpx />
        <view f18 pl-10px lh-40rpx>
          商品管理
        </view>
      </view>
      <view flex flex-cc gap-100rpx tc>
        <view>
          <view>
            <wd-img
              :width="30"
              :height="30"
              :src="`${IMG_BASE}/dianwu/fuwu.png`"
            />
          </view>
          <view f14 mt5px>
            服务管理
          </view>
        </view>
        <view>
          <view>
            <wd-img
              :width="30"
              :height="30"
              :src="`${IMG_BASE}/dianwu/kaxiang.png`"
            />
          </view>
          <view f14 mt5px>
            卡项管理
          </view>
        </view>
        <view>
          <view>
            <wd-img
              :width="30"
              :height="30"
              :src="`${IMG_BASE}/dianwu/chanpin.png`"
            />
          </view>
          <view f14 mt5px>
            产品管理
          </view>
        </view>
      </view>
    </view>

    <view p-30rpx bg-white rd-8px mb40rpx>
      <view mb16px flex>
        <view h-40rpx w-3.5px bg-A7C4FD rd-8rpx />
        <view f18 pl-10px lh-40rpx>
          店铺管理
        </view>
      </view>
      <view flex flex-cc gap-100rpx tc>
        <view>
          <view>
            <wd-img
              :width="30"
              :height="30"
              :src="`${IMG_BASE}/dianwu/yuangong.png`"
            />
          </view>
          <view f14 mt5px>
            员工管理
          </view>
        </view>
        <view>
          <view>
            <wd-img
              :width="30"
              :height="30"
              :src="`${IMG_BASE}/dianwu/yuyue.png`"
            />
          </view>
          <view f14 mt5px>
            预约管理
          </view>
        </view>
        <view>
          <view>
            <wd-img
              :width="30"
              :height="30"
              :src="`${IMG_BASE}/dianwu/zhifu.png`"
            />
          </view>
          <view f14 mt5px>
            支付管理
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<style lang='scss' scoped>
.container {
  padding: 40rpx 30rpx;
}
</style>
