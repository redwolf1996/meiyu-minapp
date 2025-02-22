<route lang="yaml">
style:
  navigationBarTitleText: 设置
</route>

<script lang="ts" setup>
function quit() {
  useUserStore().clearUserInfo()
  uni.redirectTo({ url: '/pagesA/login/index' })
}

function update() {
  const updateManager = uni.getUpdateManager()
  updateManager.onCheckForUpdate((res) => {
    // 请求完新版本信息的回调
    if (res.hasUpdate) {
      uni.showLoading({
        title: '更新中...',
        mask: true,
      })
      updateManager.onUpdateReady(() => {
        uni.hideLoading()
        uni.showModal({
          title: '更新提示',
          content: '新版本已经准备好，是否重启应用？',
          success(res) {
            if (res.confirm) {
              // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
              updateManager.applyUpdate()
            }
          },
        })
      })
    }
    else {
      uni.showToast({
        title: '当前已是最新版本',
        icon: 'success',
      })
    }
  })
}
</script>

<template>
  <MyCellGroup>
    <!-- <MyCell label="修改密码" />
    <MyCell label="授权管理" /> -->
    <MyCell label="检查更新" noBorder @myclick="update">
      <text f14 c-3B3D3D>
        当前版本2.0.12
      </text>
    </MyCell>
  </MyCellGroup>
  <view class="exit" tc bg-white h-48px lh-48px mt-10px c-3B3D3D @click="quit()">
    退出登录
  </view>
</template>

<style lang="scss" scoped>
</style>
