<route lang="yaml">
layout: home
style:
  navigationBarTitleText: 预约看板
  navigationStyle: "custom"
</route>

<script lang="ts" setup>
const { windowHeight } = getMenuButtonInfo()
const dropMenu = ref()
const mode = ref(1) // 1预约看板 2预约列表
function handleClickList() {

}

function handleOpened() {
  slider.value?.initSlider()
}
</script>

<template>
  <view oa-y :style="{ height: `${windowHeight}px` }">
    <view>
      <wd-navbar title="标题" :safeAreaInsetTop="true" @click-left="handleClickList">
        <template #left>
          <wd-img
            v-if="mode === 2"
            :width="20"
            :height="20"
            :src="`${IMG_BASE}/icon-funnel.png`"
          />
        </template>
        <template #title>
          <wd-drop-menu>
            <wd-drop-menu-item ref="dropMenu" title="预约看板">
              <view py-30rpx flex flex-cc gap-60rpx>
                <view class="pannel" :class="{ active: mode === 1 }">
                  <wd-img
                    v-if="mode === 2"
                    :width="32"
                    :height="32"
                    :src="`${IMG_BASE}/icon-yykb.svg`"
                  />
                  <view>预约看板</view>
                </view>
                <view class="pannel" :class="{ active: mode === 2 }">
                  <wd-img
                    v-if="mode === 2"
                    :width="32"
                    :height="32"
                    :src="`${IMG_BASE}/icon-yylb.svg`"
                  />
                  <view>预约列表</view>
                </view>
              </view>
            </wd-drop-menu-item>
          </wd-drop-menu>
        </template>
      </wd-navbar>
    </view>
  </view>
</template>

<style lang='scss' scoped>
.pannel {
  width: 192rpx;
  height: 192rpx;
  border-radius: 16rpx;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10rpx;
  background: #e8e9eb;
  color: #3d3d3d;
  &.active {
    background: #e3ecfc;
    color: #1a66ff;
  }
}
:deep(.wd-navbar__title) {
  font-weight: normal;
}
:deep(.wd-drop-menu__item) {
  text-align: center !important;
}
:deep(.wd-navbar__left) {
  z-index: 100 !important;
  transform: translateY(3px);
}
</style>
