<route lang="yaml">
style:
  navigationBarTitleText: "首页"
</route>

<script lang="ts" setup>
const userInfo = useUserStore().userInfo
if (userInfo.token && userInfo.isRegister) {
  toBusinessDashboard()
}
else {
  toBusinessLogin()
}

function toBusinessDashboard() {
  uni.redirectTo({ url: '/pagesA/tabs/tab-business-dashboard' })
}

function toBusinessLogin() {
  uni.redirectTo({ url: '/pagesA/login/index' })
}
</script>

<template>
  <view />
</template>
