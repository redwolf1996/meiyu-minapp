<script setup lang="ts">
import { onHide, onLaunch, onShow } from '@dcloudio/uni-app'

onLaunch(() => {})
onShow(() => {})
onHide(() => {})
</script>

<style lang="scss">
page {
  background-color: #f6f6fd;
}
:deep(.theme-bg) {
  background-color: #1a66ff !important;
}
view,
text {
  box-sizing: border-box;
}
.custom-nav {
  background-color: #f6f6fd !important;
}
</style>
