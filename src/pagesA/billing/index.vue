<route lang="yaml">
layout: false
style:
  navigationBarTitleText: 开单
</route>

<script lang="ts" setup>
import type { ListStaff } from '../staff/types'
import type { BillModel, BillingGood } from './types'
import { sum } from 'lodash-es'
import dayjs from 'dayjs'
import type { CustomerDetail } from '../customer/types'

const toast = useToast()
const listStaff = ref<ListStaff[]>([])
const visibleStaff = ref(false)
const curIndex = ref(0) // 商品和服务列表当前选择项的索引
const orderTime = ref(dayjs().valueOf())
const form = ref<BillModel>({
  storeId: storeId.value,
  orderTime: computed(() => {
    return orderTime.value ? dayjs(orderTime.value).format('YYYY-MM-DD HH:mm:ss') : ''
  }),
  storeCustomerId: computed(() => curCustomer.value?.storeCustomerId ?? null),
  adviserId: null,
  notes: '',
  amount: 0,
  payType: 0,
  billingGoods: [],
  customerCardId: null,
})
const cusName = computed(() => curCustomer.value?.name ?? '')
const totalToPay = computed(() => {
  if (!form.value.billingGoods.length)
    return 0
  const arr = form.value.billingGoods.map(v => v.amount)
  return sum(arr)
}) // 待付款金额
const fromCustomer = ref(false) // 是否从客户详情进入

onLoad(async (option) => {
  getStaff()
  if (option?.customerId) {
    fromCustomer.value = true
    const res = await request.get<CustomerDetail>(`/business/store-customer/${option.customerId}`)
    curCustomer.value = {
      storeCustomerId: option.customerId,
      name: res.data.name,
    }
  }
})

function mergeProdsAndServs() {
  if (checkedProds.value.length || checkedServs.value.length) {
    const arr: any = [...checkedProds.value, ...checkedServs.value]
    const tmp = arr.map((v) => {
      return {
        goodsType: v.prodType === 1 ? 2 : 1, // 1服务 2产品
        goodsId: v.id,
        goodsCount: 1, // 商品数量
        goodsPrice: v.price, // 商品原价
        goodsPrice2: v.price2, // 商品实际价(优惠价)
        cardReduceAmount: 0, // 卡优惠金额
        name: v.name, // 服务或产品名称
        totalAmount: null, // 商品原价总价
        amount: null, // 商品优惠后总价
        customerCardId: null, // 购卡id
        cardId: null, // 卡id
        artisanId: null, // 手艺人id
        artisan: null, // 手艺人
        cardShowName: null,
      }
    })
    form.value.billingGoods = tmp
    form.value.billingGoods.forEach((item: any) => {
      item.totalAmount = computed(() => {
        return func_mul(item.goodsPrice, item.goodsCount)
      })
      item.amount = computed(() => {
        return func_mul(func_sub(item.goodsPrice2, item.cardReduceAmount), item.goodsCount)
      })
    })
  }
  else {
    form.value.billingGoods = []
  }
}

watch(() => curSelectedCardToCash.value, () => {
  form.value.billingGoods.forEach((item: BillingGood, index: number) => {
    if (curIndex.value === index) {
      item.customerCardId = curSelectedCardToCash.value?.customerCardId
      item.cardId = curSelectedCardToCash.value?.cardId

      if (curSelectedCardToCash.value?.cardType === 1) { // 1->次卡，2->充值卡，3->折扣卡
        item.cardReduceAmount = 1
      }
      else {
        item.cardReduceAmount = func_mul(item.goodsPrice, func_sub(1, func_div(curSelectedCardToCash.value?.equity, 10)))
      }

      item.totalAmount = computed(() => {
        return func_mul(item.goodsPrice, item.goodsCount)
      })
      item.amount = computed(() => {
        if (curSelectedCardToCash.value?.cardType === 1) {
          return 0
        }
        return func_mul(func_sub(item.goodsPrice2, item.cardReduceAmount), item.goodsCount)
      })

      if (curSelectedCardToCash.value?.cardType === 1) {
        item.cardShowName = `${curSelectedCardToCash.value?.cardName} -${item.cardReduceAmount}次`
      }
      else {
        item.cardShowName = `${curSelectedCardToCash.value?.cardName} -￥${item.cardReduceAmount}`
      }
    }
  })
})

function changeItemCount(item: BillingGood) {

}

