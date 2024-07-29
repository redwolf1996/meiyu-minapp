<script lang="ts" setup>
const props = withDefaults(defineProps<{
  label: string
  noBorder?: boolean
  required?: boolean
}>(), {
  label: '请输入标题',
  noBorder: false,
  required: false,
})

const emits = defineEmits(['click'])
</script>

<template>
  <view
    py-28rpx
    flex flex-bt flex-ac class="cell"
    :class="{ 'no-border': props.noBorder }"
    @click="emits('click', $event)"
  >
    <view c-#3B3D3D fw-500 f14 flex flex-ac gap8px>
      <slot name="icon" />
      <text>{{ props.label }}</text>
      <text v-if="props.required" class="required">
        *
      </text>
    </view>
    <view flex flex-ac gap-6px>
      <slot />
      <wd-icon name="arrow-right" size="16px" color="#bfbfbf" />
    </view>
  </view>
</template>

<style scoped>
.required {
  font-size: var(--wot-cell-required-size, 18px);
  line-height: 1.1;
  color: var(--wot-cell-required-color, var(--wot-color-danger, #fa4350));
  position: relative !important;
  left: -4px !important;
  top: 5px !important;
}
.cell {
  border-bottom: 1px solid #ebeef1;
}
.no-border {
  border-bottom: 1px solid transparent;
}
</style>
