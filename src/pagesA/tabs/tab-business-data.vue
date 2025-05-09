<route lang="yaml">
style:
  navigationBarTitleText: 数据
  navigationStyle: custom
</route>

<script lang="ts" setup>
import MyTabBar from './MyTabBar.vue'

console.log('xxxxx')
</script>

<template>
  <MyNavBar title="数据" :capsule="false" />
  <MyTabBar :tab-index="3" />
</template>

<style lang='scss' scoped>
</style>
