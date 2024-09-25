<script lang="ts" setup>
const props = withDefaults(defineProps<{
  py?: number // 是否展示tabs
}>(), {
  py: 20,
})
</script>

<template>
  <view bg-white :style="{ padding: `${props.py}rpx 20px` }">
    <slot />
  </view>
</template>
