<route lang="yaml">
style:
  navigationBarTitleText: 工作台
  navigationStyle: custom
</route>

<script lang="ts" setup>
import dayjs from 'dayjs'
// #ifdef MP-WEIXIN
import { getMenuButtonInfo } from '@/utils/index'
// #endif

import type { DashBoardData } from './types'
import type { StoreList, UserInfo } from '@/stores/modules/user'
import MyTabBar from './MyTabBar.vue'

const toast = useToast()
const menuButtonWidth = ref(0)
const userInfo = ref<Partial<UserInfo>>(null)
const storeName = ref('--')
const info = ref<DashBoardData>()
const isOvertime = ref(false)
const showCardRecharge = ref(false) // 显示开卡充值弹窗

onShow(() => {
  initStore()
  // #ifdef MP-WEIXIN
  const menuButtonInfo = getMenuButtonInfo()
  menuButtonWidth.value = menuButtonInfo?.barWidth
  // #endif
})

// 店铺初始化
async function initStore() {
  const res = await request.get<UserInfo>('/business/info')
  useUserStore().setUserInfo(res.data)
  userInfo.value = useUserStore().userInfo
  storeName.value = userInfo.value?.lastStoreName || userInfo.value.storeList?.[0]?.storeName
  const guidStatus = userInfo.value.guidStatus

  if (!userInfo.value.orgInfo?.storeCount) { // 如果店铺未创建
    return uni.navigateTo({ url: '/pagesA/init/steps/step1' })
  }

  if (!guidStatus.staffCountStatus || !guidStatus.productCountStatus || !guidStatus.serviceCountStatus) { // 如果新手引导未完成
    return uni.navigateTo({ url: '/pagesA/init/steps/index' })
  }

  getInfo()
}

async function getInfo() {
  const res = await request.get<DashBoardData>(`/business/workbench/${storeId.value}`)
  info.value = res.data

  // 判断是否过期
  const today = dayjs()
  const expTime = dayjs(info.value.orgExpiresTime)
  if (today.isAfter(expTime)) {
    isOvertime.value = true
  }
}

function toWallet() {
  uni.navigateTo({ url: '/pagesA/dashboard/wallet' })
}
function toRenew() {
  uni.navigateTo({ url: '/pagesA/my/renew' })
}
function toScanCode() {
  toast.warning('开发中')
}
function toCusCard() {
  uni.navigateTo({ url: '/pagesA/card/cus-list' })
}
function toAddCustomer() {
  uni.navigateTo({ url: '/pagesA/customer/add' })
}
function toAddBooking() {
  curSelectedCard.value = null
  curCustomer.value = null
  bookStime.value = ''
  resetGoods()
  uni.navigateTo({ url: '/pagesA/book/add' })
}
function toBookDetail(item) {
  const bookingId = item.bookingId
  uni.navigateTo({ url: `/pagesA/book/detail?id=${bookingId}` })
}
function toCashing() { // 开单收银
  curCustomer.value = null // 进入页面前清空store内容
  resetGoods()
  uni.navigateTo({ url: '/pagesA/billing/index' })
}
async function toMakeCard() { // 开卡及充值
  resetCards()
  showCardRecharge.value = true
}
function toOrderList() {
  uni.navigateTo({ url: '/pagesA/order/index' })
}
function toBookingList() {
  uni.redirectTo({ url: '/pagesA/tabs/tab-business-book?tab=list' })
}
function toStoreManage() {
  uni.navigateTo({ url: '/pagesA/dashboard/store' })
}
function toInvite() {
  uni.navigateTo({ url: '/pagesA/my/invite' })
}
function toMsg() {
  uni.navigateTo({ url: '/pagesA/msg/list' })
}
// 开卡/充值
function toCardRecharge(type: 1 | 2 | 3 | 4 | 5 | 6) {
  curCardRechargeType.value = type
  curSelectedCard.value = null
  curCustomer.value = null
  uni.navigateTo({ url: '/pagesA/card/make' })
}
</script>

