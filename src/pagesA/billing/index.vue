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

// function save() {
//   console.log(curCustomer.value)
// }

function toAddProdServs() {
  uni.navigateTo({ url: '/pagesA/prod-servs' })
}
const value = ref()
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
    <view bg-white py20px pr mb10px>
      <view flex flex-ac flex-bt px20px>
        <view fs-16px fb>
          <text theme-color>
            01
          </text>
          <text pl10px>
            水乳套装
          </text>
        </view>
        <view>
          <wd-input-number v-model="value" />
        </view>
      </view>
      <view flex flex-xr py10px pr20px>
        <text>
          ￥18.00
        </text>
      </view>
      <view>
        <wd-cell-group :border="true">
          <wd-cell title="手艺人" is-link @click="toSelCus()">
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
          <wd-cell title="使用卡项" is-link @click="toSelCus()">
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
      </view>
      <view flex flex-xr p10px pr20px>
        <text>
          <text>小计：</text>
          <text c-#FA483C>
            ￥9.00
          </text>
        </text>
      </view>
    </view>
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
  <view class="footer">
    <view class="h64px lh-64px" flex flex-bt flex-ac px14px>
      <text />
      <text>
        <text c-#3A3A3A f14>
          待收款:
        </text>
        <text fs-40 c-#FA483C>
          ￥18.00
        </text>
      </text>
    </view>
    <view class="footer-inner">
      <view w120px>
        <wd-button size="large" :plain="true" block>
          <view flex flex-cc>
            <text>稍后付款</text>
          </view>
        </wd-button>
      </view>
      <view w104px>
        <wd-button size="large" custom-class="theme-bg" block>
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
