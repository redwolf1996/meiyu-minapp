<script lang="ts" setup>
import type { List } from '@/pagesA/msg/types'

const props = defineProps<{
  data: List
}>()

const data = props.data
</script>

<template>
  <view bg-white p-40rpx flex flex-bt flex-ac gap-14px rd-16rpx mb-40rpx>
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
          <!-- 你的账户将于2024.6.7号到期... -->
          {{ data.content }}
        </view>
        <view f12 tc w-64rpx>
          <view w-20rpx h-20rpx round ma style="background-color: #FE502E;" />
        </view>
      </view>
    </view>
  </view>
</template>
