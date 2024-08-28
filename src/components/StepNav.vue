<script lang="ts" setup>
const props = defineProps<{ step: number }>()
function handleClickLeft() {
  uni.navigateBack()
}
</script>

<template>
  <wd-navbar
    placeholder left-arrow pr
    custom-class="custom-nav"
    :safeAreaInsetTop="true"
    :fixed="true"
    @click-left="handleClickLeft"
  >
    <template #title>
      <StripDot :step="props.step" />
    </template>
  </wd-navbar>
</template>
