<route lang="yaml">
style:
  navigationBarTitleText: 支付
</route>

<script lang="ts" setup>
import { PayModeEnum } from '@/utils/consts'
import type { CashCard, PayRefundType, PayType } from './types'
import { pick } from 'lodash-es'

const toast = useToast()
const curCode = ref<number | null >(null)
const mode = ref(0) // 1 开单 2开卡 3充值 4预约
const payTypes = ref<PayType[]>([])
const payMode = ref<1 | 2>(1) // 1线下记账收款 2储值卡支付

const postUrl = ref('')
const formData = ref<any>(null)
const orderId = ref(0)
const repayAmount = ref(0) // 稍后支付的订单金额
const curCard = ref<CashCard>(null)

onLoad(async (option) => {
  // 获取支付方式
  await request.get<PayRefundType>('/pay-type-conf').then((res) => {
    payTypes.value = res.data.payType?.map((v) => {
      return {
        ...v,
        active: false,
      }
    })
  })

  //  1 开单 2开卡 3充值 4预约
  if (option?.createSource) {
    mode.value = Number(option?.createSource)
  }
  if (option?.repayAmount) {
    repayAmount.value = Number(option?.repayAmount)
  }
  if (option?.mode) { // 1 开单 2开卡 3充值
    mode.value = Number(option?.mode)
  }
  if (option?.orderId) {
    orderId.value = Number(option?.orderId)
  }
  if (mode.value) {
    if (mode.value === PayModeEnum.MakeOrder) {
      formData.value = curBilling.value
      postUrl.value = '/business/billing'
      const amount = repayAmount.value || curBilling.value.amount
      getAvailableCashCards(option.storeCustomerId || 0, amount)
    }

    if (mode.value === PayModeEnum.MakeCard) {
      const data = pick(curCardRechargeFormData.value, [
        'orderTime',
        'storeCustomerId',
        'customerCardId',
        'cardId',
        'adviserId',
        'notes',
        'amount',
        'gift',
        'payType',
      ])
      formData.value = data
      postUrl.value = '/business/store-customer-card'
    }

    if (mode.value === PayModeEnum.Recharge) {
      const data = pick(curCardRechargeFormData.value, [
        'orderTime',
        'storeCustomerId',
        'customerCardId',
        'adviserId',
        'notes',
        'amount',
        'gift',
        'payType',
      ])
      formData.value = data
      postUrl.value = '/business/value-card-recharge'
    }

    if (mode.value === PayModeEnum.Booking) {
      getAvailableCashCards(bookInfo.value.storeCustomerId || 0, bookInfo.value.amount)
      formData.value = bookInfo.value
      postUrl.value = '/business/booking'
    }
  }
})

// 过滤用户可用的储值卡，如果其中有一张可用则开启储值卡支付
const cashCards = ref<CashCard[]>([])
async function getAvailableCashCards(storeCustomerId, amount) {
  const res = await request.get<CashCard[]>('/business/store-customer-value-card', { storeCustomerId })
  cashCards.value = res.data.filter(v => v.amount >= amount).map((v, i) => {
    return {
      ...v,
      active: i === 0,
    }
  })
  if (cashCards.value.length > 0) {
    curCard.value = cashCards.value[0]
    payMode.value = 2
  }
}

async function pay() {
  if (!curCode.value && !curCard.value?.id)
    return toast.warning('请选择支付方式')

  let amount = 0
  let points = 0
  if (orderId.value) { // 待支付订单支付
    const res = await request.post<any>('/business/order/pay', {
      orderId: orderId.value,
      payType: curCode.value,

      customerCardId: curCard.value?.id,
    })
    amount = res.data?.payAmount
    points = res.data?.gainIntegral
  }
  else { // 正常支付（mode  1 开单 2开卡 3充值 4预约）
    formData.value.payType = curCode.value
    if (mode.value !== 3) { // 充值不需要选择储值卡
      formData.value.customerCardId = curCard.value?.id
    }
    const res = await request.post<any>(postUrl.value, formData.value)
    orderId.value = res.data.orderId
    amount = res.data.payAmount
    points = res.data.gainIntegral
  }

  toast.info('支付成功')
  await sleep(1000)
  uni.redirectTo({ url: `/pagesA/billing/pay-success?orderId=${orderId.value}&mode=${mode.value}&amount=${amount}&points=${points}` })
}

