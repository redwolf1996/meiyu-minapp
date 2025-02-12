<route lang="yaml">
layout: false
style:
  navigationBarTitleText: 开卡充值
</route>

<script lang="ts" setup>
import { PayModeEnum } from '@/utils/consts'
import type { MakeCardModel } from './types'
import dayjs from 'dayjs'
import type { CustomerDetail } from '../customer/types'
import qs from 'qs'

const toast = useToast()
const visibleStaff = ref(false)
const orderTime = ref(dayjs().valueOf())
const form = ref<MakeCardModel>({
  orderTime: computed(() => {
    return orderTime.value ? dayjs(orderTime.value).format('YYYY-MM-DD HH:mm:ss') : ''
  }),
  storeCustomerId: computed(() => curCustomer.value?.storeCustomerId ?? null),
  adviserId: '',
  cardId: null,
  customerCardId: null,
  notes: '',
  amount: 0,
  gift: 0,
  payType: null,
})
const isPickerOpen = ref(false)
const cusName = computed(() => curCustomer.value?.name ?? '')
const fromCustomer = ref(false)

onLoad(async (option) => {
  if (option?.customerId) {
    fromCustomer.value = true
    const res = await request.get<CustomerDetail>(`/business/store-customer/${option.customerId}`)
    curCustomer.value = {
      storeCustomerId: option.customerId,
      name: res.data.name,
    }
  }
})

onMounted(() => {
  uni.setNavigationBarTitle({
    title: curCardRechargeType.value === 6 ? '充值' : '开卡',
  })
})

watch(() => curSelectedCard.value, () => {
  if (curSelectedCard.value) {
    form.value.cardId = curSelectedCard.value.id
    form.value.amount = +curSelectedCard.value.price
    form.value.gift = +curSelectedCard.value.gift || 0
  }
})

watch(() => curSelectedCardToCash.value, () => {
  if (curSelectedCardToCash.value) {
    form.value.customerCardId = curSelectedCardToCash.value.customerCardId
    form.value.amount = 0
    form.value.gift = 0
  }
})

function toSelCard() {
  if (!form.value.storeCustomerId)
    return toast.warning('请先选择客户')
  uni.navigateTo({ url: `/pagesA/card/select-card-common?storeCustomerId=${form.value.storeCustomerId}` })
}

function toSelCus() {
  if (fromCustomer.value)
    return false
  uni.navigateTo({ url: '/pagesA/customer/list' })
}

async function payLater() {
  if (!form.value.cardId && curCardRechargeType.value !== 6)
    return toast.warning('请选择卡项')
  if (!form.value.customerCardId && curCardRechargeType.value === 6)
    return toast.warning('请选择充值卡')

  form.value.amount = Number(form.value.amount)
  form.value.gift = Number(form.value.gift)
  form.value.payType = null // 稍后支付
  const url = curCardRechargeType.value === 6 ? '/business/value-card-recharge' : '/business/store-customer-card'
  await request.post(url, form.value)
  toast.info('待客户支付后，可找到该订单再次进行支付')
  await sleep(1000)
  uni.reLaunch({ url: '/pagesA/tabs/tab-business-dashboard' })
}

function toPay() {
  form.value.amount = Number(form.value.amount)
  if (!form.value.cardId && curCardRechargeType.value !== 6)
    return toast.warning('请选择卡项')
  if (!form.value.customerCardId && curCardRechargeType.value === 6)
    return toast.warning('请选择充值卡')
  if (!form.value.amount && curCardRechargeType.value === 6)
    return toast.warning('请输入充值金额')

  if (typeof form.value.adviserId !== 'string')
    form.value.adviserId = ''
  if (!form.value.amount && curCardRechargeType.value !== 6) {
    submitDirect()
  }
  else {
    curCardRechargeFormData.value = form.value
    const mode = curCardRechargeType.value === 6 ? PayModeEnum.Recharge : PayModeEnum.MakeCard
    uni.navigateTo({ url: `/pagesA/billing/pay?mode=${mode}` })
  }
}

