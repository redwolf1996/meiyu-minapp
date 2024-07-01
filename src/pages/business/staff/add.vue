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

<style lang='scss' scoped>
:deep(.wd-upload) {
  width: 40px;
  height: 40px;
}
:deep(.wd-upload__evoke) {
  margin-bottom: 0 !important;
  width: 40px !important;
  height: 40px !important;
}
:deep(.wd-upload__evoke-num) {
  display: none;
}
:deep(.wd-upload__preview) {
  margin: 0 0 0 0 !important;
}
</style>
