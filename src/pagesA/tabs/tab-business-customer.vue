<route lang="yaml">
style:
  navigationBarTitleText: 客户
  navigationBarBackgroundColor: "#ffffff"
  navigationStyle: "custom"
</route>

<script lang="ts" setup>
import type { CusList, CusModel, CusReqModel } from './types'
import dayjs from 'dayjs'
import MyTabBar from './MyTabBar.vue'

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
  cardAll: '',
  cardIds: '',
  cardCIds: '',
  level: null,
})
const paging = ref<ZPagingInstance<CusList> | null>(null)
const dataList = ref<CusList[]>([])

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
function handleChangeVip() { // 会员 非会员筛选
  paging.value?.reload()
}

function toDetail(item: CusList) {
  uni.navigateTo({ url: `/pagesA/customer/detail?id=${item.storeCustomerId}` })
}

// 跳转到筛选页面
function toFilterPage() {
  // 保存当前筛选条件到本地存储，以便筛选页面可以读取
  const currentFilter = {
    birthdayS: reqParams.birthdayS || '',
    birthdayE: reqParams.birthdayE || '',
    cDateS: reqParams.cDateS || '',
    cDateE: reqParams.cDateE || '',
  }
  uni.setStorageSync('customer_filter_params', currentFilter)
  uni.navigateTo({ url: '/pagesA/customer/list-filter' })
}

// 应用筛选条件
function applyFilter(filterParams: any) {
  if (filterParams) {
    reqParams.birthdayS = filterParams.birthdayS || ''
    reqParams.birthdayE = filterParams.birthdayE || ''
    reqParams.cDateS = filterParams.cDateS || ''
    reqParams.cDateE = filterParams.cDateE || ''
    paging.value?.reload()
  }
}

onShow(() => {
  // 检查是否有筛选条件返回
  const filterParams = uni.getStorageSync('customer_filter_params')
  if (filterParams) {
    applyFilter(filterParams)
    // 清除存储的筛选条件，避免重复应用
    uni.removeStorageSync('customer_filter_params')
  }
  else {
    paging.value?.reload()
  }
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
          <view flex-1>
            <wd-drop-menu>
              <wd-drop-menu-item v-model="reqParams.level" :options="optionsVip" @change="handleChangeVip" />
            </wd-drop-menu>
          </view>
          <view class="filter-btn" @click="toFilterPage">
            <text>筛选</text>
          </view>
        </view>
      </view>
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
.filter-btn {
  height: 88rpx;
  line-height: 88rpx;
  padding: 0 32rpx;
  text-align: center;
  font-size: 28rpx;
  color: #303030;
  background-color: #fff;
  border-left: 1px solid #ebedf0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
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
