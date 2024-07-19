<route lang="yaml">
style:
  navigationBarTitleText: 客户
  navigationBarBackgroundColor: "#ffffff"
</route>

<script lang="ts" setup>
const filter = ref()
const value1 = ref(0)
const option1 = [
  { label: '全部', value: 0 },
  { label: '会员', value: 1 },
  { label: '非会员', value: 2 },
]

function handleChange1() {}
</script>

<template>
  <view py-12rpx px-32rpx>
    <view flex flex-bt flex-ac gap-32rpx>
      <view flex-1 pr>
        <input placeholder="搜索姓名/手机号" placeholder-class="cus-input" px-40px bg-#F2F3F5 h-36px lh-36px rd-4px type="text">
        <uni-icons style="transform: translateY(-50%);top: 50%;" pa left-24rpx type="search" color="#86909C" size="24" />
        <uni-icons style="transform: translateY(-50%);top: 50%;" pa right-24rpx type="clear" color="#86909C" size="24" />
      </view>
      <view rd-2px w-28px h-28px lh-28px tc bg-#F2F3F5 fs-32 fb>
        +
      </view>
    </view>
    <wd-drop-menu>
      <wd-drop-menu-item v-model="value1" :options="option1" @change="handleChange1" />
      <wd-drop-menu-item ref="filter" title="筛选">
        11111
      </wd-drop-menu-item>
    </wd-drop-menu>
  </view>
</template>

<style>
page {
  background-color: #fff;
}
</style>

<style lang='scss' scoped>
:deep(.cus-input) {
  color: #c9cdd4;
  font-size: 14px;
}
</style>
