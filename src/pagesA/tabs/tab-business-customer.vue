<route lang="yaml">
style:
  navigationBarTitleText: 客户
  navigationBarBackgroundColor: "#ffffff"
  navigationStyle: "custom"
</route>

<script lang="ts" setup>
import { computed } from 'vue'
import type { CusList, CusModel, CusReqModel } from './types'
import dayjs from 'dayjs'
import MyTabBar from './MyTabBar.vue'
import { customerFilterParamsStore } from '@/stores/common'

const optionsVip = [
  { label: '全部', value: null },
  { label: '会员', value: 2 },
  { label: '非会员', value: 1 },
]
const reqParams = reactive<CusReqModel>({
  storeId: storeId.value,
  pageNum: 1,
  pageSize: 5,
  keyword: '',
  phone: '',
  birthdayS: '',
  birthdayE: '',
  cDateS: '',
  cDateE: '',
  cardAll: null, // 1 任意卡项；指定卡id或者卡类型是传值0
  cardIds: '',
  cardTypes: null,
  cardCIds: '',
  level: null,
})
const paging = ref<ZPagingInstance<CusList> | null>(null)
const dataList = ref<CusList[]>([])
const showVipAction = ref(false)
const isFirstLoad = ref(true) // 标记是否是第一次进入页面

const vipLabel = computed(() => {
  return optionsVip.find(item => item.value === reqParams.level)?.label || '全部'
})

const vipActions = computed(() => {
  return optionsVip.map(item => ({ ...item, name: item.label }))
})

async function queryList(page: number, pageSize: number) {
  reqParams.pageNum = page
  reqParams.pageSize = pageSize
  const res = await request.get<CusModel>('/business/store-customer', reqParams)
  paging.value.complete(res.data.list)
}

function toAddCustomer() {
  uni.navigateTo({ url: '/pagesA/customer/add' })
}

function search({ value }) {
  reqParams.keyword = value
  paging.value?.reload()
}
function clear() {
  reqParams.keyword = ''
  paging.value?.reload()
}
function handleChangeVip(action: any) { // 会员 非会员筛选
  reqParams.level = action.item.value
  paging.value?.reload()
}

function toDetail(item: CusList) {
  uni.navigateTo({ url: `/pagesA/customer/detail?id=${item.storeCustomerId}` })
}

// 跳转到筛选页面
function toFilterPage() {
  // 保存当前筛选条件到全局 store，以便筛选页面可以读取
  customerFilterParamsStore.value = {
    ...customerFilterParamsStore.value, // 保留已有的值，比如 selectedCardNames
    birthdayS: reqParams.birthdayS || '',
    birthdayE: reqParams.birthdayE || '',
    cDateS: reqParams.cDateS || '',
    cDateE: reqParams.cDateE || '',
    cardIds: reqParams.cardIds || '',
    cardAll: reqParams.cardAll,
    cardTypes: reqParams.cardTypes || null,
  }
  uni.navigateTo({ url: '/pagesA/customer/list-filter' })
}

// 应用筛选条件
function applyFilter(filterParams: any) {
  if (filterParams) {
    reqParams.birthdayS = filterParams.birthdayS || ''
    reqParams.birthdayE = filterParams.birthdayE || ''
    reqParams.cDateS = filterParams.cDateS || ''
    reqParams.cDateE = filterParams.cDateE || ''
    reqParams.cardIds = filterParams.cardIds || ''
    reqParams.cardTypes = filterParams.cardTypes || null
    reqParams.cardAll = filterParams.cardAll ?? null
    paging.value?.reload()
  }
}

onShow(() => {
  // 从其他页面返回时，isFirstLoad.value 已经是 false
  if (!isFirstLoad.value) {
    // 从筛选页面返回，总是应用筛选条件（包括清空条件）
    applyFilter(customerFilterParamsStore.value)
  }
  // 首次进入页面时，isFirstLoad.value 为 true，不执行任何操作，等待页面加载完成
})

onLoad(() => {
  // 页面首次加载时，清空所有历史筛选条件
  isFirstLoad.value = false // 确保 onShow 不会再次执行 applyFilter
  // 重置所有查询条件
  reqParams.keyword = ''
  reqParams.phone = ''
  reqParams.birthdayS = ''
  reqParams.birthdayE = ''
  reqParams.cDateS = ''
  reqParams.cDateE = ''
  reqParams.cardAll = null
  reqParams.cardIds = ''
  reqParams.cardTypes = null
  reqParams.cardCIds = ''
  reqParams.level = null
  // 清空全局 store
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
  paging.value?.reload()
})
</script>

