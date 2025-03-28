<route lang="yaml">
style:
  navigationBarTitleText: 提现申请
</route>

<script lang="ts" setup>
const cashAmount = ref<number>(0) // 提现金额
onLoad((options) => {
  cashAmount.value = Number(options?.cashAmount)
})

function handleBack() {
  uni.redirectTo({
    url: '/pagesA/tabs/tab-business-dashboard',
  })
}

function toWallet() {
  uni.navigateTo({
    url: '/pagesA/dashboard/wallet',
  })
}

function toMy() {
  uni.navigateTo({
    url: '/pagesA/tabs/tab-business-my',
  })
}
</script>

<template>
  <view tc>
    <view class="h60px" />
    <view>申请成功</view>
    <view class="h30px" />
    <view fs-28px fb>
      ￥{{ cashAmount }}
    </view>
    <view class="h40px" />
    <view f12 c-#6C6666>
      可在“微信支付-服务-钱包-账单”查看明细
    </view>
    <view class="h40px" />
    <view flex flex-ac flex-cc fs-12px lh-18px c-#A3A4A6>
      <view tc w-88px @click="handleBack">
        返回首页
      </view>
      <view tc w-88px style="border-right: 1px solid #E9EAEC;border-left: 1px solid #E9EAEC;" @click="toWallet">
        我的钱包
      </view>
      <view tc w-88px @click="toMy">
        我的
      </view>
    </view>
  </view>
</template>

<style lang='scss' scoped>
</style>
