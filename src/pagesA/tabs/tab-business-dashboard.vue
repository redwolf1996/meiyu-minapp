<route lang="yaml">
style:
  navigationBarTitleText: 工作台
  navigationStyle: custom
</route>

<script lang="ts" setup>
import dayjs from 'dayjs'
import { getMenuButtonInfo } from '@/utils/index'

import type { DashBoardData } from './types'
import type { UserInfo } from '@/stores/modules/user'
import MyTabBar from './MyTabBar.vue'

const toast = useToast()
const menuButtonWidth = ref(0)
const userInfo = ref<Partial<UserInfo>>(null)
const storeValue = ref<any>(null) // 门店选择器的值
const info = ref<DashBoardData>()
const isOvertime = ref(false)
const showCardRecharge = ref(false) // 显示开卡充值弹窗
const showVerifyPopup = ref(false) // 显示核销确认弹窗
const showScanSuccessPopup = ref(false) // 显示扫码核销成功弹窗
const loading = ref(true) // 加载状态，控制骨架屏显示

// 核销弹窗示例数据
const verifyData = ref({
  date: '2023.11.22 8:00-10:00',
  artisanName: '张硕',
  serviceType: '上门服务',
  status: '待服务',
  serviceName: '面部清洁补水',
  serviceDuration: '1小时',
  serviceImage: `${IMG_BASE}/icon-cus.png`, // 使用项目中的默认图片
  customerName: '王乐乐',
  customerPhone: '13800138000',
})

// 骨架屏配置 - 根据实际页面布局设计
const skeletonRowCol = ref([
  // 第一行：顶部统计卡片区域（带背景图，包含标题、大数字和3个小统计）
  { height: '280rpx' },
  // 第二行：统计数据区域（4列，白色卡片）
  [
    { width: '23%', height: '100rpx' },
    { width: '23%', height: '100rpx', marginLeft: '2%' },
    { width: '23%', height: '100rpx', marginLeft: '2%' },
    { width: '23%', height: '100rpx', marginLeft: '2%' },
  ],
  // 第三行：今日待服务标题
  { width: '40%', height: '50rpx' },
  // 第四行：今日待服务内容区域（横向滚动卡片）
  { height: '220rpx' },
  // 第五行：常用工具标题
  { width: '30%', height: '50rpx' },
  // 第六-七行：常用工具宫格区域（2行4列，共8个工具）
  [
    [
      { width: '22%', height: '140rpx' },
      { width: '22%', height: '140rpx', marginLeft: '4%' },
      { width: '22%', height: '140rpx', marginLeft: '4%' },
      { width: '22%', height: '140rpx', marginLeft: '4%' },
    ],
    [
      { width: '22%', height: '140rpx' },
      { width: '22%', height: '140rpx', marginLeft: '4%' },
      { width: '22%', height: '140rpx', marginLeft: '4%' },
      { width: '22%', height: '140rpx', marginLeft: '4%' },
    ],
  ],
] as any)
uni.showShareMenu({
  withShareTicket: true,
  menus: ['shareAppMessage', 'shareTimeline'],
})

onShareAppMessage((res) => {
  if (res.from === 'button') {
    // 来自页面内分享按
    return {
      title: '美预',
      path: `/pagesA/tabs/tab-business-dashboard`,
      // imageUrl: '',
    }
  }
  else {
    return {
      title: '美预',
      path: `/pagesA/tabs/tab-business-dashboard`,
      // imageUrl: '',
    }
  }
})
onShareTimeline(() => {
  return {
    title: '美预',
    // query: `share=${state.share}`, // 可不填 传递的参数，只能是这种格式
    // imageUrl: urlImg,
  }
})

onShow(() => {
  if (storeId.value)
    setStaffList()
  // 每次显示页面时重置加载状态
  loading.value = true
  initStore()
  const menuButtonInfo = getMenuButtonInfo()
  menuButtonWidth.value = menuButtonInfo?.barWidth
})

// 监听门店切换
watch(
  () => storeValue.value,
  async (val) => {
    if (val) {
      // 从 storeList 中找到选中的门店
      const selectedStore = userInfo.value?.storeList?.find(store => store.storeId === val)
      if (selectedStore) {
        // 更新 lastStore
        useUserStore().setUserInfo({ lastStore: selectedStore })
        // 重新获取工作台数据
        await request.put('/business/current-store-id', { storeId: val })
        getDashboardInfo()
      }
    }
  },
)

// 店铺初始化
async function initStore() {
  // const res = await request.get<UserInfo>('/business/info')
  // useUserStore().setUserInfo(res.data)

  userInfo.value = useUserStore().userInfo

  // 初始化门店选择器的值
  storeValue.value = userInfo.value.lastStore?.storeId || userInfo.value.storeList?.[0]?.storeId

  const isOwner = userInfo.value.lastStore?.isOwner

  if (!userInfo.value.lastStore) { // 如果店铺未创建
    return uni.navigateTo({ url: '/pagesA/init/steps/step1' })
  }

  if (isOwner) {
    if (!userInfo.value.staffSkip || !userInfo.value.productSkip || !userInfo.value.serviceSkip) { // 如果新手引导未完成
      return uni.navigateTo({ url: '/pagesA/init/steps/index' })
    }
  }

  getDashboardInfo()
}

