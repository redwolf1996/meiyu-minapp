<route lang="yaml">
style:
  navigationBarTitleText: 消息
</route>

<script lang="ts" setup>
const tab = ref<number>(0)
const tabs = [{
  label: '全部',
  value: 1,
}, {
  label: '未读',
  value: 2,
}, {
  label: '已读',
  value: 3,
}]
</script>

<template>
  <wd-tabs v-model="tab" :swipeable="true">
    <block v-for="item in tabs" :key="item">
      <wd-tab :title="item.label" />
    </block>
  </wd-tabs>
  <view p-32rpx>
    <MsgClock />
    <MsgRing />
  </view>
</template>

<style lang='scss' scoped>
</style>
