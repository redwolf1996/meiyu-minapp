<route lang="yaml">
style:
  navigationBarTitleText: 添加员工
  navigationStyle: custom
</route>

<script lang="ts" setup>
const value = ref()
const value1 = ref()
const form: any = reactive({
  val: 1,
})
const model = reactive<{
  value1: string
  value2: string
  value3: string
}>({
  value1: '',
  value2: '',
  value3: '',
})
const fileList = ref<any[]>([
  { url: 'https://img12.360buyimg.com//n0/jfs/t1/29118/6/4823/55969/5c35c16bE7c262192/c9fdecec4b419355.jpg' },
])
function handleChange(e: any) {
  console.log(e)
}
</script>

<template>
  <StepNav :step="3" />
  <view mt-10px tc fs-40>
    请添加您的第一个员工
  </view>
  <view mt-8px tc>
    方便创建预约时指定手艺人
  </view>
  <wd-form ref="form" :model="model">
    <view mt-40rpx flex bg-white px-40rpx py-24rpx flex-bt flex-ac>
      <view>
        <view fb f16>
          员工头像
        </view>
      </view>
      <view flex-ac flex>
        <wd-upload
          :file-list="fileList"
          :limit="1"
          action="https://ftf.jd.com/api/uploadImg"
          @change="handleChange"
        />
      </view>
    </view>

    <view h-24rpx />
    <wd-cell-group :border="true">
      <wd-input
        v-model="value1"
        label="姓名"
        prop="value1"
        placeholder="请输入"
        suffix-icon="arrow-right"
        :rules="[{ required: true, message: '请填写卡名称' }]"
      />
      <wd-input
        v-model="value1"
        label="联系电话"
        prop="value23232"
        placeholder="请输入"
        suffix-icon="arrow-right"
        :rules="[{ required: true, message: '请填写售价' }]"
      />
      <wd-input
        v-model="value1"
        label="账号"
        prop="value1"
        placeholder="请输入"
        suffix-icon="arrow-right"
      />
      <wd-input
        v-model="value1"
        label="性别"
        prop="value23232"
        placeholder="请输入"
        suffix-icon="arrow-right"
      />
      <wd-input
        v-model="value1"
        label="职位"
        prop="value1"
        placeholder="请输入"
        suffix-icon="arrow-right"
        :rules="[{ required: true, message: '请填写卡名称' }]"
      />
      <wd-input
        v-model="value1"
        label="角色"
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
        placeholder="请输入员工备注" :maxlength="200" auto-height clearable show-word-limit
      />
    </view>

    <view mt-40rpx>
      <view px-40rpx mb-20rpx color-999 f14>
        <text>服务</text>
      </view>
      <wd-cell-group :border="true">
        <wd-input
          v-model="model.value1"
          label="工作时间"
          prop="value1"
          placeholder="请选择"
          suffix-icon="arrow-right"
        />
        <wd-input
          v-model="model.value2"
          label="服务分类"
          prop="value23232"
          placeholder="请选择"
          suffix-icon="arrow-right"
        />
      </wd-cell-group>
    </view>
  </wd-form>

  <view mx-40rpx mt-64rpx color-white>
    <wd-button size="large" custom-class="theme-bg" block>
      <view flex flex-cc>
        <text>保存</text>
      </view>
    </wd-button>
  </view>
  <view mx-40rpx color-white>
    <wd-button size="large" type="text" block>
      <view flex flex-cc color-333>
        <text>跳过</text>
      </view>
    </wd-button>
  </view>
  <view h-60rpx />
</template>

<style>
:deep(.wd-upload__evoke) {
  margin-bottom: 0 !important;
}
:deep(.wd-upload__preview) {
  margin: 0 0 0 0 !important;
}
</style>
