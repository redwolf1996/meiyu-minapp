<script setup lang="ts">
import { onHide, onLaunch, onShow } from '@dcloudio/uni-app'

onLaunch(() => {})
onShow(() => {})
onHide(() => {})
</script>

<style lang="scss">
:root,
page {
  background-color: #f6f6fd;
  --wot-input-icon-margin: 5px;
  --wot-input-icon-color: rgba(0, 0, 0, 0.25);
  --wot-button-primary-bg-color: #1a66ff;
}
:deep(.theme-bg) {
  background-color: #1a66ff !important;
}
:deep(.color-black) {
  color: #5a5a5a;
}
view,
text {
  box-sizing: border-box;
}
.custom-nav {
  background-color: #f6f6fd !important;
}
.wd-navbar__title {
  max-width: 100% !important;
}
.wd-input__placeholder {
  color: #b6bdbd !important;
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
  .wd-input__label,
  .wd-picker__label {
    padding-left: 5px !important;
  }
  .wd-input__label.is-required::after,
  .wd-picker__label.is-required::after {
    position: relative !important;
    left: 4px !important;
    top: 5px !important;
  }
  .wd-input__label-inner,
  .wd-picker__label-inner {
    color: #303030;
  }
}
.form-item-title {
  font-size: 28rpx;
  color: #303030;
  &.required {
    &::after {
      position: relative;
      left: 4px;
      top: 5px;
      content: '*';
      font-size: var(--wot-cell-required-size, 18px);
      line-height: 1.1;
      color: var(--wot-cell-required-color, var(--wot-color-danger, #fa4350));
    }
  }
}
</style>