// 获取工作台信息
async function getDashboardInfo() {
  try {
    const res = await request.get<DashBoardData>(`/business/workbench/${storeId.value}`)
    info.value = res.data

    // 判断是否过期
    const today = dayjs()
    const expTime = dayjs(info.value.orgExpiresTime)
    if (today.isAfter(expTime))
      isOvertime.value = true
  }
  finally {
    // 确保图片有时间加载，稍微延迟一下再隐藏骨架屏
    setTimeout(() => {
      loading.value = false
    }, 300)
  }
}

function toWallet() {
  uni.navigateTo({ url: '/pagesA/dashboard/wallet' })
}
function toRenew() {
  if (storeRole.value === 2 || storeRole.value === 3)
    return toast.warning('您没有权限操作续费，请联系店长或店铺拥有者')
  uni.navigateTo({ url: '/pagesA/my/renew' })
}
function toScanCode() {
  // 显示核销成功弹窗
  showScanSuccessPopup.value = true
}
function toScanCode2() {
  // uni.navigateTo({ url: '/pagesA/scan/index' })
  // 显示核销确认弹窗
  showVerifyPopup.value = true
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
  bookStime.value = ''
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
  curSelectedCardToCash.value = null
  curCardRechargeFormData.value = null
  curCustomer.value = null
  uni.navigateTo({ url: '/pagesA/card/make' })
}

// 确认核销
function confirmVerify() {
  showVerifyPopup.value = false
  uni.showToast({
    title: '核销成功',
    icon: 'success',
  })
}

// 关闭扫码核销成功弹窗
function closeScanSuccessPopup() {
  showScanSuccessPopup.value = false
}

// 结束服务
function finishService() {
  showScanSuccessPopup.value = false
  uni.showToast({ title: '已结束服务', icon: 'success' })
}

// 查看预约
function viewAppointment() {
  showScanSuccessPopup.value = false
  uni.navigateTo({ url: '/pagesA/book/index' })
}

function cancelVerify() {
  showVerifyPopup.value = false
}
</script>

