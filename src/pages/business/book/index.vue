<route lang="yaml">
layout: home
style:
  navigationBarTitleText: 预约看板
  navigationStyle: "custom"
</route>

<script lang="ts" setup>
const { windowHeight } = getMenuButtonInfo()
const dropMenu = ref()
const mode = ref(0) // 0预约看板 1预约列表
function handleClickList() {

}

function selectMode(m: number) {
  mode.value = m
  dropMenu.value.close()
}

function calendarChange(e) {
  // console.log(e)
}
</script>

<template>
  <view oa-y :style="{ height: `${windowHeight}px` }">
    <view>
      <wd-navbar title="标题" :safeAreaInsetTop="true" @click-left="handleClickList">
        <template #left>
          <view transform-translate-y-4px>
            <wd-img
              v-if="mode === 1"
              :width="20"
              :height="20"
              :src="`${IMG_BASE}/icon-funnel.png`"
            />
          </view>
        </template>
        <template #title>
          <wd-drop-menu>
            <wd-drop-menu-item ref="dropMenu" :title="!mode ? '预约看版' : '预约列表'">
              <view py-30rpx flex flex-cc gap-60rpx>
                <view class="pannel" :class="{ active: mode === 0 }" @click="selectMode(0)">
                  <wd-img
                    :width="32"
                    :height="32"
                    :src="`${IMG_BASE}/icon-kb${!mode ? '-act' : ''}.png`"
                  />
                  <text class="title">
                    预约看板
                  </text>
                </view>
                <view class="pannel" :class="{ active: mode === 1 }" @click="selectMode(1)">
                  <wd-img
                    :width="32"
                    :height="32"
                    :src="`${IMG_BASE}/icon-lb${mode ? '-act' : ''}.png`"
                  />
                  <text class="title">
                    预约列表
                  </text>
                </view>
              </view>
            </wd-drop-menu-item>
          </wd-drop-menu>
        </template>
      </wd-navbar>
    </view>
    <wu-calendar
      color="#2F4BEC" :itemHeight="50" startWeek="mon"
      :fold="false" type="week" :insert="true" @change="calendarChange"
    />
    <view bg-white h-20rpx />
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
  gap: 20rpx;
  background: #e8e9eb;
  color: #3d3d3d;
  .title {
    font-size: 28rpx;
    line-height: 28rpx;
  }
  &.active {
    background: #e3ecfc;
    color: #1a66ff;
  }
}
:deep(.wu-calendar__weeks-day) {
  height: 70rpx !important;
  border: none !important;
}
:deep(.wu-calendar__header) {
  border: none !important;
}
:deep(.wu-calendar-item__weeks-lunar-text) {
  display: none;
}
:deep(.wu-calendar-item__weeks-box-item) {
  width: 42px !important;
  border-radius: 50% !important;
}
:deep(.wu-calendar__header-btn-box.horizontal) {
  height: 50rpx !important;
}
:deep(.wu-calendar__header-btn-box .wu-calendar__header-btn) {
  display: none !important;
}
:deep(.wu-calendar__backtoday) {
  display: none !important;
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
