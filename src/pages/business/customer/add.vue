<route lang="yaml">
  layout: common
  style:
    navigationBarTitleText: 添加客户
  </route>

<script lang="ts" setup>
// const fileList = ref<any[]>([
//   { url: 'https://img12.360buyimg.com//n0/jfs/t1/29118/6/4823/55969/5c35c16bE7c262192/c9fdecec4b419355.jpg' },
// ])
const form = ref()
const columns = ref(['选项1', '选项2', '选项3'])
const model: any = ref({
  value1: 0,
})
const value = ref()
</script>

<template>
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
        <wd-input
          v-model="model.value1"
          label="备注名"
          prop="value1"
          placeholder="请输入"
          suffix-icon="arrow-right"
          :rules="[{ required: true, message: '备注名必填' }]"
        />
        <wd-input
          v-model="model.value1"
          label="手机号"
          prop="value23232"
          placeholder="请输入"
          suffix-icon="arrow-right"
          :rules="[{ required: true, message: '手机号必填' }]"
        />
        <wd-picker
          v-model="model.value1"
          label="客户来源" align-right :columns="columns"
        />
        <wd-picker
          v-model="model.value1"
          label="手艺人" align-right :columns="columns"
        />
        <wd-picker
          v-model="model.value1"
          label="营销顾问" align-right :columns="columns"
        />
      </view>
    </wd-cell-group>

    <view h-24rpx />
    <wd-picker
      v-model="model.value1"
      label="会员等级" align-right :columns="columns"
    />

    <view h-24rpx />
    <wd-cell-group :border="true">
      <wd-cell :rules="[{ required: true, message: '性别必填' }]" title="性别" center>
        <view class="flex flex-xr flex-ac">
          <wd-icon name="arrow-right" size="16px" color="#bfbfbf" />
          <wd-radio-group modelValue="1" inline shape="dot">
            <wd-radio value="1">
              女
            </wd-radio>
            <wd-radio value="2">
              男
            </wd-radio>
            <wd-radio value="3">
              未知
            </wd-radio>
          </wd-radio-group>
        </view>
      </wd-cell>
      <wd-picker
        v-model="model.value1"
        label="生日" align-right :columns="columns"
      />
      <wd-input
        v-model="model.value1"
        label="微信"
        prop="value23232"
        placeholder="请输入"
        suffix-icon="arrow-right"
      />
      <wd-picker
        v-model="model.value1"
        label="地址" align-right :columns="columns"
      />
      <wd-input
        v-model="model.value1"
        label="详细地址"
        prop="value23232"
        placeholder="请输入"
        suffix-icon="arrow-right"
      />
    </wd-cell-group>

    <view h-24rpx />
    <view bg-white px-40rpx py-24rpx>
      <wd-textarea
        v-model="value"
        placeholderStyle="font-size: 14px;color:#C9CDD4;"
        placeholder="请输入客户备注" :maxlength="200" auto-height clearable show-word-limit
      />
    </view>

    <view mx-40rpx mt-48rpx color-white>
      <wd-button size="large" custom-class="theme-bg" block>
        <view flex flex-cc>
          <text>保存</text>
        </view>
      </wd-button>
    </view>
  </wd-form>

  <view h-50px />
</template>

  <style>
  :root {
  --wot-upload-size: 80rpx;
}
</style>

  <style lang='scss' scoped>
  :deep(.wd-radio-group) {
  line-height: 32 !important;
}
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