<template>
  <wd-toast />
  <view px-24rpx>
    <wd-navbar :fixed="true" :placeholder="true" :safeAreaInsetTop="true" :bordered="false">
      <template #title>
        <view flex flex-ac flex-bt :style="{ width: `calc(100% - ${menuButtonWidth}px)` }">
          <view px-24rpx>
            {{ storeName }}
          </view>
          <view flex flex-y flex-cc pr-24rpx pr @click="toMsg()">
            <wd-img
              :width="28"
              :height="28"
              :src="`${IMG_BASE}/icon-msg.png`"
            />
            <text
              v-if="info?.unreadNotice"
              style="right: 16rpx;top: -6rpx;"
              pa top-0 w-30rpx h-30rpx lh-30rpx tc bg-FE502E
              round color-fff font-size-20rpx
            >
              {{ info?.unreadNotice }}
            </text>
          </view>
        </view>
      </template>
    </wd-navbar>

    <view class="conitaner" pr>
      <view
        p-40rpx color-white pr
        style="background-size: cover;"
        :style="{ backgroundImage: `url(${IMG_BASE}/bg-dashboard.png)` }"
      >
        <view f14>
          本月实收(元)
        </view>
        <view fb font-size-64rpx mt-12px>
          {{ info?.currentMonthIncome }}
        </view>
        <view flex mt-20px gap-40px>
          <view wp-33.3333>
            <view f12 style="opacity: .6;">
              今日实收
            </view>
            <view f16 mt-12rpx>
              {{ info?.currentDayIncome }}
            </view>
          </view>
          <view wp-33.3333>
            <view f12 style="opacity: .6;">
              本月消耗金额
            </view>
            <view f16 mt-12rpx>
              {{ info?.currentMonthUse }}
            </view>
          </view>
          <view wp-33.3333>
            <view f12 style="opacity: .6;">
              本月开卡充值
            </view>
            <view f16 mt-12rpx>
              {{ info?.currentMonthCardIncome }}
            </view>
          </view>
        </view>
        <view
          class="wallet"
          px-16px
          py-8px color-white pa flex flex-ac right-0 top-20px style="background-color: rgba(255,255,255,0.2);border-radius: 31px 0px 0px 31px;"
          @click="toWallet()"
        >
          <wd-img
            :width="16"
            :height="16"
            :src="`${IMG_BASE}/icon-wallet.png`"
          />
          <text f14 pl-8px>
            我的钱包
          </text>
        </view>
      </view>

      <view pr mt-20px bg-white flex flex-ac tc flex-bt py-22rpx style="box-shadow: 0px 4px 8px 0px rgba(48, 48, 48, 0.1005);">
        <view pa abs-cc flex class="total">
          <view class="bd-r" />
          <view class="bd-r" />
          <view class="bd-r" />
          <view />
        </view>
        <view wp-25>
          <view fb f18>
            {{ info?.customerCount }}
          </view>
          <view f12 color-646466 mt-2px>
            普通客户
          </view>
        </view>
        <view wp-25>
          <view fb f18>
            {{ info?.vipCustomerCount }}
          </view>
          <view f12 color-646466 mt-2px>
            VIP
          </view>
        </view>
        <view wp-25>
          <view fb f18>
            {{ info?.currentMonthBooking }}
          </view>
          <view f12 color-646466 mt-2px>
            本月预约
          </view>
        </view>
        <view wp-25>
          <view fb f18>
            {{ info?.waitCount }}
          </view>
          <view f12 color-646466 mt-2px>
            待服务
          </view>
        </view>
      </view>

      <view mt-30px>
        <view class="title">
          今日待服务({{ info?.todayBookingList?.length ?? 0 }})
        </view>
        <view>
          <scroll-view v-if="info?.todayBookingList?.length" :scrollX="true" style="white-space: nowrap;">
            <DashboardCard v-for="(item, index) in info?.todayBookingList" :key="`sdk-${index}`" :data="item" @myclick="toBookDetail(item)" />
          </scroll-view>
          <view v-else tc c-#A7A8AC py20rpx>
            暂无预约
          </view>
        </view>
      </view>

      <view v-if="isOvertime" mt-30px class="renew" flex flex-bt flex-ac gap-24rpx>
        <wd-img
          :width="23"
          :height="23"
          :src="`${IMG_BASE}/icon-expire.png`"
        />
        <view w-320rpx>
          <view fb f14>
            服务已到期
          </view>
          <view f10>
            您的服务已于{{ dayjs(info?.orgExpiresTime).format('YYYY年MM月DD日') }}到期，历史数据仍可正常查询，请尽快续费以享受完整服务。
          </view>
        </view>
        <view class="renew-btn" @click="toRenew()">
          立即续费
        </view>
      </view>

      <view mt-30px>
        <view class="title">
          常用工具
        </view>
        <view h-20px />
        <view class="grid">
          <view @click="toScanCode()">
            <i i-ant-design-scan-outlined fs-64 c-1563ff />
            <text>扫码核销</text>
          </view>
          <view @click="toAddCustomer()">
            <i i-ant-design-user-add-outlined fs-64 c-1563ff />
            <text>添加客户</text>
          </view>
          <view @click="toAddBooking()">
            <i i-material-symbols-add-notes-outline fs-64 c-1563ff />
            <text>新增预约</text>
          </view>
          <view @click="toCashing()">
            <i i-mdi-credit-card-check-outline fs-64 c-1563ff />
            <text>开单收银</text>
          </view>
          <view @click="toMakeCard()">
            <i i-material-symbols-add-card-outline fs-64 c-1563ff />
            <text>开卡充值</text>
          </view>
          <view @click="toOrderList()">
            <i i-mdi-order-bool-ascending fs-64 c-1563ff />
            <text>订单列表</text>
          </view>
          <view @click="toBookingList()">
            <i i-tabler-address-book fs-64 c-1563ff />
            <text>预约列表</text>
          </view>
          <view @click="toStoreManage()">
            <i i-mingcute-shop-line fs-64 c-1563ff />
            <text>店务管理</text>
          </view>
          <view @click="toCusCard()">
            <i i-heroicons-outline-credit-card fs-64 c-1563ff />
            <text>会员卡项</text>
          </view>
        </view>
      </view>

      <view h-50px />
    </view>
  </view>

  <wd-popup v-model="showCardRecharge" position="bottom" closable :safe-area-inset-bottom="true" custom-style="border-radius:32rpx;">
    <view style="height: 360px">
      <view fb tc c-#232220 mt42px>
        选择开卡/充值类型
      </view>
      <view class="h20px" />
      <view px20px py12px>
        <view mb30px>
          <view fs-16px>
            开卡
          </view>
          <view fs-14px flex flex-wrap gap20px mt20px>
            <view class="card-item" @click="toCardRecharge(1)">
              折扣卡
            </view>
            <view class="card-item" @click="toCardRecharge(2)">
              充值卡
            </view>
            <view class="card-item" @click="toCardRecharge(3)">
              通卡
            </view>
            <view class="card-item" @click="toCardRecharge(4)">
              有限次卡
            </view>
            <view class="card-item" @click="toCardRecharge(5)">
              不限次卡
            </view>
          </view>
        </view>
        <view>
          <view fs-16px>
            充值
          </view>
          <view fs-14px flex flex-wrap gap20px mt20px>
            <view class="card-item" @click="toCardRecharge(6)">
              充值
            </view>
          </view>
        </view>
      </view>
    </view>
  </wd-popup>

  <!--  #ifdef  MP-WEIXIN -->
  <view wp-100 pf bottom-0 h-48px @click="toInvite()">
    <wd-img
      :height="48"
      width="100%"
      :src="`${IMG_BASE}/invite-banner.png`"
    />
  </view>
  <!--  #endif -->
  <!--  #ifndef  MP-WEIXIN -->
  <view wp-100 pf bottom-50px h-48px @click="toInvite()">
    <wd-img
      :height="48"
      width="100%"
      :src="`${IMG_BASE}/invite-banner.png`"
    />
  </view>
  <!--  #endif -->

  <MyTabBar :tab-index="0" />