<template>
  <z-paging
    ref="paging"
    v-model="dataList"
    back-to-top-bottom="200rpx"
    lower-threshold="5" auto-show-back-to-top :default-page-size="10"
    @query="queryList"
  >
    <template #top>
      <MyNavBar title="客户列表" :capsule="false" />
      <view py-12rpx px-32rpx>
        <view flex flex-bt flex-ac gap-32rpx>
          <view flex-1 pr>
            <wd-search placeholder-left hide-cancel placeholder="搜索姓名/手机号" @clear="clear" @search="search" />
          </view>
          <view rd-2px w-28px h-28px lh-28px tc bg-F2F3F5 fs-32 fb @click="toAddCustomer()">
            +
          </view>
        </view>

        <view flex flex-ac gap-0>
          <view flex-1 class="filter-btn vip-filter-btn" style="justify-content: center;" @click="showVipAction = true">
            <text>{{ vipLabel }}</text>
            <wd-icon name="arrow-down" size="12px" />
          </view>
          <view flex-1 class="filter-btn" @click="toFilterPage">
            <text>筛选</text>
            <wd-icon name="arrow-down" size="12px" />
          </view>
        </view>
        <!-- https://wot-ui.cn/component/action-sheet.html -->
      </view>
      <wd-action-sheet v-model="showVipAction" :actions="vipActions" title="选择会员类型" custom-style="padding-bottom: 50px" @select="handleChangeVip" />
    </template>
    <view py-12rpx px-32rpx>
      <view py-8rpx>
        <view v-for="(item, index) in dataList" :key="`cus-${index}`" :class="[(index % 2 === 0) ? 'bg-white' : 'bg-F0F0F0']" px-40rpx py-26rpx rd-16rpx @click="toDetail(item)">
          <view flex flex-ac gap-32rpx>
            <wd-img
              :round="true"
              :width="48"
              :height="48"
              mode="aspectFill"
              :src="DEFAULT_AVATAR"
            />
            <view>
              <view flex flex-ac gap-4rpx>
                <text f16>
                  {{ item.name }}
                </text>
                <wd-img
                  v-if="item.level === 2"
                  :round="true"
                  :width="18"
                  :height="18"
                  :src="`${IMG_BASE}/icon-v.png`"
                />
              </view>
              <view c-929292 f12 mt-10px>
                {{ item.phone }}
              </view>
            </view>
          </view>
          <view grid grid-cols-2 f12 mt-10px grid-gap-5px>
            <view>
              <text c-929292>
                余额：
              </text>
              <text c-00BB00>
                {{ item.amount ?? '--' }}
              </text>
            </view>
            <view>
              <text c-929292>
                上次消费：
              </text>
              <text c-00BB00>
                {{ item?.lastPayTime?.split(' ')?.[0] || '--' }}
              </text>
            </view>
            <view>
              <text c-929292>
                手艺人：
              </text>
              <text c-00BB00>
                {{ item?.artisanUserName || '未分配' }}
              </text>
            </view>
            <view>
              <text c-929292>
                营销顾问：
              </text>
              <text c-00BB00>
                {{ item?.adviserUserName || '未分配' }}
              </text>
            </view>
          </view>
        </view>
      </view>
    </view>
    <template #bottom>
      <MyTabBar :tab-index="2" />
    </template>
  </z-paging>
</template>

<style lang='scss' scoped>
:deep(.wd-search) {
  padding: 0 !important;
}
.my-item {
  border-bottom: 1px solid #efefef;
  display: flex;
  gap: 40rpx;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 24rpx;
  margin-bottom: 24rpx;
}
label {
  padding: 0 !important;
}
:deep(.wd-popup.wd-popup--top.wd-top-enter-to.wd-top-enter-active) {
  max-height: 95% !important;
}
:deep(.cus-input) {
  color: #c9cdd4;
  font-size: 14px;
}
.vip-filter-btn {
  border-left: 0 !important;
}
.filter-btn {
  height: 88rpx;
  line-height: 88rpx;
  padding: 0 32rpx;
  text-align: center;
  font-size: 28rpx;
  color: #303030;
  background-color: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10rpx;
  &:active {
    background-color: #f7f8fa;
  }
}
.tag {
  color: #1a66ff;
  background-color: #eff2ff;
  padding: 5rpx 16rpx;
  height: 32rpx;
  line-height: 32rpx;
  text-align: center;
  border-radius: 16rpx;
  font-size: 20rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 92rpx;
}
</style>

<style>
page {
  background-color: #fff;
}
</style>
