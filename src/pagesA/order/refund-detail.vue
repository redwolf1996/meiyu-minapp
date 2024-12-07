<route lang="yaml">
style:
  navigationBarTitleText: 退款详情
</route>

<script lang="ts" setup></script>

<template>
  <view px15px>
    <view bg-white mb12px p16px flex flex-cc flex-y gap16px>
      <view class="my-status-tag end-service">
        已完成(退款成功)
      </view>
      <view tc fs-12px>
        记账退款部分以线下操作为主为准
      </view>
    </view>
    <view bg-white mb12px p16px flex flex-y gap16px>
      <view flex flex-ac flex-bt fb fs-16px>
        <text>退款金额</text>
        <text>￥100</text>
      </view>
      <view flex flex-ac flex-bt fs-14px>
        <text>现金(已完成)</text>
        <text>￥100</text>
      </view>
      <view flex flex-ac flex-bt fs-14px>
        <text>退还卡项权益</text>
        <text>1次</text>
      </view>
    </view>
    <view bg-white mb12px p16px flex flex-y gap16px fs-14px>
      <view flex gap16px>
        <text>售后状态</text>
        <text>xxx</text>
      </view>
      <view flex gap16px>
        <text>申请时间</text>
        <text>xxx</text>
      </view>
      <view flex gap16px>
        <text>订单编号</text>
        <text>xxx</text>
      </view>
    </view>
    <view bg-white p16px flex gap16px fs-14px>
      <text>退款说明</text>
      <text>xxx</text>
    </view>
  </view>
</template>

<style lang='scss' scoped></style>
