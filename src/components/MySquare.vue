<script lang="ts" setup>
const props = withDefaults(defineProps<{
  color?: string
  length?: string
}>(), {
  color: '#00aa44',
  length: '24rpx',
})
</script>

<template>
  <view
    class="square"
    :style="{
      width: props.length,
      height: props.length,
      backgroundColor: props.color,
    }"
  />
</template>
