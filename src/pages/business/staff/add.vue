<route lang="yaml">
style:
  navigationBarTitleText: 添加员工
</route>

<script lang="ts" setup>
const fileList = ref<any[]>([
  { url: 'https://img12.360buyimg.com//n0/jfs/t1/29118/6/4823/55969/5c35c16bE7c262192/c9fdecec4b419355.jpg' },
])
</script>

<template>
  <MyCellGroup>
    <MyCell label="门店营业状态">
      <wd-upload :limit="1" action="https://ftf.jd.com/api/uploadImg" />
    </MyCell>
  </MyCellGroup>
</template>

<style>
:root {
  --wot-upload-size: 80rpx;
}
</style>

<style lang='scss' scoped>
:deep(.wd-upload__evoke) {
  margin-bottom: 0 !important;
}
:deep(.wd-upload__evoke-num) {
  display: none;
}
:deep(.wd-upload__preview) {
  margin: 0 0 0 0 !important;
}
</style>
