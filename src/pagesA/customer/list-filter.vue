<route lang="yaml">
layout: common
style:
  navigationBarTitleText: 筛选客户
</route>

<script lang="ts" setup>
import dayjs from 'dayjs'

// 生日相关
const birthday = ref<any>(null)
const birthdayRange = ref<number[]>([]) // 生日范围选择
const birthdayDays = ref<any>(null) // 最新X天过生日
const sources = ref<any>([
  { label: '当天生日', value: 1, isActive: false },
  { label: '当月生日', value: 2, isActive: false },
])

// 成为客户时间相关
const customerTimeRange = ref<number[]>([]) // 成为客户时间范围选择
const customerTimeSources = ref<any>([
  { label: '今天', value: 1, isActive: false },
  { label: '昨天', value: 2, isActive: false },
  { label: '本周', value: 3, isActive: false },
  { label: '本月', value: 4, isActive: false },
  { label: '上月', value: 5, isActive: false },
])
const customerTime = ref<any>(null)

// 筛选参数
const filterParams = reactive({
  birthdayS: '',
  birthdayE: '',
  cDateS: '',
  cDateE: '',
})

// 初始化筛选条件（从本地存储读取）
onLoad(() => {
  const savedFilter = uni.getStorageSync('customer_filter_params')
  if (savedFilter) {
    filterParams.birthdayS = savedFilter.birthdayS || ''
    filterParams.birthdayE = savedFilter.birthdayE || ''
    filterParams.cDateS = savedFilter.cDateS || ''
    filterParams.cDateE = savedFilter.cDateE || ''

    // 恢复最新X天过生日的设置
    if (filterParams.birthdayS && filterParams.birthdayE) {
      const start = dayjs(filterParams.birthdayS)
      const end = dayjs(filterParams.birthdayE)
      const today = dayjs()

      // 如果开始日期是今天，计算天数差
      if (start.isSame(today, 'day')) {
        const daysDiff = end.diff(today.startOf('day'), 'day')
        if (daysDiff > 0) {
          birthdayDays.value = daysDiff
        }
      }
    }

    // 根据日期恢复标签选择状态
    if (filterParams.birthdayS && filterParams.birthdayE) {
      const start = dayjs(filterParams.birthdayS)
      const end = dayjs(filterParams.birthdayE)
      const today = dayjs()

      // 判断是否是当天生日
      if (start.isSame(today, 'day') && end.isSame(today, 'day')) {
        birthday.value = 1
      }
      // 判断是否是当月生日
      else if (start.isSame(today.startOf('month'), 'day') && end.isSame(today.endOf('month'), 'day')) {
        birthday.value = 2
      }
      else {
        // 恢复日期范围
        birthdayRange.value = [start.valueOf(), end.valueOf()]
      }
    }

    // 根据日期恢复成为客户时间标签选择状态
    if (filterParams.cDateS && filterParams.cDateE) {
      const start = dayjs(filterParams.cDateS)
      const end = dayjs(filterParams.cDateE)
      const today = dayjs()
      const yesterday = today.subtract(1, 'day')
      const thisWeekStart = today.startOf('week')
      const thisWeekEnd = today.endOf('week')
      const thisMonthStart = today.startOf('month')
      const thisMonthEnd = today.endOf('month')
      const lastMonthStart = today.subtract(1, 'month').startOf('month')
      const lastMonthEnd = today.subtract(1, 'month').endOf('month')

      // 判断是哪个标签
      if (start.isSame(today, 'day') && end.isSame(today, 'day')) {
        customerTime.value = 1 // 今天
      }
      else if (start.isSame(yesterday, 'day') && end.isSame(yesterday, 'day')) {
        customerTime.value = 2 // 昨天
      }
      else if (start.isSame(thisWeekStart, 'day') && end.isSame(thisWeekEnd, 'day')) {
        customerTime.value = 3 // 本周
      }
      else if (start.isSame(thisMonthStart, 'day') && end.isSame(thisMonthEnd, 'day')) {
        customerTime.value = 4 // 本月
      }
      else if (start.isSame(lastMonthStart, 'day') && end.isSame(lastMonthEnd, 'day')) {
        customerTime.value = 5 // 上月
      }
      else {
        // 恢复日期范围
        customerTimeRange.value = [start.valueOf(), end.valueOf()]
      }
    }
  }
})

