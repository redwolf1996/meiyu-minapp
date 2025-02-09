<route lang="yaml">
style:
  navigationBarTitleText: "首页"
</route>

<script lang="ts" setup>
const userInfo = useUserStore().userInfo
console.log(userInfo)
if (userInfo.token && userInfo.isRegister) {
  toBusinessDashboard()
}
else {
  toBusinessLogin()
}

function toBusinessDashboard() {
  uni.reLaunch({ url: '/pagesA/tabs/tab-business-dashboard' })
}

function toBusinessLogin() {
  uni.navigateTo({ url: '/pagesA/login/index' })
}
</script>

<template>
  <view />
</template>
