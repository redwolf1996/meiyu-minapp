<route lang="yaml">
style:
  navigationBarTitleText: 收支明细
</route>

<script lang="ts" setup>
const value1 = ref(1)
const option1 = ref<Record<string, any>[]>([
  { label: '全部', value: 0 },
  { label: '近一个月', value: 1 },
  { label: '近三个月', value: 2 },
  { label: '近半年', value: 3 },
  { label: '近一年', value: 4 },
])
function handleChange1() {

}
</script>

<template>
  <wd-drop-menu>
    <wd-drop-menu-item v-model="value1" :options="option1" @change="handleChange1" />
  </wd-drop-menu>
  <view flex flex-ac flex-bt f14 c-888888 bg-white px-30rpx pb-20rpx>
    <text>收入：2666&#12288;支出：2222</text>
    <text>共 7 条记录</text>
  </view>
  <view mx-32rpx my-32rpx px-32rpx py-24rpx bg-fff rd-16rpx>
    <view py-24rpx>
      <view mb-48rpx pb-32rpx style="border-bottom: 1px solid #eee;">
        <view flex flex-ac flex-bt>
          <view fs-28>
            2020-12-23 12:34:01
          </view>
          <view fs-34 fb>
            -1000
          </view>
        </view>
        <view flex flex-ac flex-bt>
          <view f14>
            订单：324345566677754
          </view>
          <view fs-24 mt8rpx>
            支出
          </view>
        </view>
      </view>
      <view pb-32rpx style="border-bottom: 1px solid #eee;">
        <view flex flex-ac flex-bt>
          <view fs-28>
            2020-12-23 12:34:01
          </view>
          <view fs-34 fb>
            -1000
          </view>
        </view>
        <view flex flex-ac flex-bt>
          <view f14>
            订单：324345566677754
          </view>
          <view fs-24 mt8rpx>
            支出
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<style lang='scss' scoped></style>
