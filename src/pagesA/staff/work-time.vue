<route lang="yaml">
style:
  navigationBarTitleText: 工作时间
</route>

<script lang="ts" setup>
import { columns } from './data'
import type { WeekTime } from './data'

const columnsList = ref<WeekTime[]>(columns)
const showPop = ref(false)
const value1 = ref<string>('09:00')
const value2 = ref<string>('21:00')
const curIndex = ref(0)

function changeItemActive(item: WeekTime) {
  item.active = !item.active
}

function showPicker(item: WeekTime, index: number) {
  curIndex.value = index
  value1.value = item.startTime
  value2.value = item.endTime
  showPop.value = true
}

function confirm() {
  columnsList.value[curIndex.value].startTime = value1.value
  columnsList.value[curIndex.value].endTime = value2.value
  showPop.value = false
}

function save() {
  staffScheduling.value = columnsList.value?.filter(v => v.active).map((v1) => {
    return {
      weekCode: v1.week,
      startTime: v1.startTime,
      endTime: v1.endTime,
    }
  })
  uni.navigateBack()
}
</script>

<template>
  <view px-20px py-12px f12 lh-18px c-FF6619 bg-FFEFE6>
    员工工作时间指的是员工上班的时间，该时间内客户可以预约该员工的服务项。设置正确的工作时间可以降低取消率，提高店铺业绩。
  </view>
  <view h-20rpx />
  <view p-40rpx bg-white>
    <view c-141414 fb f16>
      选择每周工作时间
    </view>
    <view h-40rpx />
    <view flex flex-bt flex-y gap-20rpx>
      <view v-for="(item, index) in columnsList" :key="`c-${index}`" flex flex-bt style="border-bottom: 1px solid rgba(2, 53, 55, 0.12);">
        <view class="week flex flex-ac" gap-20px :class="{ active: item.active }" @click="item.active = !item.active">
          <text>
            {{ item.weekName }}
          </text>
          <wd-switch v-model="item.active" size="24px" active-color="#1A66FF" @change="changeItemActive(item)" />
        </view>
        <view flex flex-ac @click="showPicker(item, index)">
          <view c-3B3D3D pr-10rpx>
            {{ item.startTime }}-{{ item.endTime }}
          </view>
          <wd-icon name="arrow-right" size="16px" color="#bfbfbf" />
        </view>
      </view>
    </view>
  </view>
  <view mx-40rpx mt-48rpx color-white @click="save">
    <wd-button size="large" custom-class="theme-bg" block>
      <view flex flex-cc>
        <text>保存</text>
      </view>
    </wd-button>
  </view>

  <wd-popup v-model="showPop" position="bottom" custom-style="height: 350px;">
    <view tc mt10px fb>
      工作时间
    </view>
    <view h-12px />
    <view flex flex-cc gap-10px>
      <view wp50>
        <wd-datetime-picker-view v-model="value1" type="time" :filter="filter15Minutes" />
      </view>
      <view>-</view>
      <view wp50>
        <wd-datetime-picker-view v-model="value2" type="time" :filter="filter15Minutes" />
      </view>
    </view>

    <view mx-40rpx mt-20rpx color-white @click="confirm">
      <wd-button size="large" custom-class="theme-bg" block>
        <view flex flex-cc>
          <text>确定</text>
        </view>
      </wd-button>
    </view>
  </wd-popup>
</template>

<style lang='scss' scoped>
.week {
  height: 72rpx;
  line-height: 72rpx;
  text-align: center;
  font-size: 28rpx;
}
</style>
