<script lang="ts" setup>
const props = withDefaults(defineProps<{
  color?: string
  bgColor?: string
  borderColor?: string
  borderWidth?: number
  radius?: string
  width?: string
  fontSize?: string
}>(), {
  color: '#fff',
  bgColor: '#1A66FF',
  border: 'none',
  borderWidth: 1,
  radius: '0rpx',
  width: '222rpx',
  fontSize: '30rpx',
})
</script>

<template>
  <view
    class="btn"
    :style="{
      color: props.color,
      backgroundColor: props.bgColor,
      border: `${$props.borderWidth}px solid ${$props.borderColor}`,
      borderRadius: props.radius,
      width: props.width,
      height: '72rpx',
      lineHeight: '72rpx',
      fontSize: props.fontSize,
      textAlign: 'center',
    }"
  >
    <slot />
  </view>
</template>

<style scoped>
.btn {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
