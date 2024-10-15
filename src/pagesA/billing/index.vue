<route lang="yaml">
style:
  navigationBarTitleText: 开单
</route>

<script lang="ts" setup>
import type { BillModel } from './types'

const form = reactive<BillModel>({
  storeId,
  orderTime: null,
  storeCustomerId: computed(() => curCustomer.value?.customerId ?? null),
  adviserId: 6,
  notes: '',
  amount: 0,
  payType: 1,
  billingGoods: [],
})
const cusName = computed(() => curCustomer.value?.name ?? '')

onShow(() => {
  console.log(curCustomer.value)
})

function handleConfirm({ value }) {
  console.log(value)
}

function toSelCus() {
  uni.navigateTo({ url: '/pagesA/customer/list' })
}

function save() {
  console.log(curCustomer.value)
}
</script>

<template>
  <wd-cell-group :border="true">
    <wd-calendar v-model="form.orderTime" label="开单时间" type="datetime" @confirm="handleConfirm" />
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
    <view bg-white py10px px20px pr h65px>
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

  <wu-safe-bottom />
</template>

<style lang='scss' scoped>
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
