<route lang="yaml">
style:
  navigationBarTitleText: "首页"
</route>

<script lang="ts" setup>
// const userInfo = useUserStore().userInfo
// if (userInfo.token && userInfo.isRegister) {
//   toDashboard()
// }
// else {
//   toLogin()
// }

// h5开发临时用，后面去掉
toDashboard()

function toDashboard() {
  uni.switchTab({ url: '/pages/tab-business-dashboard' })
}

function toLogin() {
  uni.navigateTo({ url: '/pagesA/login/index' })
}
</script>

<template>
  <view />
</template>
