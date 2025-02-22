<route lang="yaml">
style:
  navigationBarTitleText: 选择卡项
</route>

<script lang="ts" setup>
import type { AllItems, AvailableCard, CardList, CatsItemsTree } from '../types'

const active = ref<number>(0)
const scrollTop = ref<number>(0)
const categories = ref<CatsItemsTree<CardList>[]>([])
const cardImgName = { // 1->次卡，2->充值卡，3->折扣卡
  1: 'bg_ck',
  2: 'bg_czk',
  3: 'bg_zkk',
}

const cType = ref<number>(-1) // 1->次卡，2->充值卡，3->折扣卡
const cSecondType = ref<number>(-1) // 0非次卡，1->有限次卡，2->不限次卡，3->通卡

// 可用充值卡列表
const customerCashCardList = ref<AvailableCard[]>([])

onLoad(async (option) => {
  /**
   * 当前选中的开卡充值类型
   * 1: '折扣卡'
   * 2: '充值卡'
   * 3: '通卡'
   * 4: '有限次卡'
   * 5: '不限次卡'
   * 6: '充值'
   */
  if (curCardRechargeType.value === 6) {
    const storeCustomerId = option?.storeCustomerId
    const res = await request.get<AvailableCard[]>('/business/store-customer-card-valid', { storeCustomerId })
    customerCashCardList.value = res.data.filter(v => v.cardType === 2 && v.isValid)
  }
  else {
    if (curCardRechargeType.value === 1) { cType.value = 3; cSecondType.value = 0 }
    if (curCardRechargeType.value === 2) { cType.value = 2; cSecondType.value = 0 }
    if (curCardRechargeType.value === 3) { cType.value = 1; cSecondType.value = 3 }
    if (curCardRechargeType.value === 4) { cType.value = 1; cSecondType.value = 1 }
    if (curCardRechargeType.value === 5) { cType.value = 1; cSecondType.value = 2 }

    const res = await request.get<AllItems>('/business/goods_all', { storeId: storeId.value })
    const cardCats = res.data.cardCategory!
    cardCats.unshift({
      id: 0,
      name: '所有分类',
      storeId: null,
    })
    console.log(cType.value, cSecondType.value)
    const cards = res.data.cardList.filter((v) => {
      return cType.value === 1
        ? (v.type === cType.value) && (v.secondType === cSecondType.value)
        : v.type === cType.value
    })
    categories.value = cardCats.map((v) => {
      return {
        id: v.id,
        label: v.name,
        items: v.id === 0
          ? cards
          : cards.filter(v1 => v.id === v1.categoryId).map((v2) => {
            return { ...v2, checked: false }
          }),
      }
    })
  }
})

function handleChange({ value }) {
  active.value = value
  scrollTop.value = -1
  nextTick(() => {
    scrollTop.value = 0
  })
}

function toDetail(id) {
  uni.navigateTo({ url: `/pagesA/card/detail?id=${id}` })
}

function selectItem(itm: any) {
  curSelectedCard.value = itm
  uni.navigateBack()
}

function selectItem2(itm: any) {
  curSelectedCardToCash.value = itm
  uni.navigateBack()
}
</script>

<template>
  <view class="wrapper">
    <!-- 开卡 -->
    <template v-if="curCardRechargeType !== 6">
      <wd-sidebar v-model="active" @change="handleChange">
        <wd-sidebar-item
          v-for="(item, index) in categories"
          :key="index"
          :value="index"
          :label="item.label"
        />
      </wd-sidebar>
      <view class="content" :style="`transform: translateY(-${active * 100}%)`">
        <scroll-view
          v-for="(item, index) in categories"
          :key="`cat-${index}`"
          class="category"
          scroll-y
          scroll-with-animation
          :show-scrollbar="true"
          :scroll-top="scrollTop"
          :throttle="false"
        >
          <view p12px>
            <view v-for="(itm, idx) in item.items" :key="`itm-${idx}`" h132px mb12px pr>
              <image
                style="width: 100%;height: 132px;"
                mode="aspectFill"
                :src="`${IMG_BASE}/cards/${cardImgName[itm.type]}.png`"
              />
              <view class="txt" flex flex-y flex-bt>
                <view p12px flex-grow-1 @click="selectItem(itm)">
                  <view flex flex-bt flex-ac>
                    <view fs-14px>
                      {{ itm.name }}
                    </view>
                    <view
                      text-20rpx w-88rpx h-40rpx lh-40rpx tc flex flex-cc
                      style="background: transparent;border-radius: 32rpx;border: 1px solid #fff;color: #fff"
                    >
                      {{ CardTypeMap[itm.type] }}
                    </view>
                  </view>
                  <view fs-14px mt-10px>
                    <template v-if="itm.type === 1">
                      <text>￥{{ itm.price }}&#12288;</text>
                      <text>权益次数：{{ itm.countLimit || '不限' }}次</text>
                    </template>
                    <template v-if="itm.type === 2">
                      <text>本金￥{{ itm.price }}&#12288;</text>
                      <text>赠金￥{{ itm.gift }}</text>
                    </template>
                    <template v-if="itm.type === 3">
                      <text>￥{{ itm.price }}&#12288;</text>
                      <text>{{ getDiscounts(itm) }}折</text>
                    </template>
                  </view>
                  <view fs-12px mt-10px>
                    <text>有效期：</text>
                    <text v-if="itm.expires === 0">
                      永久有效
                    </text>
                    <text v-else>
                      购买后{{ itm.expires }}天内有效
                    </text>
                  </view>
                </view>
                <view
                  fs-12px
                  flex flex-ac flex-xr h30px w100% pr12px style="background-color: rgba(0, 0, 0, 0.2);
              border-bottom-left-radius: 4px;border-bottom-right-radius: 4px"
                  @click="toDetail(itm.id)"
                >
                  查看详情&nbsp;>
                </view>
              </view>
            </view>
          </view>
        </scroll-view>
      </view>
    </template>

    <!-- 充值 -->
    <template v-else>
      <view v-if="customerCashCardList.length > 0" px20px py20px>
        <view v-for="(itm, idx) in customerCashCardList" :key="`itm-${idx}`" h132px mb12px pr style="width: calc(100vw - 40px);">
          <image
            style="width: calc(100vw - 40px);height: 132px;"
            mode="aspectFill"
            :src="`${IMG_BASE}/cards/bg_czk.png`"
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
                  充值卡
                </view>
              </view>
              <view fs-14px mt-10px>
                <text>剩余金额￥{{ itm.totalAmount }}&nbsp;</text>
              </view>
              <view fs-12px mt-10px>
                <text>有效期：</text>
                <text v-if="itm.isLongTerm === 1">
                  永久有效
                </text>
                <text v-else>
                  有效期：{{ itm.expiresTimeDesc }}
                </text>
              </view>
            </view>
            <view
              fs-12px
              flex flex-ac flex-xr h30px w100% pr12px style="background-color: rgba(0, 0, 0, 0.2);
              border-bottom-left-radius: 4px;border-bottom-right-radius: 4px"
              @click="toDetail(itm.id)"
            >
              查看详情&nbsp;>
            </view>
          </view>
        </view>
      </view>
      <wd-status-tip v-else image="content" tip="暂无可选卡项" />
    </template>
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
  overflow: hidden;
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
