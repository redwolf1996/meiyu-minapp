<route lang="yaml">
style:
  navigationBarTitleText: 协议
</route>

<script lang="ts" setup>
const url = ref('')
const protocolMap = {
  1: '用户协议',
  2: '隐私政策',
}
onLoad((options) => {
  const type = Number(options.type)
  uni.setNavigationBarTitle({
    title: protocolMap[type],
  })
  url.value = type === 1
    ? 'https://api.kivibook.cn/beauty/yhxy.html?v=2'
    : 'https://api.kivibook.cn/beauty/yszc.html?v=2'
})
</script>

<template>
  <view>
    <web-view :src="url" style="width: 100vw !important;" />
  </view>
</template>

<style lang='scss' scoped></style>