// 生日范围选择确认
function handleBirthdayRangeConfirm({ value }) {
  if (value && value.length === 2) {
    filterParams.birthdayS = dayjs(value[0]).format('YYYY-MM-DD')
    filterParams.birthdayE = dayjs(value[1]).format('YYYY-MM-DD')
    // 清空标签选择
    birthday.value = null
  }
}

// 成为客户时间范围选择确认
function handleCustomerTimeRangeConfirm({ value }) {
  if (value && value.length === 2) {
    filterParams.cDateS = dayjs(value[0]).format('YYYY-MM-DD')
    filterParams.cDateE = dayjs(value[1]).format('YYYY-MM-DD')
    // 清空标签选择
    customerTime.value = null
  }
}

// 重置筛选条件
function resetSearch() {
  birthday.value = null
  birthdayRange.value = []
  birthdayDays.value = null
  customerTime.value = null
  customerTimeRange.value = []
  filterParams.birthdayS = ''
  filterParams.birthdayE = ''
  filterParams.cDateS = ''
  filterParams.cDateE = ''
}

// 监听生日标签选择变化
watch(birthday, (newVal) => {
  if (newVal !== null) {
    birthdayRange.value = []
    birthdayDays.value = null
  }
})

// 监听生日范围选择变化
watch(birthdayRange, (newVal) => {
  if (newVal && newVal.length === 2) {
    birthday.value = null
    birthdayDays.value = null
  }
})

// 监听最新X天过生日变化
watch(birthdayDays, (newVal) => {
  if (newVal !== null && newVal > 0) {
    birthday.value = null
    birthdayRange.value = []
  }
})

// 监听成为客户时间标签选择变化
watch(customerTime, (newVal) => {
  if (newVal !== null) {
    customerTimeRange.value = []
  }
})

// 监听成为客户时间范围选择变化
watch(customerTimeRange, (newVal) => {
  if (newVal && newVal.length === 2) {
    customerTime.value = null
  }
})

