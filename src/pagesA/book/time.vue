<route lang="yaml">
layout: common
style:
  navigationBarTitleText: 预约时间
</route>

<script lang="ts" setup>
import type { Times } from '@/utils'

const today = fd(+new Date())
const day = ref(fd(+new Date()))
const stime = ref('01:30')
const duration = ref(40)
const etime = computed(() => calculateEndTime(stime.value, duration.value))
const selectedTime = computed(() => `${day.value} ${stime.value}-${etime.value}`)
const times = ref(get24HoursQuarter())

function calendarChange(e) {
  day.value = e.fulldate
}

function clickItem(item: Times) {
  if (item.disabled)
    return false
  times.value.map((v) => {
    v.selected = false
  })
  item.selected = true
  stime.value = item.value
}

function save() {
  bookStime.value = `${day.value} ${stime.value}`

  uni.navigateBack()
}
</script>

<template>
  <wu-calendar
    :startDate="today"
    color="#2F4BEC" :itemHeight="50" startWeek="mon"
    :fold="true" type="week" :insert="true" @change="calendarChange"
  />
  <view py20px bg-white mt12px px50rpx>
    <view tc>
      <text>体验套餐</text>
      <text c-1A66FF pl10px>
        40分钟
      </text>
    </view>
    <view f14 tc mt5px mb50rpx>
      <text>手艺人</text>
      <text c-1A66FF pl10px>
        王乐乐
      </text>
    </view>
    <view class="my-table">
      <template v-for="item in times" :key="item.value">
        <view class="item pr" :class="{ selected: item.selected, disabled: item.disabled }" @click="clickItem(item)">
          {{ item.value }}
          <wd-icon v-if="item.selected" name="check" color="rgba(255,255,255,0.8)" size="20px" custom-style="position:absolute;left:50%;top:50%;transform:translate(-50%, -50%)" />
        </view>
      </template>
    </view>
    <view tc mt20px>
      <wd-img
        :height="20"
        mode="heightFix"
        :src="`${IMG_BASE}/book-status.png`"
      />
    </view>
    <view tc mt20px c-FFAB2D f14>
      已选：{{ selectedTime }}
    </view>
  </view>

  <view mt-48rpx color-white pf w-90% bottom-20px fc>
    <wd-button size="large" custom-class="theme-bg" :block="true" @click="save()">
      <view flex flex-cc>
        <text>确定</text>
      </view>
    </wd-button>
  </view>

  <view class="h50px" />
</template>

<style lang='scss' scoped>
.my-table {
  display: grid;
  box-sizing: border-box !important;
  border-left: 1px solid #eaeaea;
  border-top: 1px solid #eaeaea;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: repeat(16, 43px);
  height: 300px;
  overflow-y: scroll;
  .item {
    box-sizing: border-box !important;
    border-right: 1px solid #eaeaea;
    border-bottom: 1px solid #eaeaea;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    &.disabled {
      background: #c8c7c7;
    }
    &.selected {
      background: #3fa85e;
    }
  }
}
.active-time {
  color: #364250 !important;
}
.booking {
  text-align: left;
  position: absolute;
  height: 150px;
  left: 0;
  top: 0;
  background-color: #ffcbe2;
  padding: 6px;
  border-radius: 4px;
}
.plus {
  position: fixed;
  right: 10rpx;
  bottom: 10rpx;
  width: 112rpx;
  height: 112rpx;
  background: #3a82fb;
  border-radius: 50%;
  box-shadow: 0rpx 10rpx 20rpx 0rpx rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  color: #fff;
  font-size: 48rpx;
  z-index: 100;
}
.content {
  white-space: nowrap;
}
:deep(.cus-input) {
  background: #f6f6fb !important;
  padding: 15rpx 20rpx;
}
.status {
  border-top: 1px solid #e4e8ef;
  border-bottom: 1px solid #e4e8ef;
  color: #3d3d3d;
}
.pannel {
  width: 192rpx;
  height: 192rpx;
  border-radius: 16rpx;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20rpx;
  background: #e8e9eb;
  color: #3d3d3d;
  .title {
    font-size: 28rpx;
    line-height: 28rpx;
  }
  &.active {
    background: #e3ecfc;
    color: #1a66ff;
  }
}
:deep(.wu-calendar__weeks-day) {
  height: 70rpx !important;
  border: none !important;
}
:deep(.wu-calendar__header) {
  border: none !important;
}
:deep(.wu-calendar-item__weeks-lunar-text) {
  display: none;
}
:deep(.wu-calendar-item__weeks-box-item) {
  width: 42px !important;
  border-radius: 50% !important;
}
:deep(.wu-calendar__header-btn-box.horizontal) {
  height: 50rpx !important;
}
:deep(.wu-calendar__header-btn-box .wu-calendar__header-btn) {
  display: none !important;
}
:deep(.wu-calendar__backtoday) {
  display: none !important;
}
:deep(.wd-navbar__title) {
  font-weight: normal;
}
:deep(.wd-drop-menu__item) {
  text-align: center !important;
}
:deep(.wd-navbar__left) {
  z-index: 100 !important;
  transform: translateY(3px);
}
</style>