</template>

<style lang="scss" scoped>
.card-item {
  height: 32px;
  line-height: 32px;
  text-align: center;
  color: #303030;
  background-color: #f6f6fb;
  padding: 6px 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.renew-btn {
  width: 144rpx;
  height: 48rpx;
  line-height: 48rpx;
  text-align: center;
  color: #fff;
  font-size: 24rpx;
  background-color: #e3c377;
  border-radius: 26rpx;
  box-shadow: 2.66px 2.66px 10.66px 0px rgba(0, 11, 222, 0.24);
}
.renew {
  background: linear-gradient(129deg, #e01b3f 41%, #f04c6a 81%);
  padding: 32rpx 40rpx;
  border-radius: 26rpx;
  color: #fff;
}
.grid {
  display: grid;
  grid-gap: 16px;
  grid-template-columns: repeat(4, 1fr);
  > view {
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    > i {
      color: #1563ff !important;
    }
    text {
      font-size: 24rpx;
      padding-top: 20rpx;
    }
  }
}
.slot-img {
  height: 36px;
  width: 36px;
  border-radius: 4px;
}
.text {
  color: #ffb300;
  margin-top: 8px;
}
.title {
  font-weight: bold;
  font-size: 36rpx;
}
.total {
  height: 64rpx;
  width: 100%;
  > view {
    width: 25%;
  }
  .bd-r {
    border-right: 1px solid #edeef2;
  }
}
.bg {
  position: absolute;
  width: 100%;
  left: 0;
  right: 0;
}
:deep(.wd-status-tip__text) {
  margin: 0 !important;
}
</style>
