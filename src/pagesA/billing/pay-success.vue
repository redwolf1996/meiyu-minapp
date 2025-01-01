<route lang="yaml">
style:
  navigationBarTitleText: 支付结果
</route>

<script lang="ts" setup>
const amount = ref(0)
const points = ref(0)
const orderId = ref(0)
const mode = ref(1) // 1 开单 2开卡 3充值 4预约

onLoad((options) => {
  orderId.value = +options.orderId
  mode.value = +options.mode
  amount.value = +options.amount
  points.value = +options.points
})

// 返回首页
function toDashboard() {
  uni.navigateTo({ url: '/pagesA/tabs/tab-business-dashboard' })
}

// 继续开单
function continueOrder() {
  curCustomer.value = null // 进入页面前清空store内容
  resetGoods()
  uni.navigateTo({ url: '/pagesA/billing/index' })
}

// 继续开卡
function continueCard() {
  uni.navigateTo({ url: '/pagesA/tabs/tab-business-dashboard' })
}

// 继续充值
function continueRecharge() {
  uni.navigateTo({ url: '/pagesA/tabs/tab-business-dashboard' })
}

// 继续预约
function continueBooking() {
  uni.navigateTo({ url: '/pagesA/tabs/tab-business-dashboard' })
}

// 查看订单详情
function toOrderDetail() {
  uni.navigateTo({ url: `/pagesA/order/detail?id=${orderId.value}` })
}
</script>

<template>
  <view p20px>
    <view tc fb fs-14px>
      支付成功
    </view>
    <view class="h25px" />
    <view tc fb fs-28px>
      ￥{{ amount }}
    </view>
    <view class="h40px" />
    <view bg-white px12px py16px>
      <view c-#969696 fs-12px tc>
        客户获得
      </view>
      <view mt10px bg-#FEF6F3 rd-10px py10px px16px flex flex-ac gap16px>
        <wd-img
          :width="30"
          :height="30"
          mode="aspectFill"
          :src="`${IMG_BASE}/pay-star.png`"
        />
        <view flex flex-y flex-bt h46px>
          <view fb>
            {{ points }}积分
          </view>
          <view c-#6C6666 fs-12px>
            当前已到账
          </view>
        </view>
      </view>
    </view>
    <view class="menu" mt40px>
      <view class="item" @click="toOrderDetail()">
        查看订单
      </view>
      <view v-if="mode === 1" class="item mid" @click="continueOrder()">
        继续开单
      </view>
      <view v-else-if="mode === 2" class="item mid" @click="continueCard()">
        继续开卡
      </view>
      <view v-else-if="mode === 3" class="item mid" @click="continueRecharge()">
        继续充值
      </view>
      <view v-else-if="mode === 4" class="item mid" @click="continueBooking()">
        继续预约
      </view>
      <view class="item" @click="toDashboard()">
        返回工作台
      </view>
    </view>
  </view>
</template>

<style lang='scss' scoped>
.menu {
  display: flex;
  justify-content: center;
  color: #a3a4a6;
  font-size: 12px;
  align-items: center;
  .item {
    width: 88px;
    text-align: center;
  }
  .mid {
    border-left: 1px solid #a3a4a6;
    border-right: 1px solid #a3a4a6;
  }
}
</style>
