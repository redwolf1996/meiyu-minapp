<route lang="yaml">
layout: false
style:
  navigationBarTitleText: 预约看板
  navigationStyle: "custom"
  disableScroll: true
</route>

<script lang="ts" setup>
import type { BookCount, BookListAll, Books } from './types'
import { getFinalArr } from './data'
import dayjs from 'dayjs'

const searchForm = reactive({
  storeId: storeId.value,
  status: 1, // 1待服务，2服务中，3已完成，4已取消
  artisanId: '', // 手艺人id
  sTime: null, // 服务开始时间
  eTime: null, // 服务结束时间
  sDate: null, // 服务开始日期
  eDate: null, // 服务开始日期
  keyword: '', // 关键字
})
// 预约列表各状态数量
const bookCountsAll = ref({
  all: 0,
  wait: 0,
  underway: 0,
  finish: 0,
})
const bookListDataAll = ref<BookListAll[]>([])

const windowHeight = uni.getWindowInfo().windowHeight
const screenWidth = uni.getWindowInfo().screenWidth
const instance = getCurrentInstance()
const query = uni.createSelectorQuery().in(instance.proxy)
const dropMenu = ref()
const mode = ref(0) // 0预约看板 1预约列表
const visableSearch = ref(false)
const headHeight = ref(0)
const tabHeight = ref(0)
const navHeight = getMenuButtonInfo().navHeight // 只能通过系统方法获取navHeight，通过dom获取不到
const scrollTop = ref(800)
const val = ref()
const sources: any = [
  { label: '全部', value: 1, isActive: true },
  { label: '今天', value: 2, isActive: false },
  { label: '明天', value: 3, isActive: false },
]
const sources2: any = [
  { label: '全部', value: 1, isActive: true },
  { label: '未分配', value: 2, isActive: false },
  { label: '刘小明', value: 3, isActive: false },
  { label: '阿月', value: 3, isActive: false },
  { label: '小美', value: 3, isActive: false },
]
const servStatusMap = {
  1: {
    name: '待分配',
    color: '#FFCBE2',
  },
  2: {
    name: '服务中',
    color: '#FEE7D7',
  },
  3: {
    name: '已完成',
    color: '#D4D4D6',
  },
}

const hours24h = get24Hours()
const tableData = ref<Books[]>([])
const countInfo = ref<BookCount>({
  all: 0,
  wait: 0,
  underway: 0,
  finish: 0,
})
const multipleItemWidth = computed(() => {
  const len = tableData.value.length
  if (len === 0)
    return 0
  if (len >= 3)
    return (screenWidth - 40) / 3
  return (screenWidth - 40) / len
})

onLoad((options) => {
  const tab = options?.tab
  if (tab === 'list')
    mode.value = 1
})

onShow(() => {
  const today = dayjs().format('YYYY-MM-DD')
  getBookDashboard(today)
  getBookCount(today)
  getBookCount()
})

onMounted(async () => {
  // 获取日历和预约图表上方服务状态数tag高度
  query.select('#head').boundingClientRect((data: any) => {
    headHeight.value = data?.height
  }).exec()
})

// 只能通过事件监听获取第三方组件uv-tabbar的高度
uni.$on('getTabHeight', (data) => {
  tabHeight.value = data
})

const sideHeight = computed(() => {
  return navHeight + headHeight.value + tabHeight.value
})

const restHeight = computed(() => {
  return windowHeight - sideHeight.value
})

async function getBookDashboard(cDate: string) {
  const res = await request.get<Books[]>('/business/booking-dashboard', {
    storeId: storeId.value,
    cDate,
  })
  tableData.value = res.data.map((item) => {
    return {
      ...item,
      bookingListUse: getFinalArr(item.bookingList),
    }
  })
}

async function getBookCount(cDate?: string) {
  if (cDate) {
    const res = await request.get<BookCount>('/business/booking-count', {
      storeId: storeId.value,
      cDate,
    })
    countInfo.value = res.data
  }
  else {
    const res = await request.get<BookCount>('/business/booking-count', {
      storeId: storeId.value,
    })
    bookCountsAll.value = res.data
  }
}

function handleClickList() {
}

function selectMode(m: number) {
  mode.value = m
  dropMenu.value.close()
}

function calendarChange() {
}