function selectItem(code: number, index: number) {
  curCode.value = code
  payTypes.value.map((v) => {
    v.active = false
  })
  payTypes.value[index].active = true
}

function selectCard(card: CashCard) {
  cashCards.value.map((v) => {
    v.active = false
  })
  card.active = true
  curCard.value = card
}

// 稍后支付（预约）
async function payLater() {
  formData.value.payType = null
  await request.post('/business/booking', formData.value)
  toast.info('待客户支付后，可找到该订单再次进行支付')
  await sleep(1000)
  uni.reLaunch({ url: '/pagesA/tabs/tab-business-dashboard' })
}

const debouncedPay = debounce(pay, 2000)
const debouncedPayLater = debounce(payLater, 2000)
</script>

<template>
  <wd-toast />
  <view tc bg-white py20px>
    <text fs-14px>
      待收款：
    </text>
    <text fs-20px c-#FA483C>
      ￥{{ repayAmount || formData?.amount }}
    </text>
  </view>
  <view h12px wp100 bg-#F6F6FB />
  <view bg-white py20px px20px>
    <view v-if="payMode === 1" class="pay-grid" gap20px mb20px>
      <view v-for="(item, index) in payTypes" :key="`code-${index}`" class="item" :class="{ active: item.active }" @click="selectItem(item.code, index)">
        <text abs-cc fs-14px font-bold>
          {{ item.desc }}
        </text>
        <text class="bottom-text">
          记账收款
        </text>
        <wd-img
          v-if="item.active"
          custom-class="corner"
          :width="16"
          :height="15.4"
          :src="`${IMG_BASE}/corner-right.png`"
        />
      </view>
    </view>

    <view v-if="payMode === 2">
      <view fs-16px>
        会员余额
      </view>
      <view v-for="(item, index) in cashCards" :key="`card-${index}`" class="card-item" :class="{ active: item?.active }" @click="selectCard(item)">
        <view fs-16px mb10px>
          {{ item?.cardName }}
        </view>
        <view flex flex-ac mb10px>
          <view fs-20px fb>
            ￥{{ item?.totalAmount }}
          </view>
          <view fs-14px c-#FA483C pl20px>
            将消耗￥{{ repayAmount || formData?.amount }}
          </view>
        </view>
        <view flex flex-ac fs-14px>
          <view>本金￥{{ item?.amount }}</view>
          <view pl20px>
            赠金￥{{ item?.gift }}
          </view>
        </view>
        <wd-img
          v-if="item?.active"
          custom-class="corner"
          :width="16"
          :height="15.4"
          :src="`${IMG_BASE}/corner-right.png`"
        />
      </view>
    </view>
  </view>

  <view class="h150px" />

  <view fixed bottom-30px wp100>
    <view v-if="mode !== 4" mx-40rpx mt-164rpx color-white>
      <wd-button size="large" custom-class="theme-bg" block @click="debouncedPay">
        <view flex flex-cc>
          <text>结账</text>
        </view>
      </wd-button>
    </view>

    <view v-else mx-40rpx mt-164rpx color-white flex flex-cc gap10px>
      <view w120px @click="debouncedPayLater">
        <wd-button size="large" :plain="true" block>
          <view flex flex-cc>
            <text>稍后付款</text>
          </view>
        </wd-button>
      </view>
      <view w104px @click="debouncedPay">
        <wd-button size="large" custom-class="theme-bg" block>
          <view flex flex-cc>
            <text>结账</text>
          </view>
        </wd-button>
      </view>
    </view>
  </view>
</template>

<style>
.corner {
  position: absolute !important;
  right: 0;
  bottom: 0;
}
</style>

<style lang='scss' scoped>
.card-item {
  border: 1px solid #d8d8d8;
  padding: 14px;
  margin-top: 20px;
  position: relative !important;
  &.active {
    border: 1px solid #2d60ff;
  }
}
.pay-grid {
  display: grid;
  grid-gap: 20rpx;
  grid-template-columns: repeat(2, 1fr); // css in js
}
.item {
  border: 1px solid #d8d8d8;
  border-radius: 2px;
  position: relative;
  height: 60px;
  .abs-cc {
    display: block;
    width: 90%;
    text-align: center;
  }
  &.active {
    border: 1px solid #2d60ff;
  }
}
.bottom-text {
  position: absolute;
  bottom: 2px;
  left: 50%;
  transform: translateX(-50%);
  color: #818181;
  font-size: 12px;
}
</style>
