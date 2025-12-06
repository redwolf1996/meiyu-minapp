<route lang="yaml">
layout: common
style:
  navigationBarTitleText: 筛选客户
</route>

<script lang="ts" setup>
import dayjs from 'dayjs'
import { customerFilterParamsStore, selectedCardsStore } from '@/stores/common'

// 生日相关
const birthday = ref<any>(null)
const birthdayRange = ref<number[]>([]) // 生日范围选择
const birthdayDays = ref<any>(null) // 最新X天过生日
const sources = ref<any>([
  { label: '当天生日', value: 1, isActive: false },
  { label: '当月生日', value: 2, isActive: false },
])

const showCardType = ref(false)
const cardMode = ref<number | null>(null) // 0任意卡项，1指定卡项，2指定类型卡
const cardType = ref<any>([])
const cardTypeSources = ref<any>([
  { label: '折扣卡', value: 3, isActive: false },
  { label: '充值卡', value: 2, isActive: false },
  { label: '通卡', value: 4, isActive: false },
  { label: '有限次卡', value: 5, isActive: false },
  { label: '不限次卡', value: 6, isActive: false },
])

// 成为客户时间相关
const customerTimeRange = ref<number[]>([]) // 成为客户时间范围选择
const selectedCardNames = ref<string[]>([]) // 选中的卡片名称
const selectedCardTypeLabels = computed(() => {
  return cardTypeSources.value
    .filter(source => cardType.value.includes(source.value))
    .map(source => source.label)
})

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
  cardAll: null, // 1 任意卡项；指定卡id或者卡类型是传值0；null表示未选择
  cardIds: '', // 指定卡，id逗号分隔（指定卡项时，卡id）
  cardTypes: '', // 指定卡类型，id逗号分隔（指定类型时，类型id）
})

// 初始化筛选条件（从全局 store 读取）
onLoad(() => {
  // 从全局 store 恢复筛选参数
  if (customerFilterParamsStore.value.birthdayS || customerFilterParamsStore.value.birthdayE || customerFilterParamsStore.value.cDateS || customerFilterParamsStore.value.cDateE || customerFilterParamsStore.value.cardIds || customerFilterParamsStore.value.cardAll !== null || customerFilterParamsStore.value.cardTypes) {
    filterParams.birthdayS = customerFilterParamsStore.value.birthdayS
    filterParams.birthdayE = customerFilterParamsStore.value.birthdayE
    filterParams.cDateS = customerFilterParamsStore.value.cDateS
    filterParams.cDateE = customerFilterParamsStore.value.cDateE
    filterParams.cardIds = customerFilterParamsStore.value.cardIds
    filterParams.cardAll = customerFilterParamsStore.value.cardAll
    selectedCardNames.value = customerFilterParamsStore.value.selectedCardNames
    cardType.value = customerFilterParamsStore.value.cardTypes ? customerFilterParamsStore.value.cardTypes.split(',').map(Number) : []

    // 根据 cardAll 恢复 cardMode
    if (filterParams.cardAll === 1) {
      cardMode.value = 0 // 任意卡项
    }
    else if (filterParams.cardAll === 0 && filterParams.cardIds) {
      cardMode.value = 1 // 指定卡项
    }
    else if (filterParams.cardAll === 0 && cardType.value.length > 0) {
      cardMode.value = 2 // 指定卡类型
    }
  }

  // 从全局 store 恢复卡项选择
  if (selectedCardsStore.value.ids) {
    filterParams.cardIds = selectedCardsStore.value.ids
    selectedCardNames.value = selectedCardsStore.value.names
  }

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
      // 日期范围已经在 filterParams 中，picker 组件会自动显示
      // 这里不需要额外处理
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
      // 日期范围已经在 filterParams 中，picker 组件会自动显示
      // 这里不需要额外处理
    }
  }
})

// 生日范围选择确认
// function handleBirthdayRangeConfirm({ value }) {
//   if (value && value.length === 2) {
//     filterParams.birthdayS = dayjs(value[0]).format('YYYY-MM-DD')
//     filterParams.birthdayE = dayjs(value[1]).format('YYYY-MM-DD')
//     // 清空标签选择
//     birthday.value = null
//   }
// }

