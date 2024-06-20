<route lang="yaml">
style:
  navigationBarTitleText: 预约管理
</route>

<script lang="ts" setup>
const toast = useToast()
const form = ref()
const model: any = reactive({})

function test() {
  toast.show('世界你好')
}
</script>

<template>
  <view>
    <wd-form ref="form" :model="model">
      <MyCellGroup>
        <MyCell label="门店营业状态" @click="test">
          <view>世界你好</view>
        </MyCell>
        <MyCell label="门店营业时间" @click="test">
          <view>世界你好</view>
        </MyCell>
        <MyCell label="上门服务时间" no-border @click="test">
          <view>世界你好</view>
        </MyCell>
      </MyCellGroup>
    </wd-form>
  </view>
</template>

<style lang='scss' scoped>
.cell {
  border-bottom: 1px solid #ebeef1;
}
</style>
