<route lang="yaml">
style:
  navigationBarTitleText: 选择卡项
</route>

<script lang="ts" setup>
import type { AvailableCard } from '../types'

const cardImgName = { // 1->次卡，2->充值卡，3->折扣卡
  1: 'bg_ck',
  2: 'bg_czk',
  3: 'bg_zkk',
}

const customerCashCardList = ref<AvailableCard[]>([])

onLoad(async (option) => {
  const storeCustomerId = option?.storeCustomerId
  const goodsId = option?.goodsId
  const goodsType = option?.goodsType
  const res = await request.get<AvailableCard[]>('/business/store-customer-card-valid', { storeCustomerId, goodsId, goodsType })
  customerCashCardList.value = res.data
})

function toDetail(id) {
  uni.navigateTo({ url: `/pagesA/card/detail?id=${id}` })
}

function selectItem2(itm: any) {
  curSelectedCardToCash.value = itm
  uni.navigateBack()
}
</script>

<template>
  <view class="wrapper">
    <view v-if="customerCashCardList.length > 0" px20px py20px>
      <view v-for="(itm, idx) in customerCashCardList" :key="`itm-${idx}`" h102px mb12px pr style="width: calc(100vw - 40px);">
        <image
          style="width: calc(100vw - 40px);height: 102px;"
          mode="aspectFill"
          :src="`${IMG_BASE}/cards/${cardImgName[itm.cardType]}.png`"
        />
        <view class="txt" flex flex-y flex-bt>
          <view p12px flex-grow-1 @click="selectItem2(itm)">
            <view flex flex-bt flex-ac>
              <view fs-14px>
                {{ itm.cardName }}
              </view>
              <view
                text-20rpx w-88rpx h-40rpx lh-40rpx tc flex flex-cc
                style="background: transparent;border-radius: 32rpx;border: 1px solid #fff;color: #fff"
              >
                {{ CardTypeMap[itm.cardType] }}
              </view>
            </view>
            <view fs-14px mt-10px>
              <template v-if="itm.cardType === 1">
                <text>￥{{ itm.amount }}&nbsp;</text>
                <text>可用次数：{{ itm.equity }}次</text>
              </template>
              <template v-if="itm.cardType === 2">
                <text>剩余金额￥{{ itm.totalAmount }}&nbsp;</text>
              </template>
              <template v-if="itm.cardType === 3">
                <text>￥{{ itm.amount }}&nbsp;</text>
                <text>{{ itm.equity }}折</text>
              </template>
            </view>
            <view fs-12px mt-10px>
              <text>有效期：</text>
              <text v-if="itm.isLongTerm === 1">
                永久有效
              </text>
              <text v-else>
                {{ itm.expiresTimeDesc }}
              </text>
            </view>
          </view>
          <!-- <view
            fs-12px
            flex flex-ac flex-xr h30px w100% pr12px style="background-color: rgba(0, 0, 0, 0.2);
              border-bottom-left-radius: 4px;border-bottom-right-radius: 4px"
            @click="toDetail(itm.cardId)"
          >
            查看详情&nbsp;>
          </view> -->
        </view>
      </view>
    </view>
    <wd-status-tip v-else image="content" tip="暂无充值卡" />
  </view>
</template>

<style>
page {
  height: 100vh;
  background: #fff;
  overflow-y: hidden;
}
</style>

<style lang='scss' scoped>
.txt {
  color: #ffffff;
  position: absolute;
  height: 132px;
  width: 100%;
  z-index: 200;
  left: 0;
  top: 0;
}
.wrapper {
  display: flex;
  height: calc(100vh - 50px);
  overflow: auto;
}
.content {
  flex: 1;
  background: #fff;
  transition: transform 0.3s ease;
  height: 100%;
}
.category {
  box-sizing: border-box;
  height: 100%;
  overflow: hidden;
}
.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 90px;
  position: fixed;
  padding: 0 20px;
  width: 100%;
  bottom: 0;
  background-color: #fff;
}
.this-tab {
  padding: 0 100rpx;
}
</style>