// 重置筛选条件
function resetSearch() {
  birthday.value = null
  birthdayRange.value = []
  birthdayDays.value = null
  customerTime.value = null
  customerTimeRange.value = []
  cardMode.value = null
  cardType.value = []
  filterParams.birthdayS = ''
  filterParams.birthdayE = ''
  filterParams.cDateS = ''
  filterParams.cDateE = ''
  filterParams.cardIds = ''
  filterParams.cardAll = null
  filterParams.cardTypes = null
  selectedCardNames.value = []
  // 清空卡类型的选中状态
  cardTypeSources.value.forEach((item) => {
    item.isActive = false
  })
  // 重置全局 store
  selectedCardsStore.value = {
    ids: '',
    names: [],
  }
  customerFilterParamsStore.value = {
    birthdayS: '',
    birthdayE: '',
    cDateS: '',
    cDateE: '',
    cardIds: '',
    selectedCardNames: [],
    cardAll: null,
    cardTypes: null,
  }
}

// 监听生日标签选择变化
watch(birthday, (newVal) => {
  if (newVal !== null) {
    birthdayRange.value = []
    birthdayDays.value = null
    // 清空日期范围
    filterParams.birthdayS = ''
    filterParams.birthdayE = ''
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
    // 清空日期范围
    filterParams.birthdayS = ''
    filterParams.birthdayE = ''
  }
})

// 监听成为客户时间标签选择变化
watch(customerTime, (newVal) => {
  if (newVal !== null) {
    customerTimeRange.value = []
    // 清空日期范围
    filterParams.cDateS = ''
    filterParams.cDateE = ''
  }
})

