<script lang="ts" setup>
import type { TodayBookingList } from '@/pagesA/tabs/types'

const props = defineProps<{
  data?: TodayBookingList // 今日预约列表
}>()
const emits = defineEmits(['myclick'])
const data = props.data
const img = data.serviceList?.[0].serviceCoverImg
</script>

<template>
  <view class="card-item" @click="emits('myclick', $event)">
    <view flex flex-bt>
      <view flex gap-14px>
        <wd-img
          :width="60"
          :height="60"
          :src="img"
        />
        <view flex flex-y flex-bt>
          <view f12>
            {{ data.serviceList?.[0]?.serviceName }}
          </view>
          <view fb f12>
            {{ data.startTimeStr }}
          </view>
          <view f12 flex tc flex-ac gap-10rpx f10>
            <view fb>
              {{ data.artisanName }}
            </view>
            <view w-12rpx h-12rpx round style="background-color: #FE502E;" />
            <view color-white tc px-8rpx py-4rpx lh-24rpx bg-FE502E>
              {{ data.storeServiceTypeDesc }}
            </view>
          </view>
        </view>
      </view>
      <wd-img
        :width="13"
        :height="10"
        :src="`${IMG_BASE}/icon-arrow-right.png`"
      />
    </view>
    <view mt-10px lh-30px flex flex-bt flex-ac>
      <view flex flex-ac gap-5px font-size-20rpx>
        <wd-img
          :width="26"
          :height="26"
          :src="`${IMG_BASE}/icon-people.png`"
        />
        <view fb>
          {{ data.storeCustomerName }}
        </view>
        <view w-10rpx h-10rpx round ma style="background-color: #000;" />
        <view>{{ data.phone }}</view>
      </view>
      <view class="btn btn1">
        {{ data.bookingStatusDesc }}
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.card-item {
  display: inline-block;
  width: 584rpx;
  padding: 18px 26px;
  border-radius: 30rpx;
  margin: 10px;
  box-shadow: 0 6rpx 16rpx 0 rgba(11, 73, 128, 0.2);
  background-color: #fff;
}
.btn {
  width: 130rpx;
  height: 60rpx;
  text-align: center;
  line-height: 60rpx;
  font-size: 26rpx;
  border-radius: 32rpx;
  &.btn1 {
    color: #dc312d;
    background: #ffeded;
  }
  &.btn2 {
    color: #cc8100;
    background: #fff5c7;
  }
  &.btn3 {
    color: #007d3a;
    background: #d7fae0;
  }
  &.btn4 {
    color: #a6a6b0;
    background: #f5f5fa;
  }
}
</style>
