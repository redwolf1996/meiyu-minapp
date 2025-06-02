<route lang="yaml">
style:
  navigationBarTitleText: 数据
  navigationStyle: custom
</route>

<script lang="ts" setup>
import MyTabBar from './MyTabBar.vue'
import CustomerAnalysis from './components-data/customer-analysis.vue'
import ManageData from './components-data/manage-data.vue'
import StaffAchievements from './components-data/staff-achievements.vue'
import StaffStatistics from './components-data/staff-statistics.vue'
import dayjs from 'dayjs'

const tab = ref(0)
const tabs = [{
  label: '经营数据',
}, {
  label: '客户分析',
}, {
  label: '员工业绩',
}, {
  label: '员工统计',
}]
const showSearchParams = ref(false)
const selectedDateType = ref('今天')

const searchParams = ref({
  sDate: dayjs().format('YYYY-MM-DD'), // 开始日期 YYYY-MM-DD
  eDate: dayjs().format('YYYY-MM-DD'), // 结束日期 YYYY-MM-DD
})

const dateRange = computed(() => {
  if (searchParams.value.sDate && searchParams.value.eDate) {
    if (searchParams.value.sDate === searchParams.value.eDate) {
      return searchParams.value.sDate
    }
    return `${searchParams.value.sDate} 至 ${searchParams.value.eDate}`
  }
  return ''
})

// 日期选择相关
const showDatePicker = ref(false)
const showMonthPicker = ref(false)
const showRangePicker = ref(false)
const currentDate = ref('')
const currentMonth = ref('')
const currentStartDate = ref('')
const currentEndDate = ref('')

function changeSearchParams() {
  showSearchParams.value = !showSearchParams.value
}

function selectDateType(type: string) {
  selectedDateType.value = type

  // 重置所有选择器
  showDatePicker.value = false
  showMonthPicker.value = false
  showRangePicker.value = false

  // 定义日期变量
  let today: string, yesterday: string, weekStart: string, weekEnd: string
  let lastWeekStart: string, lastWeekEnd: string, monthStart: string, monthEnd: string
  let lastMonthStart: string, lastMonthEnd: string

  // 根据选择的类型设置日期
  switch (type) {
    case '今天':
      today = dayjs().format('YYYY-MM-DD')
      searchParams.value.sDate = today
      searchParams.value.eDate = today
      break
    case '昨天':
      yesterday = dayjs().subtract(1, 'day').format('YYYY-MM-DD')
      searchParams.value.sDate = yesterday
      searchParams.value.eDate = yesterday
      break
    case '本周':
      weekStart = dayjs().startOf('week').format('YYYY-MM-DD')
      weekEnd = dayjs().endOf('week').format('YYYY-MM-DD')
      searchParams.value.sDate = weekStart
      searchParams.value.eDate = weekEnd
      break
    case '上周':
      lastWeekStart = dayjs().subtract(1, 'week').startOf('week').format('YYYY-MM-DD')
      lastWeekEnd = dayjs().subtract(1, 'week').endOf('week').format('YYYY-MM-DD')
      searchParams.value.sDate = lastWeekStart
      searchParams.value.eDate = lastWeekEnd
      break
    case '本月':
      monthStart = dayjs().startOf('month').format('YYYY-MM-DD')
      monthEnd = dayjs().endOf('month').format('YYYY-MM-DD')
      searchParams.value.sDate = monthStart
      searchParams.value.eDate = monthEnd
      break
    case '上月':
      lastMonthStart = dayjs().subtract(1, 'month').startOf('month').format('YYYY-MM-DD')
      lastMonthEnd = dayjs().subtract(1, 'month').endOf('month').format('YYYY-MM-DD')
      searchParams.value.sDate = lastMonthStart
      searchParams.value.eDate = lastMonthEnd
      break
    case '日报':
      // showDatePicker.value = true
      currentDate.value = dayjs().format('YYYY-MM-DD')
      break
    case '月报':
      showMonthPicker.value = true
      currentMonth.value = dayjs().format('YYYY-MM')
      break
    case '自定义':
      showRangePicker.value = true
      currentStartDate.value = dayjs().subtract(7, 'day').format('YYYY-MM-DD')
      currentEndDate.value = dayjs().format('YYYY-MM-DD')
      break
  }
}

function handleDatePicked() {
  // 日报日期选择处理
  searchParams.value.sDate = currentDate.value
  searchParams.value.eDate = currentDate.value
  showDatePicker.value = false
}

function handleMonthPicked() {
  // 月报月份选择处理
  const monthObj = dayjs(currentMonth.value)
  searchParams.value.sDate = monthObj.startOf('month').format('YYYY-MM-DD')
  searchParams.value.eDate = monthObj.endOf('month').format('YYYY-MM-DD')
  showMonthPicker.value = false
}

function handleRangePicked() {
  // 自定义日期范围选择处理
  searchParams.value.sDate = currentStartDate.value
  searchParams.value.eDate = currentEndDate.value
  showRangePicker.value = false
}

function confirmDateSelection() {
  // 确认选择，关闭弹窗
  showSearchParams.value = false
}
</script>

