<route lang="yaml">
style:
  navigationBarTitleText: 数据
  navigationStyle: custom
</route>

<script lang="ts" setup>
import MyTabBar from './MyTabBar.vue'

const tab = ref(0)
const tabs = [{
  label: '经营数据',
}, {
  label: '客户分析',
}, {
  label: '员工业绩',
}, {
  label: '员工统计',
}]
</script>

<template>
  <MyNavBar title="数据" :capsule="false" />
  <wd-tabs v-model="tab">
    <block v-for="item in tabs" :key="item.label">
      <wd-tab :title="item.label" />
    </block>
  </wd-tabs>

  <MyTabBar :tab-index="3" />
</template>

<style lang='scss' scoped>
</style>