// 监听卡项模式变化，更新 cardAll
watch(cardMode, (newVal) => {
  if (newVal === 0) {
    // 任意卡项
    filterParams.cardAll = 1
  }
  else if (newVal === 1 || newVal === 2) {
    // 指定卡项或指定卡类型
    filterParams.cardAll = 0
  }
  else {
    // 未选择
    filterParams.cardAll = null
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
  // 2. 处理日期范围选择（通过 picker 选择）
  else if (filterParams.birthdayS || filterParams.birthdayE) {
    // 日期已经在 picker 的 change 事件中更新到 filterParams，这里不需要再处理
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

  // 处理成为客户时间
  if (customerTime.value === 1) { // 今天
    filterParams.cDateS = dayjs().format('YYYY-MM-DD')
    filterParams.cDateE = dayjs().format('YYYY-MM-DD')
    customerTimeRange.value = []
  }
  else if (customerTime.value === 2) { // 昨天
    filterParams.cDateS = dayjs().subtract(1, 'day').format('YYYY-MM-DD')
    filterParams.cDateE = dayjs().subtract(1, 'day').format('YYYY-MM-DD')
    customerTimeRange.value = []
  }
  else if (customerTime.value === 3) { // 本周
    filterParams.cDateS = dayjs().startOf('week').format('YYYY-MM-DD')
    filterParams.cDateE = dayjs().endOf('week').format('YYYY-MM-DD')
    customerTimeRange.value = []
  }
  else if (customerTime.value === 4) { // 本月
    filterParams.cDateS = dayjs().startOf('month').format('YYYY-MM-DD')
    filterParams.cDateE = dayjs().endOf('month').format('YYYY-MM-DD')
    customerTimeRange.value = []
  }
  else if (customerTime.value === 5) { // 上月
    filterParams.cDateS = dayjs().subtract(1, 'month').startOf('month').format('YYYY-MM-DD')
    filterParams.cDateE = dayjs().subtract(1, 'month').endOf('month').format('YYYY-MM-DD')
    customerTimeRange.value = []
  }
  // 处理日期范围选择（通过 picker 选择）
  else if (filterParams.cDateS || filterParams.cDateE) {
    // 日期已经在 picker 的 change 事件中更新到 filterParams，这里不需要再处理
  }
  // 都没有选择，清空所有成为客户时间筛选
  else {
    filterParams.cDateS = ''
    filterParams.cDateE = ''
  }

  // 保存筛选条件到全局 store
  customerFilterParamsStore.value = {
    birthdayS: filterParams.birthdayS,
    birthdayE: filterParams.birthdayE,
    cDateS: filterParams.cDateS,
    cDateE: filterParams.cDateE,
    cardIds: filterParams.cardIds,
    selectedCardNames: selectedCardNames.value,
    cardAll: filterParams.cardAll,
    cardTypes: cardType.value.length > 0 ? cardType.value.join(',') : null,
  }

  // 返回上一页
  uni.navigateBack()
}

function toCard() {
  // 在跳转前保存当前的选中状态到全局 store
  selectedCardsStore.value = {
    ids: filterParams.cardIds,
    names: selectedCardNames.value,
  }
  uni.navigateTo({ url: '/pagesA/card/select-card-multiple' })
}

function toCardType() {
  showCardType.value = true
}

// 监听页面显示，检查是否有返回的卡片数据或恢复筛选状态
onShow(() => {
  // 恢复卡片选择
  if (selectedCardsStore.value.ids) {
    filterParams.cardIds = selectedCardsStore.value.ids
    selectedCardNames.value = selectedCardsStore.value.names || []
  }
  else {
    // 如果 store 中没有选中的卡项，清空本地数据
    filterParams.cardIds = ''
    selectedCardNames.value = []
  }

  // 恢复生日筛选状态
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
  }
  else if (filterParams.birthdayS || filterParams.birthdayE) {
    // 如果只选择了一个日期，则清空标签选择，确保日期输入框显示
    birthday.value = null
    birthdayDays.value = null
  }

  // 恢复成为客户时间筛选状态
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
  }
  else if (filterParams.cDateS || filterParams.cDateE) {
    // 如果只选择了一个日期，则清空标签选择，确保日期输入框显示
    customerTime.value = null
  }

  // 恢复卡项模式和卡类型
  if (filterParams.cardAll === 1) {
    cardMode.value = 0 // 任意卡项
  }
  else if (filterParams.cardAll === 0 && filterParams.cardIds) {
    cardMode.value = 1 // 指定卡项
  }
  else if (filterParams.cardAll === 0 && cardType.value.length > 0) {
    cardMode.value = 2 // 指定卡类型
  }
})

// 生日日期范围
const birthdayStartDate = '1900-01-01'
const birthdayEndDate = dayjs().format('YYYY-MM-DD')

// 成为客户时间日期范围
const customerTimeStartDate = '1900-01-01'
const customerTimeEndDate = dayjs().format('YYYY-MM-DD')

function handleBirthdayDateConfirm1(value: any) {
  const selectedDate = value.detail.value
  const today = dayjs().format('YYYY-MM-DD')

  if (selectedDate === today && filterParams.birthdayE === today) {
    uni.showToast({
      title: '开始和结束日期不能同时为今天',
      icon: 'none',
    })
    return
  }

  filterParams.birthdayS = selectedDate
  // 如果开始日期大于结束日期，清空结束日期，强制用户重新选择
  if (filterParams.birthdayE && dayjs(selectedDate).isAfter(dayjs(filterParams.birthdayE))) {
    filterParams.birthdayE = ''
    uni.showToast({ title: '开始日期不能晚于结束日期，已清空结束日期', icon: 'none' })
  }
  // 当选择了日期范围，清空标签和天数选择
  birthday.value = null
  birthdayDays.value = null
}
function handleBirthdayDateConfirm2(value: any) {
  const selectedDate = value.detail.value
  const today = dayjs().format('YYYY-MM-DD')

  if (selectedDate === today && filterParams.birthdayS === today) {
    uni.showToast({
      title: '开始和结束日期不能同时为今天',
      icon: 'none',
    })
    return
  }

  filterParams.birthdayE = selectedDate
  // 当选择了日期范围，清空标签和天数选择
  birthday.value = null
  birthdayDays.value = null
}
function handleCustomerTimeDateConfirm1(value: any) {
  const selectedDate = value.detail.value
  const today = dayjs().format('YYYY-MM-DD')

  if (selectedDate === today && filterParams.cDateE === today) {
    uni.showToast({
      title: '开始和结束日期不能同时为今天',
      icon: 'none',
    })
    return
  }

  filterParams.cDateS = selectedDate
  // 如果开始日期大于结束日期，清空结束日期，强制用户重新选择
  if (filterParams.cDateE && dayjs(selectedDate).isAfter(dayjs(filterParams.cDateE))) {
    filterParams.cDateE = ''
    uni.showToast({ title: '开始日期不能晚于结束日期，已清空结束日期', icon: 'none' })
  }
  // 当选择了日期范围，清空标签选择
  customerTime.value = null
}
function handleCustomerTimeDateConfirm2(value: any) {
  const selectedDate = value.detail.value
  const today = dayjs().format('YYYY-MM-DD')

  if (selectedDate === today && filterParams.cDateS === today) {
    uni.showToast({
      title: '开始和结束日期不能同时为今天',
      icon: 'none',
    })
    return
  }

  filterParams.cDateE = selectedDate
  // 当选择了日期范围，清空标签选择
  customerTime.value = null
}
</script>

<template>
  <view class="filter-container">
    <view p-24rpx bg-F9F9F9>
      <view bg-white rd-10px p-24rpx>
        <view fb fs-14px mb-16px>
          生日
        </view>
        <GridTagSelect v-model="birthday" :sources="sources" />
        <view mb-20rpx mt-32rpx flex flex-ac fs-14px style="color: #929292;gap: 32rpx;padding:0;">
          <!-- <wd-calendar
            v-model="birthdayRange"
            type="daterange"
            label="范围"
            placeholder="请选择日期范围"
            :show-confirm="false"
            @confirm="handleBirthdayRangeConfirm"
          /> -->

          <text>范围</text>
          <picker mode="date" :value="filterParams.birthdayS" :start="birthdayStartDate" :end="birthdayEndDate" @change="handleBirthdayDateConfirm1">
            <input
              v-model="filterParams.birthdayS"
              style="width: 190rpx;height: 64rpx;
              height: 64rpx;text-align: center;
              background-color: #F6F6FB;"
            >
          </picker>
          <text>至</text>
          <picker mode="date" :value="filterParams.birthdayE" :start="filterParams.birthdayS || birthdayStartDate" :end="birthdayEndDate" @change="handleBirthdayDateConfirm2">
            <input
              v-model="filterParams.birthdayE"
              style="width: 190rpx;height: 64rpx;
              height: 64rpx;text-align: center;
              background-color: #F6F6FB;"
            >
          </picker>
        </view>
        <view flex flex-ac fs-14px style="color: #929292;gap: 32rpx;padding:0;">
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
        <view fb fs-14px mb-16px>
          成为客户时间
        </view>
        <GridTagSelect v-model="customerTime" :sources="customerTimeSources" :columns="3" />
        <view mb-20rpx mt-32rpx flex flex-ac fs-14px style="color: #929292;gap: 32rpx;padding:0;">
          <text>范围</text>
          <picker mode="date" :value="filterParams.cDateS" :start="customerTimeStartDate" :end="customerTimeEndDate" @change="handleCustomerTimeDateConfirm1">
            <input
              v-model="filterParams.cDateS"
              style="width: 190rpx;height: 64rpx;
              height: 64rpx;text-align: center;
              background-color: #F6F6FB;"
            >
          </picker>
          <text>至</text>
          <picker mode="date" :value="filterParams.cDateE" :start="filterParams.cDateS || customerTimeStartDate" :end="customerTimeEndDate" @change="handleCustomerTimeDateConfirm2">
            <input
              v-model="filterParams.cDateE"
              style="width: 190rpx;height: 64rpx;
              height: 64rpx;text-align: center;
              background-color: #F6F6FB;"
            >
          </picker>
        </view>
      </view>

      <view bg-white rd-10px p-24rpx mt-24rpx>
        <view fb fs-14px mb-16px>
          持有卡项
        </view>
        <wd-radio-group v-model="cardMode" shape="dot" inline>
          <wd-radio :value="0">
            任意卡项
          </wd-radio>
          <wd-radio :value="1">
            指定卡项
          </wd-radio>
          <wd-radio :value="2">
            指定卡类型
          </wd-radio>
        </wd-radio-group>
        <template v-if="cardMode === 1">
          <div class="h20px" />
          <SelectCell :has-value="selectedCardNames.length > 0" @click="toCard">
            <view flex flex-ac flex-wrap gap-10rpx>
              <view v-for="name in selectedCardNames" :key="name" class="mini-tag">
                {{ name }}
              </view>
            </view>
          </SelectCell>
        </template>
        <template v-if="cardMode === 2">
          <div class="h20px" />
          <SelectCell :has-value="selectedCardTypeLabels.length > 0" @click="toCardType">
            <view flex flex-ac flex-wrap gap-10rpx>
              <view v-for="label in selectedCardTypeLabels" :key="label" class="mini-tag">
                {{ label }}
              </view>
            </view>
          </SelectCell>
        </template>
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

  <wd-popup v-model="showCardType" position="bottom" closable :safe-area-inset-bottom="true" custom-style="border-radius:32rpx;">
    <view>
      <view fb tc c-#232220 mt42px>
        选择卡类型
      </view>
      <view class="h20px" />
      <view px20px py12px>
        <GridTagSelect v-model="cardType" :sources="cardTypeSources" :columns="3" mode="multiple" />
      </view>
      <view class="h20px" />
      <view px-20px pb-20px>
        <button class="confirm-btn" @click="showCardType = false">
          确定
        </button>
      </view>
    </view>
  </wd-popup>
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

:deep(.wd-radio.is-inline:not(:last-child)) {
  margin-right: 30rpx !important;
}

.mini-tag {
  background-color: #eff2ff;
  color: #1a66ff;
  padding: 4rpx 12rpx;
  border-radius: 4rpx;
  font-size: 24rpx;
}

.confirm-btn {
  width: 100%;
  height: 80rpx;
  line-height: 80rpx;
  background-color: #fff;
  color: #1a66ff;
  border: 1px solid #1a66ff;
  font-size: 16px;
}
</style>
