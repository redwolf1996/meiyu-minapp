<script lang="ts" setup>
const props = defineProps<{ step: number }>()
function handleClickLeft() {
  uni.navigateBack()
}
</script>

<template>
  <wd-navbar custom-class="custom-nav" :safeAreaInsetTop="true" placeholder left-arrow fixed pr @click-left="handleClickLeft">
    <template #title>
      <StripDot :step="props.step" />
    </template>
  </wd-navbar>
</template>