// 确认筛选
function confirmFilter() {
  // 处理生日筛选：三种方式互相排斥，只能有一个存在

  // 1. 处理标签选择（当天生日、当月生日）
  if (birthday.value === 1) { // 当天生日
    filterParams.birthdayS = dayjs().format('YYYY-MM-DD')
    filterParams.birthdayE = dayjs().format('YYYY-MM-DD')
    birthdayRange.value = [] // 清空范围选择
    birthdayDays.value = null // 清空天数输入
  }
  else if (birthday.value === 2) { // 当月生日
    filterParams.birthdayS = dayjs().startOf('month').format('YYYY-MM-DD')
    filterParams.birthdayE = dayjs().endOf('month').format('YYYY-MM-DD')
    birthdayRange.value = [] // 清空范围选择
    birthdayDays.value = null // 清空天数输入
  }
  // 2. 处理日期范围选择
  else if (birthdayRange.value.length === 2) {
    filterParams.birthdayS = dayjs(birthdayRange.value[0]).format('YYYY-MM-DD')
    filterParams.birthdayE = dayjs(birthdayRange.value[1]).format('YYYY-MM-DD')
    birthday.value = null // 清空标签选择
    birthdayDays.value = null // 清空天数输入
  }
  // 3. 处理最新X天过生日
  else if (birthdayDays.value !== null && birthdayDays.value > 0) {
    const today = dayjs().startOf('day')
    filterParams.birthdayS = today.format('YYYY-MM-DD')
    filterParams.birthdayE = today.add(birthdayDays.value, 'day').format('YYYY-MM-DD')
    birthday.value = null // 清空标签选择
    birthdayRange.value = [] // 清空范围选择
  }
  // 4. 都没有选择，清空所有生日筛选
  else {
    filterParams.birthdayS = ''
    filterParams.birthdayE = ''
  }

  // 处理成为客户时间标签选择
  if (customerTime.value === null && customerTimeRange.value.length === 0) {
    filterParams.cDateS = ''
    filterParams.cDateE = ''
  }
  if (customerTime.value === 1) { // 今天
    filterParams.cDateS = dayjs().format('YYYY-MM-DD')
    filterParams.cDateE = dayjs().format('YYYY-MM-DD')
    customerTimeRange.value = []
  }
  if (customerTime.value === 2) { // 昨天
    filterParams.cDateS = dayjs().subtract(1, 'day').format('YYYY-MM-DD')
    filterParams.cDateE = dayjs().subtract(1, 'day').format('YYYY-MM-DD')
    customerTimeRange.value = []
  }
  if (customerTime.value === 3) { // 本周
    filterParams.cDateS = dayjs().startOf('week').format('YYYY-MM-DD')
    filterParams.cDateE = dayjs().endOf('week').format('YYYY-MM-DD')
    customerTimeRange.value = []
  }
  if (customerTime.value === 4) { // 本月
    filterParams.cDateS = dayjs().startOf('month').format('YYYY-MM-DD')
    filterParams.cDateE = dayjs().endOf('month').format('YYYY-MM-DD')
    customerTimeRange.value = []
  }
  if (customerTime.value === 5) { // 上月
    filterParams.cDateS = dayjs().subtract(1, 'month').startOf('month').format('YYYY-MM-DD')
    filterParams.cDateE = dayjs().subtract(1, 'month').endOf('month').format('YYYY-MM-DD')
    customerTimeRange.value = []
  }

  // 保存筛选条件到本地存储
  uni.setStorageSync('customer_filter_params', {
    birthdayS: filterParams.birthdayS,
    birthdayE: filterParams.birthdayE,
    cDateS: filterParams.cDateS,
    cDateE: filterParams.cDateE,
  })

  // 返回上一页
  uni.navigateBack()
}
</script>

<template>
  <view class="filter-container">
    <view p-24rpx bg-F9F9F9>
      <view bg-white rd-10px p-24rpx>
        <view f14 mb-16px>
          生日
        </view>
        <GridTagSelect v-model="birthday" :sources="sources" />
        <view mt-32rpx>
          <wd-calendar
            v-model="birthdayRange"
            type="daterange"
            label="范围"
            placeholder="请选择日期范围"
            :show-confirm="false"
            @confirm="handleBirthdayRangeConfirm"
          />
        </view>
        <view flex flex-ac f13 style="color: #929292;gap: 32rpx;padding:0 20px;">
          <text>最新</text>
          <input
            v-model="birthdayDays"
            type="number"
            style="width: 190rpx;height: 64rpx;
            height: 64rpx;text-align: center;
            background-color: #F6F6FB;"
          >
          <text>天过生日</text>
        </view>
      </view>

      <view bg-white rd-10px p-24rpx mt-24rpx>
        <view f14 mb-16px>
          成为客户时间
        </view>
        <GridTagSelect v-model="customerTime" :sources="customerTimeSources" :columns="3" />
        <view mt-32rpx>
          <wd-calendar
            v-model="customerTimeRange"
            type="daterange"
            label="范围"
            placeholder="请选择日期范围"
            :show-confirm="false"
            @confirm="handleCustomerTimeRangeConfirm"
          />
        </view>
      </view>

      <view flex tc flex-cc mt-24rpx px-112rpx gap-40rpx py-20rpx>
        <button class="my-btn normal" w-220rpx @click="resetSearch()">
          重置
        </button>
        <button class="my-btn theme" w-280rpx @click="confirmFilter()">
          查看50个客户
        </button>
      </view>
    </view>
  </view>
</template>

<style lang='scss' scoped>
.filter-container {
  min-height: 100vh;
  background-color: #f9f9f9;
}

.my-btn {
  padding: 32rpx 0 !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
}

:deep(.wd-calendar__label) {
  color: #929292 !important;
}
</style>
