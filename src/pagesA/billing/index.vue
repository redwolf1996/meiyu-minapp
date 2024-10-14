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
  <wu-safe-bottom />
</template>

<style lang='scss' scoped></style>
