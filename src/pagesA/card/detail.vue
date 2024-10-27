<route lang="yaml">
style:
  navigationBarTitleText: 查看详情
</route>

<script lang="ts" setup>
import { sumBy } from 'lodash-es'

const itm = ref<any>(null)
const id = ref(0)
const times = ref(0)
const discounts = ref<number[]>([])
const cardImgName = { // 1->次卡，2->充值卡，3->折扣卡
  1: 'bg_ck',
  2: 'bg_czk',
  3: 'bg_zkk',
}

onLoad(async (options) => {
  id.value = options?.id
  const res: any = await request.get<any>(`/business/card/${id.value}`)
  itm.value = res.data
  if (res.data.type === 1) {
    times.value = sumBy(res.data.info, (v1: any) => v1.equity)
  }
  if (res.data.type === 3) {
    const arr = res.data.info?.map(v => v.equity)
    arr.sort((a, b) => a - b)
    discounts.value = arr
  }
})
</script>

<template>
  <view h132px mb12px pr>
    <image
      style="width: 100%;height: 102px;"
      mode="aspectFit"
      :src="`${IMG_BASE}/cards/${cardImgName[itm?.type]}.png`"
    />
    <view class="txt" flex flex-y flex-bt>
      <view p12px flex-grow-1>
        <view flex flex-bt flex-ac>
          <view fs-14px>
            {{ itm?.name }}
          </view>
          <view
            text-20rpx w-88rpx h-40rpx lh-40rpx tc flex flex-cc
            style="background: transparent;border-radius: 32rpx;border: 1px solid #fff;color: #fff"
          >
            {{ CardTypeMap[itm?.type] }}
          </view>
        </view>
        <view fs-14px mt-10px>
          <template v-if="itm?.type === 1">
            <text>￥{{ itm?.price }}&nbsp;</text>
            <text v-if="itm?.secondType === 1">
              权益次数：{{ times }}次
            </text>
            <text v-if="itm?.secondType === 2">
              权益次数：不限次
            </text>
            <text v-if="itm?.secondType === 3">
              权益次数：{{ itm?.countLimit }}次
            </text>
          </template>
          <template v-if="itm?.type === 2">
            <text>本金￥{{ itm?.price }}&nbsp;</text>
            <text>赠金￥{{ itm?.gift }}</text>
          </template>
          <template v-if="itm?.type === 3">
            <text>￥{{ itm?.price }}&nbsp;</text>
            <text v-if="discounts?.length">
              {{ discounts?.[0] }}-{{ discounts?.[discounts?.length - 1] }}折
            </text>
          </template>
        </view>
        <view fs-12px mt-10px>
          <text>有效期：</text>
          <text v-if="itm?.expires === 0">
            永久有效
          </text>
          <text v-else>
            购买后{{ itm?.expires }}天内有效
          </text>
        </view>
      </view>
    </view>
  </view>
</template>

<style lang='scss' scoped></style>
