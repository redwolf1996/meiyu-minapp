<route lang="yaml">
style:
  navigationBarTitleText: 预约管理
</route>

<script lang="ts" setup>
const value = ref(0)
const form = ref()
const model: any = reactive({})
</script>

<template>
  <view>
    <wd-form ref="form" :model="model">
      <view h-24rpx />
      <wd-cell-group :border="true">
        <wd-input
          v-model="value"
          label="卡名称"
          prop="value1"
          placeholder="请输入"
          suffix-icon="arrow-right"
        />
        <wd-input
          v-model="model.value2"
          label="充值金额"
          prop="value23232"
          placeholder="请输入"
          suffix-icon="arrow-right"
          :rules="[{ required: true, message: '请填写充值金额' }]"
        />
        <wd-input
          v-model="model.value2"
          label="赠送金额"
          prop="value23232"
          placeholder="请输入"
          suffix-icon="arrow-right"
        />
      </wd-cell-group>
    </wd-form>
  </view>
</template>

<style lang='scss' scoped></style>
