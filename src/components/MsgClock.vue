<script lang="ts" setup>
import type { List } from '@/pagesA/msg/types'

const props = defineProps<{
  data: List
}>()

const data = props.data
async function toServDetail() {
  await request.put(`/business/notice/${data.id}`)
  bookStime.value = ''
  uni.navigateTo({
    url: `/pagesA/book/detail?id=${data.ext?.bookingId}`,
  })
}
</script>

<template>
  <view bg-white p-40rpx rd-16rpx mb-40rpx @click="toServDetail()">
    <view flex flex-bt flex-ac gap-14px>
      <wd-img
        :width="32"
        :height="32"
        :src="`${IMG_BASE}/icon-clock.png`"
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
          <view f12>
            {{ data.ext?.startTimeStr }}
          </view>
          <view f12 tc w-64rpx>
            <view v-if="data.status === 1" w-20rpx h-20rpx round ma style="background-color: #FE502E;" />
          </view>
        </view>
      </view>
    </view>
    <view flex flex-bt flex-ac gap-14px>
      <view w-32px h-26px />
      <view flex-grow-1>
        <view f12 flex tc flex-ac gap-10rpx>
          <view fb>
            {{ data.ext?.artisanName || '未分配' }}
          </view>
          <view w-6rpx h-6rpx round style="background-color: #91919F;" />
          <view color-white tc px-8rpx py-4rpx lh-24rpx bg-FE502E>
            {{ data.ext?.storeServiceTypeDesc }}
          </view>
        </view>
      </view>
    </view>
  </view>
</template>
