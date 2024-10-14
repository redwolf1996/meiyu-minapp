<route lang="yaml">
style:
  navigationBarTitleText: 开单
</route>

<script lang="ts" setup>
import type { ListStaff } from '../staff/types'
import type { BillModel } from './types'

const form = reactive<BillModel>({
  storeId,
  orderTime: null,
  storeCustomerId: 7,
  adviserId: 6,
  notes: '',
  amount: 0,
  payType: 1,
  billingGoods: [],
})
const cusName = ref('')

function handleConfirm({ value }) {
  console.log(value)
}

function toSelCus() {
  uni.navigateTo({ url: '/pagesA/customer/list' })
}
</script>

<template>
  <wd-cell-group :border="true">
    <wd-calendar v-model="form.orderTime" label="开单时间" type="datetime" @confirm="handleConfirm" />
    <wd-cell title="客户" is-link @click="toSelCus()">
      <view>
        <text v-if="!form.customerCardId" c-#B6BDBD>
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
