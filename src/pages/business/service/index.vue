<route lang="yaml">
style:
  navigationBarTitleText: 服务管理
</route>

<script lang="ts" setup>
const searchText = ref('')

watch(() => searchText.value, (newVal) => {
  console.log(newVal)
})
</script>

<template>
  <view>
    <TopSearch v-model="searchText" placeholder="请输入服务名称" />
    <view h-16px />
    <view mx-14px p-16px bg-white rd-8px>
      <view class="title">
        <view>
          <view class="border" />
          <text>服务列表</text>
          <span f18 f14>
            (共<span style="color:#1A66FF">10</span>项)
          </span>
        </view>
        <view class="plus">
          <wd-icon name="add" size="14px" color="#1A66FF" />
        </view>
      </view>
    </view>
  </view>
</template>

<style lang='scss' scoped>
.title {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.plus {
  width: 36px;
  height: 36px;
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
  background: #fcfcfc;
  border-radius: 8px;
  box-shadow:
    -1px -1px 8px rgba(0, 0, 0, 0.1),
    4px 4px 8px rgba(0, 0, 0, 0.1);
}
</style>
