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

// 添加临时变量，用于存储打开弹窗前的状态
const tempSelectedDateType = ref('')
const tempSearchParams = ref({
  sDate: '',
  eDate: '',
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
function changeSearchParams() {
  if (!showSearchParams.value) {
    // 打开弹窗前，保存当前状态
    tempSelectedDateType.value = selectedDateType.value
    tempSearchParams.value = {
      sDate: searchParams.value.sDate,
      eDate: searchParams.value.eDate,
    }
  }
  showSearchParams.value = !showSearchParams.value
}

function selectDateType(type: string) {
  selectedDateType.value = type

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
  }
}

function handleDatePicked({ value }: { value: string }) {
  // 日报日期选择处理
  searchParams.value.sDate = dayjs(Number(value)).format('YYYY-MM-DD')
  searchParams.value.eDate = dayjs(Number(value)).format('YYYY-MM-DD')
}

function handleMonthPicked({ value }: { value: string }) {
  // 月报月份选择处理
  const monthObj = dayjs(value)
  searchParams.value.sDate = monthObj.startOf('month').format('YYYY-MM-DD')
  searchParams.value.eDate = monthObj.endOf('month').format('YYYY-MM-DD')
}

function handleRangePicked({ value }: { value: any[] }) {
  // 自定义日期范围选择处理
  searchParams.value.sDate = dayjs(Number(value[0])).format('YYYY-MM-DD')
  searchParams.value.eDate = dayjs(Number(value[1])).format('YYYY-MM-DD')
}

function confirmDateSelection() {
  // 确认选择，关闭弹窗
  showSearchParams.value = false

  // 根据当前 tab 触发不同接口的数据请求
  // 由于各个子组件都通过 watch(props.searchParams) 监听日期变化
  // 我们通过强制更新 searchParams 来触发数据刷新
  const currentParams = { ...searchParams.value }
  searchParams.value = currentParams
}

// 取消选择或关闭弹窗时恢复原状态
function cancelSelection() {
  // 恢复到打开弹窗前的状态
  selectedDateType.value = tempSelectedDateType.value
  searchParams.value.sDate = tempSearchParams.value.sDate
  searchParams.value.eDate = tempSearchParams.value.eDate
  showSearchParams.value = false
}

const defaultValue = ref<number>(Date.now())
const tempDate = ref('')
const tempMonth = ref('')
const tempRange = ref([])
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
        <ManageData :search-params="searchParams" />
      </view>
      <view v-if="tab === 1">
        <CustomerAnalysis :search-params="searchParams" />
      </view>
      <view v-if="tab === 2">
        <StaffAchievements :search-params="searchParams" />
      </view>
      <view v-if="tab === 3">
        <StaffStatistics :search-params="searchParams" />
      </view>
    </view>
  </view>

  <wd-popup v-model="showSearchParams" position="bottom" closable :safe-area-inset-bottom="true" custom-style="border-radius:32rpx;" @close="cancelSelection">
    <view style="height: 500px">
      <view fb tc c-#232220 mt15px>
        选择查询日期
      </view>
      <view class="ct-wrapper" px20px py12px>
        <view mb20px>
          <view class="date-range" text-center py10px mb20px>
            {{ dateRange || '请选择日期' }}
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

          <view class="date-row" mb25px>
            <view class="picker-wrapper">
              <wd-datetime-picker
                v-model="tempDate"
                class="layout-picker"
                :default-value="defaultValue"
                type="date"
                use-default-slot
                @confirm="handleDatePicked"
              >
                <view class="date-option" :class="{ active: selectedDateType === '日报' }" @click="selectDateType('日报')">
                  日报
                </view>
              </wd-datetime-picker>
            </view>
            <view class="picker-wrapper">
              <wd-datetime-picker
                v-model="tempMonth"
                class="layout-picker"
                :default-value="defaultValue"
                type="year-month"
                use-default-slot
                @confirm="handleMonthPicked"
              >
                <view class="date-option" :class="{ active: selectedDateType === '月报' }" @click="selectDateType('月报')">
                  月报
                </view>
              </wd-datetime-picker>
            </view>
            <view class="picker-wrapper">
              <wd-datetime-picker
                v-model="tempRange"
                class="layout-picker"
                type="date"
                use-default-slot
                @confirm="handleRangePicked"
              >
                <view class="date-option" :class="{ active: selectedDateType === '自定义' }" @click="selectDateType('自定义')">
                  自定义
                </view>
              </wd-datetime-picker>
            </view>
          </view>

          <view class="action-buttons" flex>
            <view class="cancel-btn" flex-1 @click="cancelSelection">
              取消
            </view>
            <view class="confirm-btn" flex-1 @click="confirmDateSelection">
              确定
            </view>
          </view>
        </view>
      </view>
    </view>
  </wd-popup>

  <MyTabBar :tab-index="3" />
</template>

<style lang='scss' scoped>
.date-row {
  display: flex !important;
  gap: 12px !important;
  width: 100% !important;
  .picker-wrapper {
    flex: 1 !important;
    min-width: 0 !important;
  }
}

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
  padding: 10px 12px;
  border-radius: 4px;
  background-color: #f4f4f5;
  color: #606266;
  font-size: 14px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid transparent;
  width: 100%;
  box-sizing: border-box;
  &.active {
    background-color: #eaeafb;
    color: #4d49de;
    border-color: #4d49de;
  }
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
