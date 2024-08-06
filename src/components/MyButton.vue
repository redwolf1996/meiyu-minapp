<script lang="ts" setup>
const props = withDefaults(defineProps<{
  color?: string
  bgColor?: string
  borderColor?: string
  borderWidth?: number
  rd?: string
  width?: string
}>(), {
  color: '#fff',
  bgColor: '#1A66FF',
  border: 'none',
  borderWidth: 1,
  rd: '0rpx',
  width: '222rpx',
})
</script>

<template>
  <view
    :style="{
      color: props.color,
      backgroundColor: props.bgColor,
      border: `${$props.borderWidth}px solid ${$props.borderColor}`,
      borderRadius: props.rd,
      width: props.width,
      height: '72rpx',
      lineHeight: '72rpx',
      fontSize: '30rpx',
      textAlign: 'center',
    }"
  >
    <slot />
  </view>
</template>
