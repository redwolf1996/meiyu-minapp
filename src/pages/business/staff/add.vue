<route lang="yaml">
style:
  navigationBarTitleText: 添加员工
</route>

<script lang="ts" setup>
const fileList = ref<any[]>([
  { url: 'https://img12.360buyimg.com//n0/jfs/t1/29118/6/4823/55969/5c35c16bE7c262192/c9fdecec4b419355.jpg' },
])
const form = ref()
const model: any = ref({
  value1: 0,
})
</script>

<template>
  <MyCellGroup>
    <MyCell label="员工头像">
      <wd-upload :limit="1" action="https://ftf.jd.com/api/uploadImg" />
    </MyCell>
  </MyCellGroup>
  <wd-form ref="form" :model="model">
    <wd-cell-group :border="true">
      <view>
        <wd-input
          v-model="model.value1"
          label="姓名"
          prop="value1"
          placeholder="请输入"
          suffix-icon="arrow-right"
          :rules="[{ required: true, message: '姓名必填' }]"
        />
        <wd-cell title="标题文字" center>
          <wd-button custom-class="custom-value" size="small" plain>
            按钮
          </wd-button>
        </wd-cell>
        <!-- <wd-picker v-model="value1" :rules="[{ required: true, message: '请选择服务分类' }]" label="服务分类" align-right :columns="columns" /> -->
        <wd-input
          v-model="model.value1"
          label="联系电话"
          prop="value23232"
          placeholder="请输入"
          suffix-icon="arrow-right"
          :rules="[{ required: true, message: '联系电话必填' }]"
        />
      </view>
    </wd-cell-group>
  </wd-form>
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
