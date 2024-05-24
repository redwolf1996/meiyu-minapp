<route lang="yaml">
layout: home
style:
  navigationBarTitleText: 工作台
  navigationStyle: custom
</route>

<script lang="ts" setup>
import { getMenuButtonInfo } from '@/utils/index'

const menuButtonWidth = ref(0)
onLoad(() => {
  const menuButtonInfo = getMenuButtonInfo()
  menuButtonWidth.value = menuButtonInfo.barWidth
})
</script>

<template>
  <wd-navbar :safeAreaInsetTop="true" :bordered="false">
    <template #title>
      <view flex flex-ac flex-bt text-left :style="{ width: `calc(100% - ${menuButtonWidth}px)` }">
        <view>美婷美甲美睫</view>
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

  <view class="conitaner">
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

    <view mt-30px>
      <view class="title">
        常用工具
      </view>
      <view h-12px />
      <wd-grid :column="3">
        <wd-grid-item v-for="index in 6" :key="index" :use-icon-slot="true" text="文字">
          <template #icon>
            <wd-img
              :width="(index === 5 || index === 6) ? 30 : 24"
              :height="(index === 5 || index === 6) ? 30 : 24"
              :src="`${IMG_BASE}/icon-tool-${index}.png`"
            />
          </template>
        </wd-grid-item>
      </wd-grid>
    </view>

    <view h-50px />
  </view>
</template>

<style lang="scss" scoped>
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
  color: #141414;
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
