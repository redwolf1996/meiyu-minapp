<script lang="ts" setup>
const props = withDefaults(defineProps<{
  py?: number
  color?: string
}>(), {
  py: 20,
  color: '#333333',
})
</script>

<template>
  <view bg-white :style="{ padding: `${props.py}rpx 20px`, color: props.color }">
    <slot />
  </view>
</template>
