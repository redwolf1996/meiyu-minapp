<route lang="yaml">
layout: common
style:
  navigationBarTitleText: 预约时间
</route>

<script lang="ts" setup>
import type { Times } from '@/utils'
import type { TimeOccupy } from './types'
import { flatten } from 'lodash-es'
import type { Data } from '../booking/types'

const tw = +new Date().getDay()
const curWeek = ref(tw === 0 ? 7 : tw)
const today = fd(+new Date())
const day = ref(fd(+new Date()))
const stime = ref('')
const duration = ref(0)
const etime = computed(() => calculateEndTime(stime.value, duration.value))
const selectedTime = computed(() => {
  if (!stime.value)
    return ''
  return `${day.value} ${stime.value}-${etime.value}`
})
const times = ref()
const workStime = ref('')
const workEtime = ref('')
const workWeeks = ref([])

onShow(() => {
  init()
})

// 设置总时长
function setTotalDuration() {
  let tmpDuration = 0
  bookInfo.value.service.map((v) => {
    tmpDuration += v.duration * v.goodsCount
  })
  duration.value = tmpDuration
}

async function init() {
  const re = await request.get<Data>(`/business/store/${storeId.value}`)
  workStime.value = re.data.workStime.slice(0, -3)
  workEtime.value = re.data.workEtime.slice(0, -3)
  workWeeks.value = re.data.workWeek || [1, 2, 3, 4, 5, 6, 7]
  times.value = generateTimeSlots(workStime.value, workEtime.value)

  const params = {
    storeId: storeId.value,
    artisanId: bookInfo.value?.artisanId,
    cDate: day.value,
  }
  const res = await request.get<TimeOccupy[]>('/business/booking-artisan', params)
  const employIndexes = flatten(res.data.map(v => v.employIndex)) // 后端计算的disabled时间点index

  setTotalDuration()

  const newIndexes = groupSortedConsecutive(employIndexes)
  const endTimeIndexes = newIndexes?.map(v => v?.[0]) // 结束时间点集合（每一段disabled的时间点的起始时间）

  let lastSelectableIndex = 0
  // 从当前时间开始加上服务时长，如果超过结束时间，则该时间点包括以后的时间点都不可选
  for (let i = 0; i < times.value.length; i++) {
    if (isTimeExceeding(times.value[i].value, workEtime.value, duration.value)) {
      lastSelectableIndex = i
      break
    }
  }

  const endTimes = []
  for (let i = 0; i < times.value.length; i++) {
    if (endTimeIndexes.includes(i)) {
      endTimes.push(times.value[i].value)
    }
  }

  const disabledIndexedFront = []
  for (let i0 = 0; i0 < times.value.length; i0++) {
    for (let i = 0; i < endTimes.length; i++) {
      if (isTimeExceeding(times.value[i0].value, endTimes[i], duration.value, 2)) {
        const disSindex = i0
        const disEindex = endTimeIndexes[i]
        const arr = generateArray(disSindex, disEindex)
        disabledIndexedFront.push(...arr)
      }
    }
  }
  disabledIndexedFront.shift()

  times.value = times.value.map((v, i) => {
    return {
      selected: v.selected,
      disabled: !workWeeks.value.includes(curWeek.value) || (i > lastSelectableIndex || disabledIndexedFront?.includes(i))
        ? true
        : (!!employIndexes.includes(i)),
      value: v.value,
    }
  })
}

onHide(() => {
  bookInfo.value = null
})

function calendarChange(e) {
  curWeek.value = e.lunar.nWeek
  day.value = e.fulldate
  init()
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

async function save() {
  bookStime.value = `${day.value} ${stime.value}`
  if (bookInfo.value?.bookId) {
    await request.put('/business/booking/time', {
      id: bookInfo.value.bookId,
      stime: `${bookStime.value}:00`,
    })
  }
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
    <view v-for="(itm, idx) in bookInfo?.service" :key="`info-${idx}`" tc>
      <text>{{ itm.name }}</text>
      <text c-1A66FF pl10px>
        {{ itm.duration }}分钟&nbsp;x{{ itm?.goodsCount }}
      </text>
    </view>
    <view f14 tc mt5px mb50rpx>
      <text>手艺人</text>
      <text c-1A66FF pl10px>
        {{ bookInfo.artName || '未分配' }}
      </text>
    </view>
    <scroll-view :style="{ height: '344px', width: '100%' }" scroll-y>
      <view class="my-table">
        <template v-for="item in times" :key="item.value">
          <view class="item pr" :class="{ selected: item.selected, disabled: item.disabled }" @click="clickItem(item)">
            {{ item.value }}
            <wd-icon v-if="item.selected" name="check" color="rgba(255,255,255,0.8)" size="20px" custom-style="position:absolute;left:50%;top:50%;transform:translate(-50%, -50%)" />
          </view>
        </template>
      </view>
    </scroll-view>
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
  height: 100%;
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
