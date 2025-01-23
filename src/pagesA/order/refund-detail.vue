<route lang="yaml">
style:
  navigationBarTitleText: 退款详情
</route>

<script lang="ts" setup>
import type { RefundDetail } from './types'

const refundId = ref(0)
const detail = ref<RefundDetail>(null)

onLoad((option) => {
  refundId.value = +option.refundId
  getDetail()
})

async function getDetail() {
  const res = await request.get<RefundDetail>(`/business/order/refund/${refundId.value}`)
  detail.value = res.data
}

function toDashboard() {
  uni.reLaunch({ url: '/pagesA/tabs/tab-business-dashboard' })
}
</script>

<template>
  <view px15px>
    <view bg-white mb12px p16px flex flex-cc flex-y gap16px>
      <view class="my-status-tag end-service">
        {{ detail?.refundStatusDesc || '--' }}
      </view>
      <view tc fs-12px>
        记账退款部分以线下操作为主为准
      </view>
    </view>
    <view bg-white mb12px p16px flex flex-y gap16px>
      <view flex flex-ac flex-bt fb fs-16px>
        <text>退款金额</text>
        <text>￥{{ detail?.refundAmount || '--' }}</text>
      </view>
      <view flex flex-ac flex-bt fs-14px>
        <text>{{ detail?.refundTypeDesc || '--' }}</text>
        <text>￥{{ detail?.refundAmount || '--' }}</text>
      </view>
      <view flex flex-ac flex-bt fs-14px>
        <text>退还卡项权益</text>
        <text>{{ detail?.refundCardEquity }}次</text>
      </view>
    </view>
    <view bg-white mb12px p16px flex flex-y gap16px fs-14px>
      <!-- <view flex gap16px>
        <text>售后状态</text>
        <text>xxx</text>
      </view> -->
      <view flex gap16px>
        <text>申请时间</text>
        <text>{{ fdt(detail?.createTime) }}</text>
      </view>
      <view flex gap16px>
        <text>订单编号</text>
        <text>{{ detail?.refundNo || '--' }}</text>
      </view>
    </view>
    <view bg-white p16px flex gap16px fs-14px>
      <text>退款说明</text>
      <text>{{ detail?.notes || '--' }}</text>
    </view>

    <view class="menu" mt40px>
      <view class="item" @click="toDashboard()">
        返回工作台
      </view>
    </view>
  </view>
</template>

<style lang='scss' scoped>
.menu {
  display: flex;
  justify-content: center;
  color: #a3a4a6;
  font-size: 12px;
  align-items: center;
  .item {
    width: 88px;
    text-align: center;
  }
  .mid {
    border-left: 1px solid #a3a4a6;
    border-right: 1px solid #a3a4a6;
  }
}
</style>
