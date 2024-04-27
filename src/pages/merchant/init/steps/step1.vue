<route lang="yaml">
  style:
    navigationBarTitleText: 添加店铺信息
    navigationStyle: custom
</route>

<script lang="ts" setup>
const fileList = ref<any[]>([
  { url: 'https://img12.360buyimg.com//n0/jfs/t1/29118/6/4823/55969/5c35c16bE7c262192/c9fdecec4b419355.jpg' },
])
function handleChange(e: any) {
  console.log(e)
}
</script>

<template>
  <StepNav :step="1" />
  <view mt-10px tc fs-40>
    请填写您的门店信息
  </view>
  <view mt-8px tc>
    方便客户找到您的门店
  </view>
  <view mt-40rpx flex bg-white px-40rpx py-24rpx flex-bt flex-ac>
    <view fb>
      门店logo
    </view>
    <view flex flex-ac>
      <wd-upload :file-list="fileList" :limit="1" action="https://ftf.jd.com/api/uploadImg" @change="handleChange">
        <!-- <i i-material-symbols-light-chevron-right fn fs-40 color-999 style="transform: translateY(2rpx);" /> -->
      </wd-upload>
    </view>
  </view>
</template>

<style>
:deep(.wd-upload__evoke) {
  margin-bottom: 0 !important;
}
:deep(.wd-upload__preview) {
  margin: 0 0 0 0 !important;
}
</style>
