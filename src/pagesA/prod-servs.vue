<route lang="yaml">
style:
  navigationBarTitleText: 选择服务和产品
</route>

<script lang="ts" setup>
const tab = ref<number>(0)
const items = [{
  label: '所有服务',
  value: 0,
}, {
  label: '所有产品',
  value: 1,
}]
</script>

<template>
  <wd-tabs v-model="tab" custom-class="this-tab" :lineHeight="2" :lineWidth="24" color="#1A66FF" swipeable>
    <block v-for="item in items" :key="`t${item.value}`">
      <wd-tab :title="item.label" />
    </block>
  </wd-tabs>
</template>

<style lang='scss' scoped>
.this-tab {
  padding: 0 100rpx;
}
</style>
