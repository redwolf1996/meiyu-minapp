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
.wd-button.is-large {
  border-radius: 0 !important;
}
.wd-button.is-disabled {
  background: #d5d5d5 !important;
}
.wd-form {
  .wd-input__inner {
    text-align: right !important;
  }
  .wd-input__label {
    padding-left: 5px !important;
  }
  .wd-input__label.is-required::after {
    position: relative !important;
    left: 4px !important;
    top: 5px !important;
  }
}
</style>
