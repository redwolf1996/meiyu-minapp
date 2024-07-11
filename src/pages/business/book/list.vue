<script lang="ts" setup>
const tab = ref<number>(0)
</script>

<template>
  <wd-tabs v-model="tab" :lineHeight="2" :lineWidth="24" color="#1A66FF">
    <block v-for="item in 4" :key="item">
      <wd-tab :title="`标签${item}`" />
    </block>
  </wd-tabs>
  <view px-50rpx py-32rpx>
    <view px-48rpx py-40rpx bg-white rd-10px>
      <view>
        <view>
          <view>2023.11.22 8:00-10:00</view>
          <view>张飞·上门服务</view>
        </view>
        <view>
          待服务
        </view>
      </view>
      <view>
        <view>面部清洁补水</view>
        <view>护理spa</view>
      </view>
      <view>王乐乐-13334231312</view>
      <view>
        <button class="my-btn complete">
          签到
        </button>
        <button class="my-btn complete">
          完成
        </button>
        <button class="my-btn cancel">
          取消
        </button>
        <button class="my-btn delete">
          取消
        </button>
        <text class="my-status-tag to-service">
          待服务
        </text>
        <text class="my-status-tag in-service">
          服务中
        </text>
        <text class="my-status-tag end-service">
          已完成
        </text>
        <text class="my-status-tag cancel-service">
          已取消
        </text>
      </view>
    </view>
  </view>
</template>

<style lang='scss' scoped>

</style>