// 待付款金额为0，不去结账，直接提交成功
async function submitDirect() {
  const res = await request.post<any>('/business/store-customer-card', { ...form.value, payType: null })
  toast.info('开卡成功')
  const params = {
    orderId: res.data.orderId,
    mode: PayModeEnum.MakeCard, // mode  1 开单 2开卡 3充值 4预约
    amount: +res.data.payAmount,
    points: res.data.gainIntegral,
  }
  await sleep(1000)
  uni.redirectTo({ url: `/pagesA/billing/pay-success?${qs.stringify(params)}` })
}
</script>

<template>
  <page-meta :page-style="`overflow:${visibleStaff ? 'hidden' : 'visible'};`" />
  <wd-toast />

  <wd-cell-group :border="true">
    <wd-calendar v-model="orderTime" :z-index="12000" label="开单时间" type="datetime" />
    <wd-cell title="客户" :is-link="!fromCustomer" @click="toSelCus()">
      <view>
        <text v-if="!cusName" c-#B6BDBD>
          请选择或添加
        </text>
        <text v-else>
          {{ cusName }}
        </text>
      </view>

      <template #icon>
        <wd-icon name="user" size="16px" />
      </template>
    </wd-cell>
  </wd-cell-group>

  <view>
    <view f12 mt12px mb8px pl20px c-#3D3D3D>
      {{ curCardRechargeType === 6 ? '充值明细' : '开卡明细' }}
    </view>

    <view bg-white py10px px20px pr h65px @click="toSelCard()">
      <view class="sp abs-cc">
        +&nbsp;选择{{ CardRechargeMap[curCardRechargeType] }}{{ curCardRechargeType === 6 ? '卡' : '' }}
      </view>
    </view>
    <view v-if="curSelectedCard || curSelectedCardToCash" bg-white py10px px20px pr>
      <view h102px mb12px pr>
        <image
          style="width: 100%;height: 102px;"
          mode="aspectFill"
          :src="`${IMG_BASE}/cards/${CardRechargeBgMap[curCardRechargeType]}.png`"
        />
        <view class="txt" flex flex-y flex-bt>
          <view p12px flex-grow-1>
            <template v-if="curCardRechargeType !== 6">
              <view flex flex-bt flex-ac>
                <view fs-14px>
                  {{ curSelectedCard?.name }}
                </view>
                <view
                  text-20rpx w-88rpx h-40rpx lh-40rpx tc flex flex-cc
                  style="background: transparent;border-radius: 32rpx;border: 1px solid #fff;color: #fff"
                >
                  {{ CardTypeMap[curSelectedCard.type] }}
                </view>
              </view>
              <view fs-14px mt-10px>
                <template v-if="curSelectedCard.type === 1">
                  <text>￥{{ curSelectedCard.price }}&#12288;</text>
                  <text>权益次数：{{ curSelectedCard.countLimit || '不限' }}次</text>
                </template>
                <template v-if="curSelectedCard.type === 2">
                  <text>本金￥{{ curSelectedCard.price }}&#12288;</text>
                  <text>赠金￥{{ curSelectedCard.gift }}</text>
                </template>
                <template v-if="curSelectedCard.type === 3">
                  <text>￥{{ curSelectedCard.price }}&#12288;</text>
                  <text>{{ getDiscounts(curSelectedCard) }}折</text>
                </template>
              </view>
              <view fs-12px mt-10px>
                <text>有效期：</text>
                <text v-if="curSelectedCard.expires === 0">
                  永久有效
                </text>
                <text v-else>
                  购买后{{ curSelectedCard.expires }}天内有效
                </text>
              </view>
            </template>

            <template v-else>
              <view flex flex-bt flex-ac>
                <view fs-14px>
                  {{ curSelectedCardToCash?.cardName }}
                </view>
                <view
                  text-20rpx w-88rpx h-40rpx lh-40rpx tc flex flex-cc
                  style="background: transparent;border-radius: 32rpx;border: 1px solid #fff;color: #fff"
                >
                  充值卡
                </view>
              </view>
              <view fs-14px mt-10px>
                <text>剩余金额&#12288;￥{{ curSelectedCardToCash.totalAmount }}</text>
              </view>
              <view fs-12px mt-10px>
                <text>有效期：</text>
                <text v-if="curSelectedCardToCash.isLongTerm">
                  永久有效
                </text>
                <text v-else>
                  {{ curSelectedCardToCash.expiresTimeDesc }}
                </text>
              </view>
            </template>
          </view>
        </view>
      </view>

      <wd-picker
        v-model="form.adviserId"
        label="销售"
        align-right
        clearable
        :columns="salesListStore" @open="isPickerOpen = true" @cancel="isPickerOpen = false" @confirm="isPickerOpen = false"
      />
      <view class="h12px" />

      <template v-if="curCardRechargeType === 6">
        <wd-input
          v-model="form.amount"
          type="number"
          label="充值金额"
          placeholder="请输入"
          align-right
          suffix-icon="arrow-right"
        />
        <wd-input
          v-model="form.gift"
          type="number"
          label="赠送金额"
          placeholder="请输入"
          align-right
          suffix-icon="arrow-right"
        />
      </template>

      <template v-else>
        <view class="card-ext">
          <view>金额</view>
          <view>￥{{ form.amount }}</view>
        </view>

        <view v-if="curCardRechargeType === 2" class="card-ext">
          <view>赠金</view>
          <view>￥{{ form.gift }}</view>
        </view>
      </template>

      <view flex flex-xr>
        <view fs-14px>
          <text c-#3A3A3A fb>
            小计：
          </text>
          <text c-#FA483C>
            ￥{{ form.amount }}
          </text>
        </view>
      </view>
    </view>
  </view>

  <view h-24rpx />
  <view f12 mt12px mb8px pl20px c-#3D3D3D>
    订单备注
  </view>
  <view bg-white px-40rpx py-24rpx>
    <wd-textarea
      v-model="form.notes"
      placeholderStyle="font-size: 14px;color:#C9CDD4;"
      placeholder="备注客户信息" :maxlength="200" auto-height clearable show-word-limit
    />
  </view>

  <view class="h150px" />
  <view v-show="!isPickerOpen" class="footer" z-10000>
    <view class="h64px lh-64px" flex flex-bt flex-ac px14px>
      <text />
      <text>
        <text c-#3A3A3A f14>
          待收款:
        </text>
        <text fs-40 c-#FA483C>
          ￥{{ form.amount }}
        </text>
      </text>
    </view>
    <view class="footer-inner">
      <template v-if="form.amount">
        <view w120px>
          <wd-button size="large" :plain="true" block @click="payLater()">
            <view flex flex-cc>
              <text>稍后付款</text>
            </view>
          </wd-button>
        </view>
        <view w104px>
          <wd-button size="large" custom-class="theme-bg" block @click="toPay()">
            <view flex flex-cc>
              <text>收款</text>
            </view>
          </wd-button>
        </view>
      </template>
      <view v-if="!form.amount" wp100>
        <wd-button size="large" custom-class="theme-bg" block @click="toPay()">
          提交
        </wd-button>
      </view>
    </view>
  </view>
  <wu-safe-bottom />
</template>

<style lang='scss' scoped>
.card-ext {
  font-size: 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #f7f8fa;
  color: #3b3d3d;
  margin-bottom: 12px;
  border-radius: 8px;
}
.txt {
  color: #ffffff;
  position: absolute;
  height: 132px;
  width: 100%;
  z-index: 200;
  left: 0;
  top: 0;
}

.footer {
  background-color: #fff;
  position: fixed;
  width: 100%;
  bottom: 0;
  .footer-inner {
    border-top: 1px solid #ededed;
    display: flex;
    gap: 10px;
    justify-content: center;
    align-items: center;
    height: 90px;
    padding: 0 20px;
  }
}

.sp {
  height: 45px;
  line-height: 45px;
  text-align: center;
  color: #1a66ff;
  border: 1px solid #1a66ff;
  border-radius: 4px;
  width: 80%;
}
</style>
