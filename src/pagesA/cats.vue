<route lang="yaml">
style:
  navigationBarTitleText: 选择分类
</route>

<script lang="ts" setup></script>

<template>
  <view px-20px>
    <view flex flex-ac h-56px style="border-bottom: 1px solid #eee;">
      <wd-icon name="add-circle" size="22px" color="#1A66FF" />
      <text c-#1A66FF pl-10px>
        添加分类
      </text>
    </view>

    <view flex flex-ac flex-bt h56px style="border-bottom: 1px solid #eee;">
      <view>产品分类名称1</view>
      <view>
        <text>产品数</text>
        <text c-#CDAA11>
          5
        </text>
      </view>
    </view>
  </view>
</template>

<style>
page {
  background-color: #fff;
}
</style>

<style lang='scss' scoped></style>
