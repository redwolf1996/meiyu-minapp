<script lang="ts" setup>
const props = withDefaults(defineProps<{
  placeholder?: string
  hasValue?: boolean
}>(), {
  placeholder: '请选择',
  hasValue: false,
})

const emits = defineEmits(['click'])

function handleClick() {
  emits('click')
}
</script>

<template>
  <view class="select-cell" @click="handleClick">
    <view class="content">
      <text v-if="!props.hasValue" class="placeholder">{{ props.placeholder }}</text>
      <slot v-else />
    </view>
    <wd-icon name="arrow-right" size="16px" color="#929292" />
  </view>
</template>

<style lang="scss" scoped>
.select-cell {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20rpx;
  background-color: #f7f7f7;
  border-radius: 8px;
  width: 100%;
  box-sizing: border-box;
  min-height: 72rpx;
}

.content {
  flex: 1;
  margin-right: 16rpx;
}

.placeholder {
  color: #929292;
  font-size: 14px;
}
</style>
