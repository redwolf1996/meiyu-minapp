<script setup lang="ts">
import { onHide, onLaunch, onShow } from '@dcloudio/uni-app'

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

onLaunch(() => {
  update()
})
onShow(() => {})
onHide(() => {})
</script>

<style lang="scss">
@import './styles/index.scss';
</style>
