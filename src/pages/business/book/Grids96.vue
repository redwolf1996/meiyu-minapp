<template>
  <view class="container">
    <view v-for="item in 96" :key="`grid${item}`" class="item">
      <!-- {{ item }} -->
    </view>
  </view>
</template>

<style lang="scss" scoped>
.container {
  box-sizing: border-box !important;
  .item {
    border-left: 1px solid transparent;
    border-top: 1px solid transparent;
    border-right: 1px solid #e4e8ef;
    border-bottom: 1px solid #e4e8ef;
    box-sizing: border-box !important;
    height: 25px;
    &:nth-child(1) {
      border-top: 1px solid #e4e8ef;
    }
  }
}
</style>