watch(() => checkedProds.value, () => {
  mergeProdsAndServs()
})

watch(() => checkedServs.value, () => {
  mergeProdsAndServs()
})

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
  const res = await request.get<ListRes<ListStaff>>('/business/staff', { storeId: storeId.value })
  listStaff.value = res.data.list.map((v) => {
    return {
      ...v,
      active: false,
    }
  })
}

function toSelectStaff(index: number) {
  curIndex.value = index
  visibleStaff.value = true
}

function toSelCard(item, index: number) {
  if (!form.value.storeCustomerId)
    return toast.warning('请先选择客户')
  const storeCustomerId = form.value.storeCustomerId
  const goodsId = item.goodsId
  const goodsType = item.goodsType
  curIndex.value = index
  uni.navigateTo({ url: `/pagesA/billing/select-card-billing?storeCustomerId=${storeCustomerId}&goodsId=${goodsId}&goodsType=${goodsType}` })
}

function toSelCus() {
  if (fromCustomer.value)
    return false
  uni.navigateTo({ url: '/pagesA/customer/list' })
}

function toAddProdServs() {
  uni.navigateTo({ url: '/pagesA/prod-servs?from=billing' })
}

async function payLater() {
  form.value.amount = form.value.billingGoods.reduce((prev, cur) => {
    return func_add(prev, cur.amount)
  }, 0)
  await request.post('/business/billing', form.value)
  toast.info('待客户支付后，可找到该订单再次进行支付')
  await sleep(1000)
  uni.redirectTo({ url: '/pagesA/tabs/tab-business-dashboard' })
}

function toPay() {
  form.value.amount = form.value.billingGoods.reduce((prev, cur) => {
    return func_add(prev, cur.amount)
  }, 0)
  curBilling.value = form.value
  uni.navigateTo({ url: `/pagesA/billing/pay?mode=${PayModeEnum.MakeOrder}&storeCustomerId=${form.value.storeCustomerId}` })
}

function delEquity(item: BillingGood) {
  const goodsId = item.goodsId
  const goodsType = item.goodsType
  if (checkedServs.value.length && goodsType === 1) {
    checkedServs.value = checkedServs.value.filter(item => item.id !== goodsId)
  }
  if (checkedProds.value.length && goodsType === 2) {
    checkedProds.value = checkedProds.value.filter(item => item.id !== goodsId)
  }
}
</script>

<template>
  <page-meta :page-style="`overflow:${visibleStaff ? 'hidden' : 'visible'};`" />
  <wd-toast />
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
      消费项目
    </view>

    <template v-if="form.billingGoods.length">
      <view v-for="(item, index) in form.billingGoods" :key="`jds-${index}`" bg-white py20px pr mb10px>
        <view flex flex-ac flex-bt px20px>
          <view fs-16px fb>
            <text theme-color>
              {{ index < 9 ? `0${index + 1}` : (index + 1) }}
            </text>
            <text pl10px>
              {{ item.name }}
            </text>
          </view>
          <view flex flex-ac gap10px>
            <wd-input-number v-model="item.goodsCount" @change="changeItemCount(item)" />
            <wd-icon name="minus-circle" size="16px" color="red" @click="delEquity(item)" />
          </view>
        </view>
        <view flex flex-xr py10px pr20px>
          <text>
            ￥{{ item.goodsPrice }}
          </text>
        </view>
        <view>
          <wd-cell-group :border="true">
            <wd-cell v-if="item.goodsType === 1" title="手艺人" is-link @click="toSelectStaff(index)">
              <view>
                <text v-if="!item.artisan" c-#B6BDBD>
                  请选择
                </text>
                <text v-else>
                  {{ item.artisan }}
                </text>
              </view>
            </wd-cell>
            <wd-cell title="使用卡项" is-link @click="toSelCard(item, index)">
              <view>
                <text v-if="!item.cardShowName" c-#B6BDBD>
                  请选择
                </text>
                <view v-else>
                  {{ item.cardShowName }}
                </view>
              </view>
            </wd-cell>
          </wd-cell-group>
        </view>
        <view flex flex-xr pt10px pr20px>
          <text>
            <text>小计：</text>
            <text c-#FA483C>
              ￥{{ item.amount }}
            </text>
          </text>
        </view>
      </view>
    </template>
    <view bg-white py10px px20px pr h65px @click="toAddProdServs()">
      <view class="sp abs-cc">
        +&nbsp;添加商品
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
