<script lang="ts" setup>
import type { GrigSelectItem } from '@/types'

type Mode = 'single' | 'multiple'
const props = withDefaults(defineProps<{
  sources: GrigSelectItem[] // 数据源列表
  mode?: Mode // 单选还是多选
  columns?: number // 展示几列
}>(), {
  mode: 'single',
  columns: 2,
})
const model = defineModel()
const sources = ref<GrigSelectItem[]>(props.sources)
const columns = ref(props.columns)
const mode = ref<Mode>(props.mode)

function onClickTag(item: GrigSelectItem, index: number) {
  item.isActive = !item.isActive
  if (mode.value === 'single') {
    sources.value.forEach((e: GrigSelectItem, i: number) => {
      if (i !== index) {
        model.value = null
        e.isActive = false
      }
      else {
        model.value = e.value
      }
    })
  }
  else {
    model.value = sources.value
      .filter((e: GrigSelectItem) => e.isActive)
      .map((e: GrigSelectItem) => e.value)
  }
}
</script>

<template>
  <view class="grid-tag-select">
    <view
      v-for="(item, index) in sources"
      :key="`grid-${index}`"
      class="item"
      :class="{ active: item.isActive }"
      @click="onClickTag(item, index)"
    >
      {{ item.label }}
    </view>
  </view>
</template>

<style lang='scss' scoped>
.grid-tag-select {
  display: grid;
  grid-gap: 20rpx;
  grid-template-columns: repeat(v-bind(columns), 1fr); // css in js
  > .item {
    height: 72rpx;
    line-height: 72rpx;
    font-size: 28rpx;
    text-align: center;
    color: #303030;
    border: 1px solid transparent;
    background: #f6f6fb;
    &.active {
      color: #1a66ff;
      border: 1px solid #1a66ff;
      background: #eff2ff;
    }
  }
}
</style>
