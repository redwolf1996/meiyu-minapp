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

onLoad(() => {
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
        客户概况
      </text>
    </view>
    <view h20px />

    <view class="ct">
      <view class="item">
        <view flex flex-ac flex-bt>
          <text>{{ info.vipCustomerCount ?? '--' }}</text>
          <wd-img
            :width="24"
            :height="24"
            mode="aspectFill"
            :src="`${IMG_BASE}/data-icon.png`"
          />
        </view>
        <view>
          <view c-3B3D3D fw-500 font-size-14px flex flex-ac gap4px>
            <text>新增会员数</text>
            <wd-popover use-content-slot placement="bottom-start" :offset="-40">
              <template #content>
                <view class="pop-content">
                  新增会员数：客户字段“会员等级”为会员的客户数
                </view>
              </template>
              <wd-icon name="help-circle" size="15px" color="#979797" />
            </wd-popover>
          </view>
        </view>
      </view>
      <view class="item">
        <view flex flex-ac flex-bt>
          <text>{{ info.customerCount ?? '--' }}</text>
          <wd-img
            :width="24"
            :height="24"
            mode="aspectFill"
            :src="`${IMG_BASE}/data-icon.png`"
          />
        </view>
        <view>
          <view c-3B3D3D fw-500 font-size-14px flex flex-ac gap4px>
            <text>新增客户数</text>
            <wd-popover use-content-slot placement="left">
              <template #content>
                <view class="pop-content">
                  新增客户数：统计时间内，通过各种渠道新增的客户数量。包括自助注册的客户，以及门店手动添加的客户；被删除的客户重新添加记为新增客户。
                </view>
              </template>
              <wd-icon name="help-circle" size="15px" color="#979797" />
            </wd-popover>
          </view>
        </view>
      </view>
      <view class="item">
        <view flex flex-ac flex-bt>
          <text>{{ info.orderCustomerCount ?? '--' }}</text>
          <wd-img
            :width="24"
            :height="24"
            mode="aspectFill"
            :src="`${IMG_BASE}/data-icon.png`"
          />
        </view>
        <view>
          <view c-3B3D3D fw-500 font-size-14px flex flex-ac gap4px>
            <text>成交客户数</text>
            <wd-popover use-content-slot placement="bottom-start" :offset="-40">
              <template #content>
                <view class="pop-content">
                  成交客户数：下订单的客户总数
                </view>
              </template>
              <wd-icon name="help-circle" size="15px" color="#979797" />
            </wd-popover>
          </view>
        </view>
      </view>
      <view class="item">
        <view flex flex-ac flex-bt>
          <text>{{ info.cardSaleCount ?? '--' }}</text>
          <wd-img
            :width="24"
            :height="24"
            mode="aspectFill"
            :src="`${IMG_BASE}/data-icon.png`"
          />
        </view>
        <view>
          <view c-3B3D3D fw-500 font-size-14px flex flex-ac gap4px>
            <text>开卡充值客户数</text>
            <wd-popover use-content-slot placement="left">
              <template #content>
                <view class="pop-content">
                  开卡充值客户数：购买所有卡项及储值卡充值的客户总数
                </view>
              </template>
              <wd-icon name="help-circle" size="15px" color="#979797" />
            </wd-popover>
          </view>
        </view>
      </view>
      <view class="item">
        <view flex flex-ac flex-bt>
          <text>{{ info.bookingCount ?? '--' }}</text>
          <wd-img
            :width="24"
            :height="24"
            mode="aspectFill"
            :src="`${IMG_BASE}/data-icon.png`"
          />
        </view>
        <view>
          <view c-3B3D3D fw-500 font-size-14px flex flex-ac gap4px>
            <text>预约单数</text>
            <wd-popover use-content-slot placement="bottom-start" :offset="-40">
              <template #content>
                <view class="pop-content">
                  预约单数：预约的服务数量总和
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