<template>
  <view class="fixed-header">
    <MyNavBar title="数据" :capsule="false" />
    <wd-tabs v-model="tab" active-color="#1A66FF">
      <block v-for="item in tabs" :key="item.label">
        <wd-tab :title="item.label" />
      </block>
    </wd-tabs>
    <view fs-14px flex flex-ac gap-10px h48px bg-white py14px px16px @click="changeSearchParams">
      <text>{{ selectedDateType }}</text>
      <text>|</text>
      <text>{{ dateRange || '请选择日期' }}</text>
      <wd-icon v-if="!showSearchParams" name="arrow-down" color="#3B3D3D" size="16px" />
      <wd-icon v-else name="arrow-up" color="#3B3D3D" size="16px" />
    </view>
    <view class="gap" />
  </view>
  <view class="content-wrapper">
    <view>
      <view v-if="tab === 0">
        <ManageData />
      </view>
      <view v-if="tab === 1">
        <CustomerAnalysis />
      </view>
      <view v-if="tab === 2">
        <StaffAchievements />
      </view>
      <view v-if="tab === 3">
        <StaffStatistics />
      </view>
    </view>
  </view>

  <wd-popup v-model="showSearchParams" position="bottom" closable :safe-area-inset-bottom="true" custom-style="border-radius:32rpx;">
    <view style="height: 540px">
      <view fb tc c-#232220 mt15px>
        选择查询日期
      </view>
      <view class="ct-wrapper" px20px py12px>
        <view mb20px>
          <view class="date-range" text-center py10px mb20px>
            {{ dateRange || '请选择日期' }}
            <wd-icon name="arrow-down" color="#999" size="14px" />
          </view>

          <view class="date-options" mb20px>
            <view class="date-row" flex justify-between mb15px>
              <view class="date-option" :class="{ active: selectedDateType === '今天' }" @click="selectDateType('今天')">
                今天
              </view>
              <view class="date-option" :class="{ active: selectedDateType === '昨天' }" @click="selectDateType('昨天')">
                昨天
              </view>
              <view class="date-option" :class="{ active: selectedDateType === '本周' }" @click="selectDateType('本周')">
                本周
              </view>
            </view>

            <view class="date-row" flex justify-between mb25px>
              <view class="date-option" :class="{ active: selectedDateType === '上周' }" @click="selectDateType('上周')">
                上周
              </view>
              <view class="date-option" :class="{ active: selectedDateType === '本月' }" @click="selectDateType('本月')">
                本月
              </view>
              <view class="date-option" :class="{ active: selectedDateType === '上月' }" @click="selectDateType('上月')">
                上月
              </view>
            </view>
          </view>

          <view class="other-time" mb15px>
            其他时间
          </view>

          <view class="date-row" flex justify-between mb25px>
            <wd-datetime-picker
              v-model="searchParams.sDate" label="开始日期" type="date" format="YYYY-MM-DD" value-format="YYYY-MM-DD"
            >
              <view class="date-option" :class="{ active: selectedDateType === '日报' }" @click="selectDateType('日报')">
                日报
              </view>
            </wd-datetime-picker>

            <view class="date-option" :class="{ active: selectedDateType === '月报' }" @click="selectDateType('月报')">
              月报
            </view>
            <view class="date-option" :class="{ active: selectedDateType === '自定义' }" @click="selectDateType('自定义')">
              自定义
            </view>
          </view>

          <!-- 日报日期选择器 -->
          <view v-if="showDatePicker" class="picker-container" mb20px>
            <wd-datetime-picker
              v-model="currentDate"
              label="选择日期"
              type="date"
              format="YYYY-MM-DD"
              value-format="YYYY-MM-DD"
              @confirm="handleDatePicked"
            />
          </view>

          <!-- 月报月份选择器 -->
          <view v-if="showMonthPicker" class="picker-container" mb20px>
            <wd-datetime-picker
              v-model="currentMonth"
              label="选择月份"
              type="year-month"
              format="YYYY-MM"
              value-format="YYYY-MM"
              @confirm="handleMonthPicked"
            />
          </view>

          <!-- 自定义日期范围选择器 -->
          <view v-if="showRangePicker" class="picker-container" mb20px>
            <view mb10px>
              <wd-datetime-picker
                v-model="currentStartDate"
                label="开始日期"
                type="date"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
              />
            </view>
            <view>
              <wd-datetime-picker
                v-model="currentEndDate"
                label="结束日期"
                type="date"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                @confirm="handleRangePicked"
              />
            </view>
          </view>
        </view>

        <view class="action-buttons" flex>
          <view class="cancel-btn" flex-1 @click="showSearchParams = false">
            取消
          </view>
          <view class="confirm-btn" flex-1 @click="confirmDateSelection">
            确定
          </view>
        </view>
      </view>
    </view>
  </wd-popup>

  <MyTabBar :tab-index="3" />
</template>

<style lang='scss' scoped>
.fixed-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background-color: #fff;
}

.gap {
  height: 10px;
  background-color: #f5f5f5;
}

.content-wrapper {
  margin-top: calc(44px + 44px + 48px); // 导航栏高度 + 标签栏高度 + 日期选择器高度
}

.date-range {
  color: #333;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.date-option {
  background-color: #f5f5f5;
  color: #333;
  padding: 14px 0;
  border-radius: 4px;
  text-align: center;
  width: 30%;
  font-size: 14px;
  border: 1px solid transparent;
}

.date-option.active {
  background-color: #ede9fe;
  color: #6949ff;
  border: 1px solid #6949ff;
}

.other-time {
  font-size: 14px;
  color: #666;
}

.picker-container {
  background-color: #f8f8f8;
  padding: 15px;
  border-radius: 4px;
}

.action-buttons {
  position: absolute;
  bottom: 100px;
  left: 20px;
  right: 20px;
  gap: 15px;
}

.cancel-btn {
  background-color: #f5f5f5;
  color: #333;
  height: 44px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
}

.confirm-btn {
  background-color: #6949ff;
  color: white;
  height: 44px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
}
</style>
