<route lang="yaml">
layout: false
style:
  navigationBarTitleText: 预约看板
  navigationStyle: "custom"
</route>

<script lang="ts" setup>
import Grids96 from './Grids96.vue'

const { windowHeight, windowWidth, screenWidth } = getMenuButtonInfo()
const dropMenu = ref()
const mode = ref(0) // 0预约看板 1预约列表
const visableSearch = ref(false)
const headHeight = ref(0)
const txt = ref('xxx')
const val = ref()
console.log(windowWidth, screenWidth)
const sources: any = [
  { label: '全部', value: 1, isActive: true },
  { label: '今天', value: 2, isActive: false },
  { label: '明天', value: 3, isActive: false },
]
const sources2: any = [
  { label: '全部', value: 1, isActive: true },
  { label: '未分配', value: 2, isActive: false },
  { label: '刘小明', value: 3, isActive: false },
  { label: '阿月', value: 3, isActive: false },
  { label: '小美', value: 3, isActive: false },
]
const hours24h = get24Hours()

// const tableData = ['张三']
// const tableData = ['张三', '李四']
// const tableData = ['张三', '李四', '王五']
const tableData = ['张三', '李四', '王五', '赵六']

// const tableItemWidth = computed(()=>{
//   if(tableData.length <=3 ) return `calc(100% - 80rpx)`
//   return 0
// })

const multipleItemWidth = computed(() => {
  const len = tableData.length
  if (len === 0)
    return 0
  if (len >= 3)
    return (screenWidth - 40) / 3
  return (screenWidth - 40) / len
})

onMounted(() => {
  const theNode = uni.createSelectorQuery().select('#head')
  theNode.boundingClientRect((data: any) => {
    headHeight.value = data.height
  }).exec()
})

function handleClickList() {

}

function selectMode(m: number) {
  mode.value = m
  dropMenu.value.close()
}

function calendarChange() {
  // console.log(e)
}

function showSearch() {
  visableSearch.value = true
}
function createOrder() {}
</script>

<template>
  <!-- 禁止滚动穿透 https://wot-design-uni.cn/component/popup.html -->
  <page-meta :page-style="`overflow:${visableSearch ? 'hidden' : 'visible'};`" />
  <view oa-y :style="{ height: `${windowHeight}px` }">
    <wd-popup
      v-model="visableSearch" :z-index="999" lock-scroll :safe-area-inset-bottom="true" position="right"
      custom-style="height: 100vh;width: 80%;background: #F9F9F9;"
    >
      <wd-navbar :safeAreaInsetTop="true">
        <template #title>
          <view fb f16 tl px-30rpx>
            预约筛选
          </view>
        </template>
      </wd-navbar>
      <view px-30rpx py-40rpx>
        <view bg-white px-32rpx py-25rpx rd-20rpx mb-24rpx>
          <view fb f14 lh-28rpx pb-32rpx>
            客户
          </view>
          <view>
            <wd-input
              v-model="txt"
              placeholder="请输入预约人姓名或手机号"
              custom-class="cus-input"
              :no-border="true"
              size="small"
              :clearable="true"
            />
          </view>
        </view>
        <view bg-white px-32rpx py-25rpx rd-20rpx mb-24rpx>
          <view fb f14 lh-28rpx pb-32rpx>
            服务时间
          </view>
          <view>
            <GridTagSelect v-model="val" :sources="sources" :columns="3" />
          </view>
        </view>
        <view bg-white px-32rpx py-25rpx rd-20rpx mb-24rpx>
          <view fb f14 lh-28rpx pb-32rpx>
            手艺人
          </view>
          <view>
            <GridTagSelect v-model="val" :sources="sources2" :columns="3" mode="multiple" />
          </view>
        </view>
      </view>
      <view flex flex-cc gap-40rpx>
        <MyButton bgColor="#ffffff" color="#232220" borderColor="rgba(0, 0, 0, 0.2)">
          重置
        </MyButton>
        <MyButton>确定</MyButton>
      </view>
    </wd-popup>
    <view id="head">
      <view>
        <wd-navbar title="标题" :safeAreaInsetTop="true" @click-left="handleClickList">
          <template #left>
            <view transform-translate-y-4px>
              <wd-img
                v-if="mode === 1"
                :width="20"
                :height="20"
                :src="`${IMG_BASE}/icon-funnel.png`"
                @click="showSearch"
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
      <view flex flex-ac flex-cc gap-100rpx flex-rd f12 h-54rpx lh-54rpx bg-white class="status">
        <view flex flex-ac>
          <MySquare color="#FFCBE2" />
          <text lh-24rpx pl-8rpx>
            待服务(1)
          </text>
        </view>
        <view flex flex-ac>
          <MySquare color="#FEE7D7" />
          <text lh-24rpx pl-8rpx>
            服务中(2)
          </text>
        </view>
        <view flex flex-ac>
          <MySquare color="#D4D4D6" />
          <text lh-24rpx pl-8rpx>
            已完成(3)
          </text>
        </view>
      </view>
    </view>
    <scroll-view
      :scroll-x="true"
      :scroll-y="true"
      class="content pr" :style="{
        height: `${windowHeight - headHeight}px`,
      }"
    >
      <view flex word-spacing-0 pr z-100>
        <view sticky left-0 dib w-40px hp100 z-200>
          <view h-32px w-40px sticky left-0 top-0 bg-white z-300 />
          <view bg-#F3F6FF flex flex-y flex-ac>
            <view v-for="item in hours24h" :key="`i${item}`" tc w-40px c-#8EA0B6 h-100px>
              <text f12 lh-24rpx>
                {{ item }}
              </text>
            </view>
          </view>
        </view>
        <view dib hp100 pr z-150 flex-grow-1>
          <view h-32px lh-32px sticky top-0 z-180 flex f12 c-#364250>
            <view v-for="item in tableData" :key="item" bg-white tc flex-shrink-0 :style="{ flexBasis: `${multipleItemWidth}px` }">
              {{ item }}
            </view>
          </view>
          <view h-2400px class="table-content" flex>
            <view v-for="item in tableData" :key="`k${item}`" pr bg-white tc flex-shrink-0 :style="{ flexBasis: `${multipleItemWidth}px` }">
              <!-- {{ item }} -->
              <Grids96 />
              <view class="booking" :style="{ width: `${multipleItemWidth - 10}px` }">
                <view>王乐乐</view>
                <view>基础护理</view>
                <view>8:00-8:30</view>
              </view>
            </view>
          </view>
        </view>
      </view>
      <view class="plus" @click="createOrder()">
        <view class="abs-cc">
          +
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<style lang='scss' scoped>
.booking {
  text-align: left;
  position: absolute;
  height: 150px;
  left: 0;
  top: 0;
  background-color: #ffcbe2;
  padding: 6px;
  border-radius: 4px;
}
.plus {
  position: fixed;
  right: 10rpx;
  bottom: 10rpx;
  width: 112rpx;
  height: 112rpx;
  background: #3a82fb;
  border-radius: 50%;
  box-shadow: 0rpx 10rpx 20rpx 0rpx rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  color: #fff;
  font-size: 48rpx;
  z-index: 100;
}
.content {
  white-space: nowrap;
}
:deep(.cus-input) {
  background: #f6f6fb !important;
  padding: 15rpx 20rpx;
}
.status {
  border-top: 1px solid #e4e8ef;
  border-bottom: 1px solid #e4e8ef;
  color: #3d3d3d;
}
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
