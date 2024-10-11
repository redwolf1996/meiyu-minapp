<route lang="yaml">
style:
  navigationBarTitleText: 设置
</route>

<script lang="ts" setup>
function quit() {
  useUserStore().clearUserInfo()
  uni.redirectTo({ url: '/pagesA/login/index' })
}
</script>

<template>
  <MyCellGroup>
    <MyCell label="修改密码" />
    <MyCell label="授权管理" />
    <MyCell label="检查更新">
      <span f14 c-3B3D3D>当前版本3.1.2</span>
    </MyCell>
  </MyCellGroup>
  <view class="exit" tc bg-white h-48px lh-48px mt-10px c-3B3D3D @click="quit()">
    退出登录
  </view>
</template>

<style lang="scss" scoped>
</style>
