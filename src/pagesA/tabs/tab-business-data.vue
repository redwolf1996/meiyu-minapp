<route lang="yaml">
style:
  navigationBarTitleText: 数据
  navigationStyle: custom
</route>

<script lang="ts" setup>
import MyTabBar from './MyTabBar.vue'
import CustomerAnalysis from './components-data/customer-analysis.vue'
import ManageData from './components-data/manage-data.vue'
import StaffAchievements from './components-data/staff-achievements.vue'
import StaffStatistics from './components-data/staff-statistics.vue'

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
const showSearchParams = ref(false)

function changeSearchParams() {
  showSearchParams.value = !showSearchParams.value
}
</script>

<template>
  <MyNavBar title="数据" :capsule="false" />
  <wd-tabs v-model="tab">
    <block v-for="item in tabs" :key="item.label">
      <wd-tab :title="item.label" />
    </block>
  </wd-tabs>
  <view fs-14px flex flex-ac gap-10px h48px bg-white py14px px16px @click="changeSearchParams">
    <text>今天</text>
    <text>|</text>
    <text>2023-01-01</text>
    <wd-icon v-if="!showSearchParams" name="arrow-down" color="#3B3D3D" size="16px" />
    <wd-icon v-else name="arrow-up" color="#3B3D3D" size="16px" />
  </view>
  <view h10px />
  <view>
    <view v-if="tab === 0">
      <ManageData />
    </view>
    <view v-if="tab === 1">
      <CustomerAnalysis />
    </view>
    <view v-if="tab === 2">
      <StaffAchievements />
    </view>
    <view v-if="tab === 3">
      <StaffStatistics />
    </view>
  </view>

  <MyTabBar :tab-index="3" />
</template>

<style lang='scss' scoped>
</style>
