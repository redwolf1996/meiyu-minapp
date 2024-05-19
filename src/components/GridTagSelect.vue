<script lang="ts" setup>
const props = withDefaults(defineProps<{
  sources: Source[] // 数据源列表
  mode?: Mode // 单选还是多选
  columns?: number // 展示几列
}>(), {
  mode: 'single',
  columns: 2,
})

const emit = defineEmits(['update:modelValue'])

type Mode = 'single' | 'multiple'
interface Source {
  label: string
  value: number
  isActive: boolean
}

const sources = ref<Source[]>(props.sources)
const columns = ref(props.columns)
const mode = ref<Mode>(props.mode)

function onClickTag(item: Source, index: number) {
  item.isActive = !item.isActive
  if (mode.value === 'single') {
    sources.value.forEach((e: Source, i: number) => {
      if (i !== index)
        e.isActive = false
      else
        emit('update:modelValue', e.value)
    })
  }
}
</script>

<template>
  <view class="grid-tag-select">
    <view
      v-for="(item, index) in sources"
      :key="`grid-${index}`"
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
  > view {
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