<template>
  <wd-toast />
  <view px-24rpx>
    <wd-navbar :fixed="true" :placeholder="true" :safeAreaInsetTop="true" :bordered="false">
      <template #title>
        <view flex flex-ac flex-bt :style="{ width: `calc(100% - ${menuButtonWidth}px)` }">
          <wd-picker v-model="storeValue" value-key="storeId" label-key="storeName" :columns="userInfo?.storeList" use-default-slot>
            <view flex flex-ac gap-8px px-24rpx>
              <text>{{ userInfo?.lastStore?.storeName || userInfo?.storeList?.[0]?.storeName || '--' }}</text>
              <wd-icon name="fill-arrow-down" size="16px" />
            </view>
          </wd-picker>
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

    <wd-skeleton
      :loading="loading"
      animation="gradient"
      :row-col="skeletonRowCol"
    >
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

        <view v-if="isOvertime && storeRole !== 2 && storeRole !== 3 " mt-30px class="renew" flex flex-bt flex-ac gap-24rpx p-20px>
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
            <view v-if="storeRole !== 2" @click="toScanCode2()">
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
            <view v-if="storeRole !== 2 && storeRole !== 3" @click="toStoreManage()">
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
    </wd-skeleton>
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

  <!-- 扫码核销成功弹窗 -->
  <wd-popup v-model="showScanSuccessPopup" position="center" :closable="false" custom-style="border-radius:32rpx;width:90%;max-width:600rpx;background:transparent;" @close="closeScanSuccessPopup">
    <view class="scan-success-popup">
      <!-- 关闭按钮 -->
      <view class="close-btn" @click="closeScanSuccessPopup">
        <wd-icon name="close" size="24px" color="#fff" />
      </view>

      <!-- 庆祝图标 -->
      <view class="celebration-icon">
        🎉
      </view>

      <!-- 标题 -->
      <view class="success-title">
        核销成功
      </view>

      <!-- 签到信息 -->
      <view class="checkin-info">
        <text>张美丽 已签到</text>
      </view>

      <!-- 签到时间 -->
      <view class="checkin-time">
        <text>签到时间：21:41</text>
      </view>

      <!-- 分隔线 -->
      <view class="divider" />

      <!-- 操作按钮 -->
      <view class="action-buttons">
        <view class="action-btn" @click="finishService">
          <text>结束服务</text>
        </view>
        <view class="action-btn" @click="viewAppointment">
          <text>查看预约</text>
        </view>
      </view>

      <!-- 返回扫码按钮 -->
      <view class="back-scan-btn" @click="closeScanSuccessPopup">
        <text>返回扫码</text>
      </view>
    </view>
  </wd-popup>
  <wd-popup v-model="showVerifyPopup" position="center" :closable="false" custom-style="border-radius:32rpx;width:90%;">
    <view style="padding: 40rpx 48rpx">
      <!-- 标题 -->
      <view flex flex-ac gap-16rpx mb-32rpx>
        <wd-icon name="search" size="18px" color="#303030" />
        <text fb f18 c-303030>
          核销确认
        </text>
      </view>

      <view flex flex-ac flex-bt>
        <view>
          <!-- 预约时间 -->
          <view f16 c-303030 mb-20rpx>
            {{ verifyData.date }}
          </view>

          <!-- 手艺人和服务类型 -->
          <view flex flex-ac gap-16rpx mb-32rpx>
            <view flex flex-ac gap-8rpx>
              <text f14 fb c-161719>
                {{ verifyData.artisanName }}
              </text>
              <text f14 c-303030>
                ·
              </text>
              <view px-16rpx py-4rpx lh-28rpx bg-FF6619 color-white f12 style="border-radius: 4rpx;">
                {{ verifyData.serviceType }}
              </view>
            </view>
          </view>
        </view>

        <view px-40rpx py-16rpx style="background: #FFEDED;border-radius: 52rpx;">
          <text f13 c-DC312D fb>
            {{ verifyData.status }}
          </text>
        </view>
      </view>

      <!-- 服务项目 -->
      <view flex gap-24rpx mb-32rpx>
        <wd-img
          mode="aspectFill"
          :width="60"
          :height="60"
          :radius="8"
          :src="`${IMG_BASE}/icon-people.png`"
        />
        <view flex-1>
          <view f14 c-0D0D26 fb mb-8rpx flex flex-bt flex-ac>
            <text>{{ verifyData.serviceName }}</text>
            <text>x1</text>
          </view>
          <view f12 c-161719>
            {{ verifyData.serviceDuration }}
          </view>
        </view>
      </view>

      <!-- customer info -->
      <view flex flex-ac gap-16rpx mb-40rpx w-full style="justify-content: flex-end;">
        <wd-img
          :width="14"
          :height="14"
          :src="`${IMG_BASE}/icon-people.png`"
        />
        <text f14 c-303030 fb>
          {{ verifyData.customerName }}
        </text>
        <text f14 c-303030>
          ·
        </text>
        <text f14 c-303030>
          {{ verifyData.customerPhone }}
        </text>
      </view>

      <!-- 底部按钮 -->
      <view flex gap-24rpx>
        <view flex-1>
          <button class="verify-btn cancel-btn" @click="cancelVerify()">
            取消
          </button>
        </view>
        <view flex-1>
          <button class="verify-btn confirm-btn" @click="confirmVerify()">
            确认核销
          </button>
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
.scan-success-popup {
  background: linear-gradient(320deg, #70bd3f 0%, #579e32 98%);
  border-radius: 32rpx;
  padding: 60rpx 40rpx 40rpx;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;

  .close-btn {
    position: absolute;
    top: 24rpx;
    right: 24rpx;
    width: 48rpx;
    height: 48rpx;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .celebration-icon {
    font-size: 80rpx;
    margin-bottom: 24rpx;
  }

  .success-title {
    font-size: 48rpx;
    font-weight: bold;
    color: #fff;
    margin-bottom: 32rpx;
  }

  .checkin-info {
    font-size: 32rpx;
    color: #fff;
    margin-bottom: 16rpx;
  }

  .checkin-time {
    font-size: 28rpx;
    color: rgba(255, 255, 255, 0.9);
    margin-bottom: 48rpx;
  }

  .divider {
    width: 100%;
    height: 2rpx;
    background: rgba(255, 255, 255, 0.3);
    margin-bottom: 48rpx;
  }

  .action-buttons {
    display: flex;
    gap: 24rpx;
    width: 100%;
    margin-bottom: 32rpx;

    .action-btn {
      flex: 1;
      height: 88rpx;
      background: #85c161;
      border-radius: 12rpx;
      display: flex;
      align-items: center;
      justify-content: center;

      text {
        color: #fff;
        font-size: 28rpx;
        font-weight: 500;
      }
    }
  }

  .back-scan-btn {
    height: 88rpx;
    background: #fff;
    border-radius: 12rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;

    text {
      color: #1a66ff;
      font-size: 28rpx;
      font-weight: 500;
    }
  }
}

.verify-btn {
  width: 100%;
  height: 80rpx;
  line-height: 80rpx;
  text-align: center;
  font-size: 28rpx;
  border-radius: 8rpx;
  border: none;
  padding: 0;
  margin: 0;
  &.cancel-btn {
    background-color: #f5f5f5;
    color: #303030;
  }
  &.confirm-btn {
    background-color: #1a66ff;
    color: #ffffff;
  }
}
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
  width: 72px;
  height: 24px;
  line-height: 24px;
  text-align: center;
  color: #fff;
  font-size: 12px;
  background-color: #e3c377;
  border-radius: 13px;
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
