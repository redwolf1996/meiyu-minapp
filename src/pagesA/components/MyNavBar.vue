<script lang="ts" setup>
const props = withDefaults(defineProps<{
  title: string
  capsule?: boolean
}>(), {
  title: '请设置标题',
  capsule: true,
})

function handleBack() {
  uni.navigateBack()
}

function handleBackHome() {
  uni.reLaunch({ url: '/pagesA/tabs/tab-business-dashboard' })
}
</script>

<template>
  <wd-navbar :title="props.title" :fixed="true" :placeholder="true" :safeAreaInsetTop="true">
    <template v-if="props.capsule" #capsule>
      <wd-navbar-capsule @back="handleBack" @back-home="handleBackHome" />
    </template>
  </wd-navbar>
</template>

<style lang='scss' scoped>
</style>
