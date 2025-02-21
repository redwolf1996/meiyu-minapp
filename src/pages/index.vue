<route lang="yaml">
style:
  navigationBarTitleText: "首页"
</route>

<script lang="ts" setup>
const userInfo = useUserStore().userInfo

// 在页面的生命周期函数中获取页面地址栏参数（获取小程序码场景值）
onShow(() => {
  const launchOptions = wx.getLaunchOptionsSync()
  if (launchOptions.query?.scene) {
    uni.setStorageSync('inviteCode', launchOptions.query.scene)
  }
  if (userInfo.token && userInfo.isRegister) {
    toBusinessDashboard()
  }
  else {
    toBusinessLogin()
  }
})

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
