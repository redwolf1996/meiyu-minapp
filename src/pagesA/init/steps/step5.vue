<route lang="yaml">
style:
  navigationBarTitleText: 添加员工
  navigationStyle: custom
</route>

<script lang="ts" setup>
</script>

<template>
  <StepNav :step="3" />
  <view mt-10px tc fs-40>
    请添加您的第一个员工
  </view>
  <view mt-8px tc>
    方便创建预约时指定手艺人
  </view>
  <BaseDataStaff showSkip />
</template>
