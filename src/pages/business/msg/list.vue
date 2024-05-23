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
  <wd-tabs v-model="tab" :swipeable="true" :sticky="true" style="position: sticky;top: 0;">
    <block v-for="item in tabs" :key="item">
      <wd-tab :title="item.label" />
    </block>
  </wd-tabs>
  <view class="content">
    xxxx
  </view>
</template>

<style lang='scss' scoped>
.content {
  line-height: 120px;
  text-align: center;
  height: 2000px;
}
</style>
