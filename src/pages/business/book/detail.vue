<route lang="yaml">
style:
  navigationBarTitleText: 预约详情
</route>

<script lang="ts" setup></script>

<template>
  <view px-32rpx py-16rpx>
    <view bg-white px-34rpx py-40rpx>
      <view flex flex-ac gap-20rpx>
        <wd-img
          :width="18"
          :height="18"
          :src="`${IMG_BASE}/icon-cus.png`"
        />
        <text fs-34>
          客户
        </text>
      </view>
      <view rd-16rpx mt-20rpx bg-#F0F0F0 py-18rpx px-32rpx flex flex-ac gap-32rpx>
        <wd-img
          :width="48"
          :height="48"
          :round="true"
          :src="`${IMG_BASE}/cat.png`"
        />
        <view flex flex-y flex-bt flex-1 gap-20rpx>
          <view f16>
            王乐乐
          </view>
          <view flex flex-ac flex-bt>
            <view flex flex-ac gap-16rpx>
              <text c-#929292 fs-28 lh-28rpx>
                13888888888
              </text>
              <wd-img
                :width="16"
                :height="16"
                :src="`${IMG_BASE}/icon-v1.png`"
              />
            </view>
            <view f12>
              <text c-#929292>
                会员卡
              </text>
              <text c-#00BB00>
                2张
              </text>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<style lang='scss' scoped></style>
