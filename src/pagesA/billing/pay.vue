<route lang="yaml">
style:
  navigationBarTitleText: 支付
</route>

<script lang="ts" setup>
import { PayModeEnum } from '@/utils/consts'
import type { CashCard } from './types'

const toast = useToast()
const curCode = ref(4)
const mode = ref(0) // 1 开单 2开卡 3充值
const payTypes = ref([
  {
    code: 1,
    desc: '现金',
    active: false,
  },
  {
    code: 2,
    desc: '银行卡',
    active: false,
  },
  {
    code: 3,
    desc: '移动支付',
    active: false,
  },
  {
    code: 4,
    desc: '微信(手工)',
    active: true,
  },
  {
    code: 5,
    desc: '支付宝(手工)',
    active: false,
  },
  {
    code: 6,
    desc: '其他',
    active: false,
  },
  // {
  //   code: 7,
  //   desc: '储值卡',
  //   active: false,
  // },
  {
    code: 8,
    desc: '美团',
    active: false,
  },
  {
    code: 9,
    desc: '抖音',
    active: false,
  },
  {
    code: 10,
    desc: '线下收款',
    active: false,
  },
])
const payMode = ref<1 | 2>(1) // 1线下记账收款 2储值卡支付

const postUrl = ref('')
const formData = ref<any>(null)
const orderId = ref(0)
const repayAmount = ref(0) // 稍后支付的订单金额
const curCard = ref<CashCard>(null)

onLoad((option) => {
  console.log(option)
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
      getAvailableCashCards(option.storeCustomerId, amount)
    }

    if (mode.value === PayModeEnum.MakeCard) {
      formData.value = curCardRechargeFormData.value
      postUrl.value = '/business/store-customer-card'
    }

    if (mode.value === PayModeEnum.Recharge) {
      formData.value = curCardRechargeFormData.value
      postUrl.value = '/business/value-card-recharge'
    }
  }
})

// 过滤用户可用的储值卡，如果其中有一张可用则开启储值卡支付
const cashCards = ref<CashCard[]>([])
async function getAvailableCashCards(storeCustomerId, amount) {
  const res = await request.get<CashCard[]>('/business/store-customer-value-card', { storeCustomerId })
  cashCards.value = res.data.filter(v => v.amount >= amount).map((v) => {
    return {
      ...v,
      active: false,
    }
  })
  if (cashCards.value.length > 0) {
    payMode.value = 2
  }
}

async function pay() {
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
  else { // 正常支付（mode  1 开单 2开卡 3充值）
    formData.value.payType = curCode.value
    formData.value.customerCardId = curCard.value?.id
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

  <view mx-40rpx mt-164rpx color-white @click="pay()">
    <wd-button size="large" custom-class="theme-bg" block>
      <view flex flex-cc>
        <text>结账</text>
      </view>
    </wd-button>
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
