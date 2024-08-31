<route lang="yaml">
style:
  navigationBarTitleText: xxx
</route>

<script lang="ts" setup>
onMounted(() => {
  uni.setNavigationBarTitle({ title: richData.value.title })
})
</script>

<template>
  <view>富文本编辑器</view>
</template>

<style lang='scss' scoped></style>
