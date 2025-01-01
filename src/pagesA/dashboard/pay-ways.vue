<route lang="yaml">
style:
  navigationBarTitleText: 支付管理
</route>

<script lang="ts" setup>
import type { PayRefundType } from '../billing/types'

const payTypes = ref<PayRefundType['payType']>([])
const refundTypes = ref<PayRefundType['refundType']>([])

onLoad(async () => {
  await request.get<PayRefundType>('/pay-type-conf').then((res) => {
    payTypes.value = res.data.payType
    refundTypes.value = res.data.refundType
  })
})
</script>

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
        <view v-for="item in payTypes" :key="item?.code">
          {{ item?.desc }}
        </view>
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
        <view v-for="item in refundTypes" :key="item?.code">
          {{ item?.desc }}
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
