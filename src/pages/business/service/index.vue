<route lang="yaml">
style:
  navigationBarTitleText: 服务管理
</route>

<script lang="ts" setup>
const searchText = ref('')

watch(() => searchText.value, (newVal) => {
  console.log(newVal)
})
</script>

<template>
  <view>
    <TopSearch v-model="searchText" placeholder="请输入服务名称" />
  </view>
</template>

<style lang='scss' scoped>
</style>
