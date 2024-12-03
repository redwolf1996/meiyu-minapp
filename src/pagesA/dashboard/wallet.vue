<route lang="yaml">
style:
  navigationBarTitleText: 我的钱包
</route>

<script lang="ts" setup>
import type { Wallet } from './types'

const show = ref(false)
const info = ref<Wallet>()

onShow(() => {
  getInfo()
})

async function getInfo() {
  const res = await request.get<Wallet>(`/business/store-wallet/${storeId.value}`)
  info.value = res.data
}

function toDetail() {
  uni.navigateTo({ url: '/pagesA/dashboard/income-detail' })
}
function toRecords() {
  uni.navigateTo({ url: '/pagesA/dashboard/cashing-records' })
}
</script>

<template>
  <view
    style="background-size: cover;"
    :style="{ backgroundImage: `url(${IMG_BASE}/bg-wallet.png)` }"
  >
    <view h-24px />
    <view tc c-fff>
      总余额(元)
    </view>
    <view h-10px />
    <view flex flex-cc c-fff>
      <view v-if="show" tc>
        <text fs-64>
          {{ info?.platformAmount ?? '--' }}
        </text>
      </view>
      <view v-else tc style="transform: translateY(10rpx);">
        <text fs-64>
          ****
        </text>
      </view>
      <view w-10px />
      <wd-icon v-if="show" name="eye-close" color="white" size="24px" @click="show = false" />
      <wd-icon v-else name="view" color="white" size="24px" @click="show = true" />
    </view>
    <view h-40px />
    <view class="btn">
      <text>全部提现到微信零钱</text>
    </view>
    <view h-44px />
    <view class="cash" c-fff flex flex-cc tc p-10px>
      <view wp-33.3333>
        <view f12 style="opacity: 0.5;">
          累计收入(元)
        </view>
        <view f14 mt10rpx>
          {{ info?.totalAmount ?? '--' }}
        </view>
      </view>
      <view wp-33.3333>
        <view f12 style="opacity: 0.5;">
          可提现余额(元)
        </view>
        <view f14 mt10rpx>
          {{ info?.frozenAmount ?? '--' }}
        </view>
      </view>
      <view wp-33.3333>
        <view f12 style="opacity: 0.5;">
          已提现收入(元)
        </view>
        <view f14 mt10rpx>
          {{ info?.withdrawAmount ?? '--' }}
        </view>
      </view>
    </view>
  </view>

  <view py-26rpx px-40rpx style="border-bottom: 1px solid #EBEEF1;" @click="toDetail()">
    <view flex flex-bt>
      <view flex flex-cc gap-26rpx>
        <wd-img
          :width="16"
          :height="16"
          :src="`${IMG_BASE}/icon-shouzhi.png`"
        />
        <view fs-30>
          我的收支明细
        </view>
      </view>
      <view flex tc flex-cc>
        <i i-material-symbols-light-chevron-right fn fs-40 color-999 style="transform: translateY(2rpx);" />
      </view>
    </view>
  </view>

  <view p-26rpx px-40rpx style="border-bottom: 1px solid #EBEEF1;" @click="toRecords()">
    <view flex flex-bt>
      <view flex flex-cc gap-26rpx>
        <wd-img
          :width="16"
          :height="16"
          :src="`${IMG_BASE}/icon-tixian.png`"
        />
        <view fs-30>
          我的提现记录
        </view>
      </view>
      <view flex tc flex-cc>
        <i i-material-symbols-light-chevron-right fn fs-40 color-999 style="transform: translateY(2rpx);" />
      </view>
    </view>
  </view>

  <view h-180rpx />
  <view f12 tc c-F53F3F>
    <view>
      往微信零钱账号的授权页面
    </view>
    <view mt-22rpx>
      工信部要求收集用户信息 需用户同意授权--隐私协议需体现
    </view>
  </view>
</template>

<style lang='scss' scoped>
.cash {
  background: rgba(255, 255, 255, 0.1);
}
.btn {
  text-align: center;
  color: #fff;
  padding: 10px 20px;
  border: 2px solid #fff;
  text-wrap: nowrap;
  width: 50%;
  margin: 0 auto;
}
</style>
