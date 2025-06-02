<script setup lang="ts">
import { useQueue } from 'wot-design-uni'
import type { StatOverview } from './types'

const props = defineProps<{
  searchParams: {
    sDate: string
    eDate: string
  }
}>()

const { closeOutside } = useQueue()

onMounted(() => {
  getManageData()
})

const info = ref<StatOverview>({
  bookingCount: 0,
  cardSaleCount: 0,
  customerCount: 0,
  orderCustomerCount: 0,
  refundAmount: 0,
  serviceProductIncome: 0,
  storedAdd: 0,
  storedUse: 0,
  totalIncome: 0,
  vipCustomerCount: 0,
})

async function getManageData() {
  const res = await request.get<StatOverview>('/business/stat-overview', {
    storeId: storeId.value,
    ...props.searchParams,
  })
  info.value = res.data
}

watch(props.searchParams, () => {
  getManageData()
})
</script>

<template>
  <view class="h58px" />
  <view bg-white px16px py10px @click="closeOutside">
    <view pl10px fb style="position: relative; padding-left: 10px;">
      <view style="position: absolute; left: 0; top: 50%; transform: translateY(-50%); height: 66.7%; width: 3px; background-color: #931E5E;" />
      <text c-#931E5E>
        经营概况
      </text>
    </view>
    <view h20px />

    <view class="ct">
      <view class="item">
        <view flex flex-ac flex-bt>
          <text>{{ info.totalIncome || 0 }}</text>
          <wd-img
            :width="24"
            :height="24"
            mode="aspectFill"
            :src="`${IMG_BASE}/data-icon.png`"
          />
        </view>
        <view>
          <view c-3B3D3D fw-500 font-size-14px flex flex-ac gap4px>
            <text>实际收款金额(元)</text>
            <wd-popover use-content-slot placement="bottom">
              <template #content>
                <view class="pop-content">
                  实际收款金额：在统计时间内所有已完成订单收入金额总和减去退款金额
                </view>
              </template>
              <wd-icon name="help-circle" size="15px" color="#979797" />
            </wd-popover>
          </view>
        </view>
      </view>
      <view class="item">
        <view flex flex-ac flex-bt>
          <text>{{ info.storedUse || 0 }}</text>
          <wd-img
            :width="24"
            :height="24"
            mode="aspectFill"
            :src="`${IMG_BASE}/data-icon.png`"
          />
        </view>
        <view>
          <view c-3B3D3D fw-500 font-size-14px flex flex-ac gap4px>
            <text>客户消耗金额(元)</text>
            <wd-popover use-content-slot placement="left">
              <template #content>
                <view class="pop-content">
                  实际消耗金额：统计时间内所有已完成订单中使用卡项消费金额总和减去使用卡项消耗后退款的金额总和
                </view>
              </template>
              <wd-icon name="help-circle" size="15px" color="#979797" />
            </wd-popover>
          </view>
        </view>
      </view>
      <view class="item">
        <view flex flex-ac flex-bt>
          <text>{{ info.storedAdd || 0 }}</text>
          <wd-img
            :width="24"
            :height="24"
            mode="aspectFill"
            :src="`${IMG_BASE}/data-icon.png`"
          />
        </view>
        <view>
          <view c-3B3D3D fw-500 font-size-14px flex flex-ac gap4px>
            <text>开卡充值金额(元)</text>
            <wd-popover use-content-slot placement="bottom">
              <template #content>
                <view class="pop-content">
                  开卡充值金额：订单完成时间在统计时间内，开卡（次卡、折扣卡）或充值（充值卡、余额充值）的实际收款金额总和，统计时减去开卡充值实际退款的金额。
                </view>
              </template>
              <wd-icon name="help-circle" size="15px" color="#979797" />
            </wd-popover>
          </view>
        </view>
      </view>
      <view class="item">
        <view flex flex-ac flex-bt>
          <text>{{ info.serviceProductIncome || 0 }}</text>
          <wd-img
            :width="24"
            :height="24"
            mode="aspectFill"
            :src="`${IMG_BASE}/data-icon.png`"
          />
        </view>
        <view>
          <view c-3B3D3D fw-500 font-size-14px flex flex-ac gap4px>
            <text>服务产品收入(元)</text>
            <wd-popover use-content-slot placement="left">
              <template #content>
                <view class="pop-content">
                  服务产品收入：订单完成时间在统计时间内服务收入减去退费金额与产品收入减去退费金额总和
                </view>
              </template>
              <wd-icon name="help-circle" size="15px" color="#979797" />
            </wd-popover>
          </view>
        </view>
      </view>
      <view class="item">
        <view flex flex-ac flex-bt>
          <text>{{ info.refundAmount || 0 }}</text>
          <wd-img
            :width="24"
            :height="24"
            mode="aspectFill"
            :src="`${IMG_BASE}/data-icon.png`"
          />
        </view>
        <view>
          <view c-3B3D3D fw-500 font-size-14px flex flex-ac gap4px>
            <text>退款(元)</text>
            <wd-popover use-content-slot placement="bottom-start" :offset="-40">
              <template #content>
                <view class="pop-content">
                  退款：所有订单退款金额总和
                </view>
              </template>
              <wd-icon name="help-circle" size="15px" color="#979797" />
            </wd-popover>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.ct {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  gap: 20px;
}

.item {
  width: calc(50% - 10px);
  padding: 16px;
  border-radius: 8px;
  border: 1px solid #f0f1f4;
  height: 86px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.pop-content {
  /* 必填 开始 */
  position: relative;
  z-index: 500;
  border-radius: 4px;
  /* 必填 结束 */
  background: #fff;
  padding: 10px;
  width: 70vw;
  text-align: left;
  border: 1px solid #ebeef1;
}
</style>
