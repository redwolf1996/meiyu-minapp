<script lang="ts" setup>
const props = withDefaults(defineProps<{
  label: string
  noBorder?: boolean
}>(), {
  label: '请输入标题',
  noBorder: false,
})

const emits = defineEmits(['click'])
</script>

<template>
  <view
    h-48px
    flex flex-bt flex-ac class="cell"
    :class="{ 'no-border': props.noBorder }"
    @click="emits('click', $event)"
  >
    <view c-#3B3D3D fw-500 f14 fb>
      {{ props.label }}
    </view>
    <view flex flex-ac gap-6px>
      <slot />
      <wd-icon name="arrow-right" size="16px" color="#979797" />
    </view>
  </view>
</template>

<style scoped>
.cell {
  border-bottom: 1px solid #ebeef1;
}
.no-border {
  border-bottom: 1px solid transparent;
}
</style>