function showSearch() {
  visableSearch.value = true
}
function createOrder() {
  bookStime.value = ''
  checkedServs.value = []
  uni.navigateTo({ url: '/pagesA/book/add' })
}

function scrollView(e: any) {
  scrollTop.value = e.detail.scrollTop
}
</script>

<template>
  <page-meta :page-style="`overflow:${visableSearch ? 'hidden' : 'visible'};`" />
  <view :style="{ height: `${windowHeight}px` }">
    <wd-popup
      v-model="visableSearch" :z-index="999" lock-scroll :safe-area-inset-bottom="true" position="right"
      custom-style="height: 100vh;width: 80%;background: #F9F9F9;"
    >
      <wd-navbar :safeAreaInsetTop="true">
        <template #title>
          <view fb f16 tl px-30rpx>
            预约筛选
          </view>
        </template>
      </wd-navbar>
      <view px-30rpx py-40rpx>
        <view bg-white px-32rpx py-25rpx rd-20rpx mb-24rpx>
          <view fb f14 lh-28rpx pb-32rpx>
            客户
          </view>
          <view>
            <wd-input
              v-model="searchForm.keyword"
              placeholder="请输入预约人姓名或手机号"
              custom-class="cus-input"
              :no-border="true"
              size="small"
              :clearable="true"
            />
          </view>
        </view>
        <view bg-white px-32rpx py-25rpx rd-20rpx mb-24rpx>
          <view fb f14 lh-28rpx pb-32rpx>
            服务时间
          </view>
          <view>
            <GridTagSelect v-model="val" :sources="sources" :columns="3" />
            <MyCell label="服务时段">
              <text f14 c-3B3D3D>
                09:00-21:00
              </text>
            </MyCell>
          </view>
        </view>
        <view bg-white px-32rpx py-25rpx rd-20rpx mb-24rpx>
          <view fb f14 lh-28rpx pb-32rpx>
            手艺人
          </view>
          <view>
            <GridTagSelect v-model="val" :sources="sources2" :columns="3" mode="multiple" />
          </view>
        </view>
      </view>
      <view flex flex-cc gap-40rpx>
        <MyButton bgColor="#ffffff" color="#232220" borderColor="rgba(0, 0, 0, 0.2)">
          重置
        </MyButton>
        <MyButton>确定</MyButton>
      </view>
    </wd-popup>
    <view id="title">
      <wd-navbar title="标题" :fixed="true" :placeholder="true" :safeAreaInsetTop="true" @click-left="handleClickList">
        <template #left>
          <view transform-translate-y-4px>
            <wd-img
              v-if="mode === 1"
              :width="20"
              :height="20"
              :src="`${IMG_BASE}/icon-funnel.png`"
              @click="showSearch"
            />
          </view>
        </template>
        <template #title>
          <wd-drop-menu>
            <wd-drop-menu-item ref="dropMenu" :title="!mode ? '预约看版' : '预约列表'">
              <view py-30rpx flex flex-cc gap-60rpx>
                <view class="pannel" :class="{ active: mode === 0 }" @click="selectMode(0)">
                  <wd-img
                    :width="32"
                    :height="32"
                    :src="`${IMG_BASE}/icon-kb${!mode ? '-act' : ''}.png`"
                  />
                  <text class="title">
                    预约看板
                  </text>
                </view>
                <view class="pannel" :class="{ active: mode === 1 }" @click="selectMode(1)">
                  <wd-img
                    :width="32"
                    :height="32"
                    :src="`${IMG_BASE}/icon-lb${mode ? '-act' : ''}.png`"
                  />
                  <text class="title">
                    预约列表
                  </text>
                </view>
              </view>
            </wd-drop-menu-item>
          </wd-drop-menu>
        </template>
      </wd-navbar>
    </view>
    <view v-if="mode === 0" id="head">
      <wu-calendar
        color="#2F4BEC" :itemHeight="50" startWeek="mon"
        :fold="false" type="week" :insert="true" @change="calendarChange"
      />
      <view bg-white h-20rpx />
      <view flex flex-ac flex-cc gap-100rpx flex-rd f12 h-54rpx lh-54rpx bg-white class="status">
        <view flex flex-ac>
          <MySquare color="#FFCBE2" />
          <text lh-24rpx pl-8rpx>
            待服务({{ countInfo.wait }})
          </text>
        </view>
        <view flex flex-ac>
          <MySquare color="#FEE7D7" />
          <text lh-24rpx pl-8rpx>
            服务中({{ countInfo.underway }})
          </text>
        </view>
        <view flex flex-ac>
          <MySquare color="#D4D4D6" />
          <text lh-24rpx pl-8rpx>
            已完成({{ countInfo.finish }})
          </text>
        </view>
      </view>
    </view>
    <scroll-view
      v-if="mode === 0"
      :scroll-x="true"
      :scroll-y="true"
      :enhanced="true"
      :bounces="false"
      :show-scrollbar="false"
      :scroll-top="800"
      class="content pr"
      :style="{
        height: `${restHeight}px`,
      }" @scroll="scrollView"
    >
      <view flex word-spacing-0 pr z-100>
        <view sticky left-0 dib w-40px hp100 z-200>
          <view h-32px w-40px sticky left-0 top-0 bg-white z-300 />
          <view bg-F3F6FF flex flex-y flex-ac>
            <view
              v-for="(item, index) in hours24h" :key="`i${item}`"
              :class="{ 'active-time': Math.floor((scrollTop + 200) / 120) === index }"
              tc w-40px c-8EA0B6 h-120px style="border-bottom: 1px solid transparent;"
            >
              <text f12 lh-24rpx>
                {{ item }}
              </text>
            </view>
          </view>
        </view>
        <view dib hp100 pr z-150 flex-grow-1>
          <view h-32px lh-32px sticky top-0 z-180 flex f12 c-364250>
            <view v-for="(item, index) in tableData" :key="`name-${index}`" bg-white tc flex-shrink-0 :style="{ flexBasis: `${multipleItemWidth}px` }">
              {{ item.artisanName }}
            </view>
          </view>
          <view h-2880px class="table-content" flex>
            <view v-for="(item, index) in tableData" :key="`k-${index}`" pr bg-white tc flex-shrink-0 :style="{ flexBasis: `${multipleItemWidth}px` }">
              <Grids96 />
              <view
                v-for="(itm, idx) in item.bookingListUse" :key="`kk-${index}-${idx}`" class="booking"
                :style="{
                  width: `${multipleItemWidth - 10}px`,
                  top: `${itm[0].top}px`,
                  height: `${itm.length === 1 ? itm.height : itm[itm.length - 1].end - itm[0].top}px`,
                }"
              >
                <view
                  v-for="(it, i) in itm" :key="`kkk-${index}-${idx}-${i}`" :style="{
                    height: `${it.height}px`,
                    transform: `translateY(${itm.length === 1 ? 0 : it.top - itm[0].top}px)`,
                    background: servStatusMap[it.bookingStatus].color,
                    width: `${(multipleItemWidth - 10) / itm.length}%`,
                  }" class="booking-item"
                >
                  <view class="ch" f12 fb ellipsis>
                    {{ it.storeCustomerName }}
                  </view>
                  <view v-for="(it1, i1) in it.serviceList" :key="`kkkk-${index}-${idx}-${i}-${i1}`" class="ch" ellipsis f10>
                    {{ it1.serviceName }} x{{ it1.count }}
                  </view>
                  <view class="ch" ellipsis f10>
                    {{ it.startTimeStr }}
                  </view>
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>
      <view class="plus" @click="createOrder()">
        <view class="abs-cc">
          +
        </view>
      </view>
    </scroll-view>
    <BookList v-if="mode === 1" :bookCount="bookCountsAll" :listData="bookListDataAll" />
  </view>
  <MyTabBar :tab-index="1" />
</template>

<style>
page {
  overflow-y: hidden !important;
}
</style>

<style lang='scss' scoped>
.active-time {
  color: #364250 !important;
}
.booking {
  text-align: left;
  position: absolute;
  left: 0;
  display: flex;
  flex-wrap: nowrap;
  // border: 1px solid blue;
  // height: 150px;
  // top: 0;
  // background-color: #ffcbe2;
  // padding: 6px;
  // border-radius: 4px;
}
.booking-item {
  // background-color: #ffcbe2;
  padding: 6px;
  // flex: 1;
  border-left: 3px solid #00aa44;
  .ch {
    width: 100%;
  }
  // height: 150px;
  // transform: translateY(10px);
}
.plus {
  position: fixed;
  right: 10rpx;
  bottom: 90px;
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
