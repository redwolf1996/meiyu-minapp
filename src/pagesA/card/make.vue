<route lang="yaml">
layout: false
style:
  navigationBarTitleText: 开卡充值
</route>

<script lang="ts" setup>
import type { ListStaff } from '../staff/types'
import type { MakeCardModel } from './types'
import { sum } from 'lodash-es'
import dayjs from 'dayjs'

const listStaff = ref<ListStaff[]>([])
const visibleStaff = ref(false)
const curIndex = ref(0) // 商品和服务列表当前选择项的索引
const orderTime = ref(null)
const form = ref<MakeCardModel>({
  storeId,
  orderTime: computed(() => {
    return orderTime.value ? dayjs(orderTime.value).format('YYYY-MM-DD HH:mm:ss') : ''
  }),
  storeCustomerId: computed(() => curCustomer.value?.storeCustomerId ?? null),
  adviserId: null,
  notes: '',
  amount: 0,
  payType: 0,
})
const cusName = computed(() => curCustomer.value?.name ?? '')
const totalToPay = computed(() => {
  if (!form.value.billingGoods.length)
    return 0
  const arr = form.value.billingGoods.map(v => v.amount)
  return sum(arr)
}) // 待付款金额

onMounted(() => {
  uni.setNavigationBarTitle({
    title: curCardRechargeType.value === 6 ? '充值' : '开卡',
  })
})

onShow(() => {
  getStaff()
})

function getCardShowName() {
  const cardInfo = curSelectedCard.value
  // console.log(cardInfo)
  return 'xxx'
}

function saveStaff() {
  visibleStaff.value = false
}

function clickItem(item: ListStaff) {
  listStaff.value.forEach((val: any) => {
    val.active = false
  })
  item.active = !item.active
  if (item.active) {
    form.value.billingGoods[curIndex.value].artisanId = item.storeStaffId
    form.value.billingGoods[curIndex.value].artisan = item.userName
  }
}

async function getStaff() {
  const res = await request.get<ListRes<ListStaff>>('/business/staff', { storeId })
  listStaff.value = res.data.list.map((v) => {
    return {
      ...v,
      active: false,
    }
  })
}

function handleConfirm({ value }) {
  console.log(value)
}

function toSelectStaff(index: number) {
  curIndex.value = index
  visibleStaff.value = true
}

function toSelCard() {
  uni.navigateTo({ url: `/pagesA/card/select-card` })
}

function toSelCus() {
  uni.navigateTo({ url: '/pagesA/customer/list' })
}

// function save() {
//   console.log(curCustomer.value)
// }

async function payLater() {
  await request.post('/business/billing', form.value)
  uni.showToast({ title: '待客户支付后，可找到该订单再次进行支付' })
  await sleep(1000)
  uni.redirectTo({ url: '/pagesA/tabs/tab-business-dashboard' })
}

function toPay() {
  // curBilling.value = form.value
  // uni.navigateTo({ url: '/pagesA/billing/pay' })
}
</script>

<template>
  <page-meta :page-style="`overflow:${visibleStaff ? 'hidden' : 'visible'};`" />
  <wd-popup
    v-model="visibleStaff" :z-index="12000" :lock-scroll="true" :safe-area-inset-bottom="false" position="right"
    custom-style="height: 100vh;width: 80%;background: #F9F9F9;"
  >
    <view tc f14 ps top-0 bg-white h-40px lh-40px>
      选择手艺人
    </view>
    <view mt10px>
      <view v-for="(item, index) in listStaff" :key="`sd-${index}`" flex flex-ac flex-bt bg-white px40rpx py20rpx style="border-bottom: 1px solid #DFDFDF" @click="clickItem(item)">
        <view>
          <view f14 c-313131>
            {{ item.userName }}
          </view>
          <view f12 c-777777 mt6px>
            {{ item.phone }}
          </view>
        </view>
        <wd-img
          v-if="item.active"
          :width="26"
          :height="19"
          :src="`${IMG_BASE}/icon-correct.png`"
        />
      </view>
      <view h50px />
    </view>

    <view tc flex flex-cc color-white bg-white bottom-0 ps py-20px @click="saveStaff()">
      <MyButton width="500rpx">
        确定
      </MyButton>
    </view>
  </wd-popup>

  <wd-cell-group :border="true">
    <wd-calendar v-model="orderTime" :z-index="12000" label="开单时间" type="datetime" @confirm="handleConfirm" />
    <wd-cell title="客户" is-link @click="toSelCus()">
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
      消费项目
    </view>

    <view bg-white py10px px20px pr h65px @click="toSelCard()">
      <view class="sp abs-cc">
        +&nbsp;添加{{ CardRechargeMap[curCardRechargeType] }}{{ curCardRechargeType === 6 ? '卡' : '' }}
      </view>
    </view>
  </view>

  <view h-24rpx />
  <view f12 mt12px mb8px pl20px c-#3D3D3D>
    订单备注
  </view>
  <view bg-white px-40rpx py-24rpx>
    <wd-textarea
      placeholderStyle="font-size: 14px;color:#C9CDD4;"
      placeholder="备注客户信息" :maxlength="200" auto-height clearable show-word-limit
    />
  </view>

  <view class="h150px" />
  <view class="footer" z-10000>
    <view class="h64px lh-64px" flex flex-bt flex-ac px14px>
      <text />
      <text>
        <text c-#3A3A3A f14>
          待收款:
        </text>
        <text fs-40 c-#FA483C>
          ￥{{ totalToPay }}
        </text>
      </text>
    </view>
    <view class="footer-inner">
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
    </view>
  </view>
  <wu-safe-bottom />
</template>

<style lang='scss' scoped>
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
