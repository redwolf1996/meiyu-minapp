<script lang="ts" setup>
import type { List } from '@/pagesA/msg/types'

const props = defineProps<{
  data: List
}>()

const data = props.data
</script>

<template>
  <view bg-white p-40rpx rd-16rpx mb-40rpx>
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
            <view w-20rpx h-20rpx round ma style="background-color: #FE502E;" />
          </view>
        </view>
      </view>
    </view>
    <view flex flex-bt flex-ac gap-14px>
      <view w-32px h-26px />
      <view flex-grow-1>
        <view f12 flex tc flex-ac gap-10rpx>
          <view fb>
            {{ data.ext?.artisanName }}
          </view>
          <view w-12rpx h-12rpx round style="background-color: #FE502E;" />
          <view color-white tc px-8rpx py-4rpx lh-24rpx bg-FE502E>
            {{ data.ext?.storeServiceTypeDesc }}
          </view>
        </view>
      </view>
    </view>
  </view>
</template>
