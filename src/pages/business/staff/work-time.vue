<route lang="yaml">
style:
  navigationBarTitleText: 工作时间
</route>

<script lang="ts" setup>
import { columns } from './data'
import type { WeekTime } from './data'

const columnsList = ref<WeekTime[]>(columns)
</script>

<template>
  <view px-20px py-12px f12 lh-18px c-#FF6619 bg-#FFEFE6>
    员工工作时间指的是员工上班的时间，该时间内客户可以预约该员工的服务项。设置正确的工作时间可以降低取消率，提高店铺业绩。
  </view>
  <view h-20rpx />
  <view p-40rpx bg-white>
    <view c-#141414 fb f16>
      选择每周工作时间
    </view>
    <view h-40rpx />
    <view flex flex-bt flex-y gap-20rpx>
      <view v-for="(item, index) in columnsList" :key="`c-${index}`" flex flex-bt>
        <view class="week" :class="{ active: item.active }">
          {{ item.weekName }}
        </view>
        <view flex flex-ac>
          <view c-#3B3D3D>
            {{ item.start }}-{{ item.end }}
          </view>
          <wd-icon name="arrow-right" size="16px" color="#bfbfbf" />
        </view>
      </view>
    </view>
  </view>
  <view mx-40rpx mt-48rpx color-white>
    <wd-button size="large" custom-class="theme-bg" block>
      <view flex flex-cc>
        <text>保存</text>
      </view>
    </wd-button>
  </view>
</template>

<style lang='scss' scoped>
.week {
  width: 210rpx;
  height: 72rpx;
  line-height: 72rpx;
  text-align: center;
  font-size: 28rpx;
  border: 1px solid transparent;
  color: #646466;
  background: #f6f6fb;
  &.active {
    border: 1px solid #1a66ff;
    color: #1a66ff;
    background: #eff2ff;
  }
}
</style>
