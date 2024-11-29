<script lang="ts" setup>
import type { List } from '@/pagesA/msg/types'
import dayjs from 'dayjs'

const props = defineProps<{
  data: List
}>()

const data = props.data

function toDetail() {
  storeMsgDetail.value = data
  if (data.noticeType === 1) {
    uni.navigateTo({
      url: '/pagesA/msg/detail-renew',
    })
  }
  if (data.noticeType === 3) {
    uni.navigateTo({
      url: '/pagesA/msg/detail-expire',
    })
  }
}
</script>

<template>
  <view bg-white p-40rpx flex flex-bt flex-ac gap-14px rd-16rpx mb-40rpx @click="toDetail()">
    <wd-img
      :width="32"
      :height="32"
      :src="`${IMG_BASE}/icon-ring.png`"
    />
    <view flex-grow-1>
      <view flex flex-bt flex-ac>
        <view f16 fb>
          {{ data.title }}
        </view>
        <view color-999 text-size-22rpx tc w-64rpx>
          {{ formatMsgTimeShow(data.createTime) }}
        </view>
      </view>
      <view flex flex-bt tc flex-ac mt-10rpx>
        <view f12 color-999>
          <template v-if="data.noticeType === 3">
            你的账户将于{{ dayjs(data.ext.expiresTime).format('YYYY-MM-DD') }}号到期...
          </template>
          <template v-else>
            已成功续费--个月
          </template>
        </view>
        <view f12 tc w-64rpx>
          <view v-if="data.status === 1" w-20rpx h-20rpx round ma style="background-color: #FE502E;" />
        </view>
      </view>
    </view>
  </view>
</template>
