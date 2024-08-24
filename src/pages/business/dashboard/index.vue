<route lang="yaml">
style:
  navigationBarTitleText: 工作台
  navigationStyle: custom
</route>

<script lang="ts" setup>
import { getMenuButtonInfo } from '@/utils/index'

const menuButtonWidth = ref(0)
onLoad(() => {
  initStore()
  // #ifdef MP-WEIXIN
  const menuButtonInfo = getMenuButtonInfo()
  menuButtonWidth.value = menuButtonInfo.barWidth
  // #endif
})
const h = getMenuButtonInfo()

// 店铺初始化
async function initStore() {
  const res = await request.get<any>('/business/info')
  if (res.data.orgInfo) { // 如果是商家
    if (!res.data.orgInfo.storeCount) { // 如果还没有创建店铺
      my.navigateTo('/pages/business/init/steps/step1')
    }
  }
}
</script>

<template>
  <view px-24rpx>
    <wd-navbar :fixed="true" :safeAreaInsetTop="true" :bordered="false">
      <template #title>
        <view flex flex-ac flex-bt :style="{ width: `calc(100% - ${menuButtonWidth}px)` }">
          <view px-24rpx>
            美婷美甲美睫
          </view>
          <view flex flex-y flex-cc pr-20rpx pr>
            <wd-img
              :width="28"
              :height="28"
              :src="`${IMG_BASE}/icon-msg.png`"
            />
            <text
              style="right: 16rpx;top: -6rpx;"
              pa top-0 w-30rpx h-30rpx lh-30rpx tc bg-#FE502E
              round color-#fff font-size-20rpx
            >
              3
            </text>
          </view>
        </view>
      </template>
    </wd-navbar>

    <view class="conitaner" pr>
      <view bd :style="{ height: `${h.barHeight + h.barTop}px` }" />
      <view
        p-40rpx color-white pr
        style="background-size: cover;"
        :style="{ backgroundImage: `url(${IMG_BASE}/bg-dashboard.png)` }"
      >
        <view f14>
          本月收入(元)
        </view>
        <view fb font-size-64rpx mt-12px>
          26237.23
        </view>
        <view flex mt-20px gap-40px>
          <view wp-33.3333>
            <view f12 style="opacity: .6;">
              今日收入
            </view>
            <view f16 mt-12rpx>
              777
            </view>
          </view>
          <view wp-33.3333>
            <view f12 style="opacity: .6;">
              本月消耗金额
            </view>
            <view f16 mt-12rpx>
              123
            </view>
          </view>
          <view wp-33.3333>
            <view f12 style="opacity: .6;">
              本月开卡充值
            </view>
            <view f16 mt-12rpx>
              3233
            </view>
          </view>
        </view>
        <view
          class="wallet"
          px-16px py-8px color-white pa flex flex-ac right-0 top-20px
          style="background-color: rgba(255,255,255,0.2);border-radius: 31px 0px 0px 31px;"
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
            0
          </view>
          <view f12 color-#646466 mt-2px>
            普通客户
          </view>
        </view>
        <view wp-25>
          <view fb f18>
            0
          </view>
          <view f12 color-#646466 mt-2px>
            VIP
          </view>
        </view>
        <view wp-25>
          <view fb f18>
            0
          </view>
          <view f12 color-#646466 mt-2px>
            本月预约
          </view>
        </view>
        <view wp-25>
          <view fb f18>
            0
          </view>
          <view f12 color-#646466 mt-2px>
            待服务
          </view>
        </view>
      </view>

      <view mt-30px>
        <view class="title">
          今日预约(4)
        </view>
        <view>
          <scroll-view :scrollX="true" style="white-space: nowrap;">
            <DashboardCard />
            <DashboardCard />
            <DashboardCard />
          </scroll-view>
        </view>
      </view>

      <view mt-30px class="renew" flex flex-bt flex-ac gap-24rpx>
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
            您的服务已于2024年10月6日到期，历史数据仍可正常查询，请尽快续费以享受完整服务。
          </view>
        </view>
        <view class="renew-btn">
          立即续费
        </view>
      </view>

      <view mt-30px>
        <view class="title">
          常用工具
        </view>
        <view h-20px />
        <view class="grid">
          <view>
            <i i-ant-design-user-add-outlined fs-64 c-1563ff />
            <text>添加客户</text>
          </view>
          <view>
            <i i-material-symbols-add-notes-outline fs-64 c-1563ff />
            <text>新增预约</text>
          </view>
          <view>
            <i i-mdi-credit-card-check-outline fs-64 c-1563ff />
            <text>开单收银</text>
          </view>
          <view>
            <i i-mdi-order-bool-ascending fs-64 c-1563ff />
            <text>订单列表</text>
          </view>
          <view>
            <i i-tabler-address-book fs-64 c-1563ff />
            <text>预约列表</text>
          </view>
          <view>
            <i i-mingcute-shop-line fs-64 c-1563ff />
            <text>店务管理</text>
          </view>
        </view>
      </view>

      <view h-100px />
    </view>
  </view>

  <view wp-100 pf bottom-0 h-48px>
    <wd-img
      :height="48"
      width="100%"
      :src="`${IMG_BASE}/invite-banner.png`"
    />
  </view>
</template>

<style lang="scss" scoped>
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
  grid-template-columns: repeat(3, 1fr);
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
</style>
